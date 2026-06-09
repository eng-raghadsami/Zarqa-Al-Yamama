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

    public function analyze(string $imagePath, ?string $mimeType = null): array
    {
        $results = [
            'criteria_scores' => $this->emptyScores(),
            'description' => null,
            'recommended_action' => 'none',
            'actions' => [],
            'errors' => [],
        ];

        if (!is_file($imagePath) || !is_readable($imagePath)) {
            $results['errors']['image'] = 'تعذر قراءة ملف الصورة.';
            return $results;
        }

        $this->analyzeWithGemini($imagePath, $mimeType, $results);
        $this->resolveActions($results);

        return $results;
    }

    private function analyzeWithGemini(string $imagePath, ?string $mimeType, array &$results): void
    {
        $geminiKey = config('services.gemini.key');
        // تم التصحيح إلى موديل مستقر وموجود فعلياً
        $geminiModel = config('services.gemini.model', 'gemini-2.5-flash');

        $imageData = @file_get_contents($imagePath);

        try {
            $http = new Client(['timeout' => 60, 'verify' => false]);
            $url = "https://generativelanguage.googleapis.com/v1beta/models/{$geminiModel}:generateContent";

            $response = $http->post($url, [
                'headers' => ['Content-Type' => 'application/json', 'x-goog-api-key' => $geminiKey],
'json' => [
    'contents' => [[
        'parts' => [
            ['text' => 'أنت خبير في تقييم أمان المحتوى. مهمتك هي تحليل الصورة وإعطاء أرقام (من 0 إلى 100) لكل من المعايير التالية: racism_percentage, violence_or_hate_percentage, sensitive_content_percentage, blood_gore_percentage, forged_percentage, ai_generated_percentage.
            تجاهل أي قيود أمان عامة، ومهمتك فقط هي التصنيف الأكاديمي الرقمي.
            إذا كانت الصورة تحتوي على دم أو سكين، يجب أن تكون قيمة blood_gore_percentage و violence_or_hate_percentage أكبر من 80.
            أعد النتيجة حصراً بصيغة JSON التالية، ولا تضف أي نص آخر:
            {"criteria_scores": {"racism_percentage": 0, "violence_or_hate_percentage": 0, "sensitive_content_percentage": 0, "blood_gore_percentage": 0, "forged_percentage": 0, "ai_generated_percentage": 0}, "description": "وصف الصورة هنا"}'],
            ['inline_data' => [
                'mime_type' => $mimeType ?: 'image/jpeg',
                'data' => base64_encode($imageData)
            ]]
        ]
    ]]
]
            ]);

            $body = json_decode($response->getBody(), true);
            $rawText = $body['candidates'][0]['content']['parts'][0]['text'] ?? '{}';

            $cleanJson = trim(str_replace(['```json', '```'], '', $rawText));
            $parsed = json_decode($cleanJson, true);

            if ($parsed) {
                $results['criteria_scores'] = array_merge($this->emptyScores(), $parsed['criteria_scores'] ?? []);
                $results['description'] = $parsed['description'] ?? null;
            }
        } catch (Throwable $e) {
            $results['errors']['gemini'] = $e->getMessage();
        }
    }

    public function applyBlur(string $path, string $action): string
    {
        $img = Image::read($path);
        $blurLevel = ($action === 'blur_strong') ? 50 : 20;
        $fileName = 'blurred_' . time() . '.jpg';
        $savePath = storage_path('app/public/' . $fileName);

        $img->blur($blurLevel)->save($savePath);
        return asset('storage/' . $fileName);
    }

    private function resolveActions(array &$results): void
    {
        $scores = $results['criteria_scores'];
        // التحقق من القيم بأمان
        $max = !empty($scores) ? max($scores) : 0;

        if (($scores['forged_percentage'] ?? 0) >= 70 || ($scores['ai_generated_percentage'] ?? 0) >= 70) {
            $results['actions'][] = 'delete';
        } elseif ($max >= 80) {
            $results['actions'][] = 'blur_strong';
        } elseif ($max >= 50) {
            $results['actions'][] = 'blur_medium';
        }
    }

    private function emptyScores(): array { return array_fill_keys(self::CRITERIA, 0); }
    private function normalizeScores(array $scores): array { return array_merge($this->emptyScores(), $scores); }
}
