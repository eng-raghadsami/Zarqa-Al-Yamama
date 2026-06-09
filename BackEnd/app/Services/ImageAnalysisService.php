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
        // تأكدي أن هذا الموديل موجود في حسابك أو استخدمي 'gemini-1.5-flash'
        $geminiModel = config('services.gemini.model', 'gemini-1.5-flash');

        $imageData = @file_get_contents($imagePath);

        try {
            $http = new Client(['timeout' => 60, 'verify' => false]);

            // استخدام v1beta وهو الإصدار الذي يدعم موديلات Gemini Flash
            $url = "https://generativelanguage.googleapis.com/v1beta/models/{$geminiModel}:generateContent";

            $response = $http->post($url, [
                'headers' => ['Content-Type' => 'application/json', 'x-goog-api-key' => $geminiKey],
                'json' => [
                    'contents' => [[
                        'parts' => [
                            ['text' => 'حلّل الصورة كخبير إشراف محتوى وأعد JSON فقط بالمعايير التالية: racism_percentage, violence_or_hate_percentage, sensitive_content_percentage, blood_gore_percentage, forged_percentage, ai_generated_percentage, description. لا تضع أي نصوص خارجية.'],
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

            // تنظيف النص في حال وجود ماركداون
            $cleanJson = str_replace(['```json', '```'], '', $rawText);
            $parsed = json_decode(trim($cleanJson), true);

            $results['criteria_scores'] = $this->normalizeScores($parsed['criteria_scores'] ?? []);
            $results['description'] = $parsed['description'] ?? null;

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
        $max = max($scores);

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
