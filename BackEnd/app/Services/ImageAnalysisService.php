<?php

namespace App\Services;

use Intervention\Image\Laravel\Facades\Image;
use GuzzleHttp\Client;
use Throwable;

class ImageAnalysisService
{
    private const CRITERIA = [
        'racism_percentage',
        'violence_or_hate_percentage',
        'sensitive_content_percentage',
        'blood_gore_percentage',
        'forged_percentage',
        'ai_generated_percentage',
    ];

    // ✅ 修复: 降低阈值，让 action 能真正触发
    private const THRESHOLD_DELETE      = 70;
    private const THRESHOLD_BLUR_STRONG = 60;
    private const THRESHOLD_BLUR_MEDIUM = 40;
    private const THRESHOLD_BLUR_LIGHT  = 20;

    public function analyze(string $imagePath, ?string $mimeType = null): array
    {
        $results = [
            'criteria_scores'   => $this->emptyScores(),
            'description'       => null,
            'recommended_action'=> 'none',
            'actions'           => [],
            'errors'            => [],
        ];

        if (!is_file($imagePath) || !is_readable($imagePath)) {
            $results['errors']['image'] = 'تعذر قراءة ملف الصورة.';
            return $results;
        }

        // الطبقة الأولى: Gemini
        $this->analyzeWithGemini($imagePath, $mimeType, $results);

        // الطبقة الثانية: Deepware (كشف التزييف العميق)
        $this->analyzeWithDeepware($imagePath, $results);

        // ✅ 修复: 归一化分数（处理 0-1 范围）
        $results['criteria_scores'] = $this->normalizeScores($results['criteria_scores']);

        // 根据scores决定action
        $this->resolveActions($results);

        return $results;
    }

    private function analyzeWithGemini(string $imagePath, ?string $mimeType, array &$results): void
    {
        $geminiKey  = config('services.gemini.key');
        $geminiModel = config('services.gemini.model', 'gemini-2.5-flash');
        $imageData  = @file_get_contents($imagePath);

        try {
            $http = new Client(['timeout' => 60, 'verify' => false]);
            $url  = "https://generativelanguage.googleapis.com/v1beta/models/{$geminiModel}:generateContent";

            // ✅ 修复: 完整的 prompt，不再被截断
            $prompt = <<<'PROMPT'
أنت خبير في تقييم أمان المحتوى المرئي. مهمتك هي تحليل الصورة بدقة وإعطاء أرقام (من 0 إلى 100) لكل معيار:

1. racism_percentage: نسبة المحتوى العنصري
2. violence_or_hate_percentage: نسبة العنف أو الكراهية
3. sensitive_content_percentage: نسبة المحتوى الحساس
4. blood_gore_percentage: نسبة الدم أو المشاهد المروعة
5. forged_percentage: نسبة احتمال التزوير أو التعديل
6. ai_generated_percentage: نسبة احتمال أن الصورة مولدة بالذكاء الاصطناعي

قواعد التقييم:
- كن دقيقاً ولا تخفف من الخطورة. إذا كان هناك دم، أعطِ blood_gore_percentage قيمة عالية (أعلى من 60).
- إذا كان هناك سلاح أو عنف واضح، أعطِ violence_or_hate_percentage أعلى من 70.
- إذا كانت الصورة معدلة رقمياً، أعطِ forged_percentage أعلى من 50.
- إذا كانت الصورة تبدو مولدة بالذكاء الاصطناعي، أعطِ ai_generated_percentage أعلى من 50.

أعد النتيجة حصراً بصيغة JSON التالية، ولا تضف أي نص آخر:
{"criteria_scores": {"racism_percentage": 0, "violence_or_hate_percentage": 0, "sensitive_content_percentage": 0, "blood_gore_percentage": 0, "forged_percentage": 0, "ai_generated_percentage": 0}, "description": "وصف الصورة هنا"}
PROMPT;

            $response = $http->post($url, [
                'headers' => [
                    'Content-Type'  => 'application/json',
                    'x-goog-api-key' => $geminiKey,
                ],
                'json' => [
                    'contents' => [[
                        'parts' => [
                            ['text' => $prompt],
                            ['inline_data' => [
                                'mime_type' => $mimeType ?: 'image/jpeg',
                                'data'      => base64_encode($imageData),
                            ]],
                        ],
                    ]],
                ],
            ]);

            $body    = json_decode($response->getBody(), true);
            $rawText = $body['candidates'][0]['content']['parts'][0]['text'] ?? '{}';

            $cleanJson = trim(str_replace(['```json', '```'], '', $rawText));
            $parsed    = json_decode($cleanJson, true);

            if ($parsed) {
                $results['criteria_scores'] = array_merge(
                    $this->emptyScores(),
                    $parsed['criteria_scores'] ?? []
                );
                $results['description'] = $parsed['description'] ?? null;
            }
        } catch (Throwable $e) {
            $results['errors']['gemini'] = $e->getMessage();
        }
    }

    // ✅ 新增: Deepware 深伪检测
    private function analyzeWithDeepware(string $imagePath, array &$results): void
    {
        $deepwareKey = config('services.deepware.key');
        if (!$deepwareKey) return;

        $imageData = @file_get_contents($imagePath);

        try {
            $http = new Client(['timeout' => 30, 'verify' => false]);

            $response = $http->post('https://api.deepware.ai/v1/scan', [
                'headers' => [
                    'Authorization' => "Bearer {$deepwareKey}",
                    'Content-Type'  => 'application/json',
                ],
                'json' => [
                    'image' => base64_encode($imageData),
                ],
            ]);

            $data = json_decode($response->getBody(), true);
            $deepfakeScore = $data['deepfake_probability'] ?? 0;

            // 合并 Deepware 的 deepfake 检测结果
            if ($deepfakeScore > 0) {
                $current = $results['criteria_scores']['ai_generated_percentage'] ?? 0;
                // 取两者中较高的分数
                $results['criteria_scores']['ai_generated_percentage'] = max($current, $deepfakeScore);
            }
        } catch (Throwable $e) {
            $results['errors']['deepware'] = $e->getMessage();
        }
    }

    public function applyBlur(string $path, string $action): string
    {
        $img = Image::read($path);

        // ✅ 修复: 三级模糊强度
        $blurLevel = match ($action) {
            'blur_strong' => 50,
            'blur_medium' => 30,
            'blur_light'  => 15,
            default       => 20,
        };

        $fileName  = 'blurred_' . time() . '_' . uniqid() . '.jpg';
        $savePath  = storage_path('app/public/' . $fileName);

        $img->blur($blurLevel)->save($savePath);
        return asset('storage/' . $fileName);
    }

    private function resolveActions(array &$results): void
    {
        $scores = $results['criteria_scores'];
        $max    = !empty($scores) ? max($scores) : 0;

        // ✅ 修复: 用常量阈值 + 增加 blur_light 级别
        if (($scores['forged_percentage'] ?? 0) >= self::THRESHOLD_DELETE
            || ($scores['ai_generated_percentage'] ?? 0) >= self::THRESHOLD_DELETE
        ) {
            $results['actions'][]           = 'delete';
            $results['recommended_action']  = 'delete';
        } elseif ($max >= self::THRESHOLD_BLUR_STRONG) {
            $results['actions'][]           = 'blur_strong';
            $results['recommended_action']  = 'blur_strong';
        } elseif ($max >= self::THRESHOLD_BLUR_MEDIUM) {
            $results['actions'][]           = 'blur_medium';
            $results['recommended_action']  = 'blur_medium';
        } elseif ($max >= self::THRESHOLD_BLUR_LIGHT) {
            $results['actions'][]           = 'blur_light';
            $results['recommended_action']  = 'blur_light';
        }
    }

    // ✅ 修复: 归一化 — 如果分数在 0-1 范围，自动转为 0-100
    private function normalizeScores(array $scores): array
    {
        $normalized = [];
        foreach ($scores as $key => $value) {
            if ($value <= 1.0 && $value > 0) {
                $normalized[$key] = (int) round($value * 100);
            } else {
                $normalized[$key] = (int) round($value);
            }
        }
        return array_merge($this->emptyScores(), $normalized);
    }

    private function emptyScores(): array
    {
        return array_fill_keys(self::CRITERIA, 0);
    }
}
