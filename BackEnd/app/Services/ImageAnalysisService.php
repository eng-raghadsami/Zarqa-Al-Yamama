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
        $geminiModel = config('services.gemini.model', 'gemini-2.0-flash');

        $imageData = @file_get_contents($imagePath);

        try {
            $http = new Client(['timeout' => 60, 'verify' => false]);
            $response = $http->post(
                "https://generativelanguage.googleapis.com/v1/models/{$geminiModel}:generateContent",
                [
                    'headers' => ['Content-Type' => 'application/json', 'x-goog-api-key' => $geminiKey],
                    'json' => [
                        'contents' => [['parts' => [
                            ['text' => 'حلّل الصورة كخبير إشراف محتوى وأعد JSON فقط بالمعايير المحددة.'],
                            ['inline_data' => ['mime_type' => $mimeType, 'data' => base64_encode($imageData)]]
                        ]]],
                        'generationConfig' => ['responseMimeType' => 'application/json'],
                    ]
                ]
            );

            $body = json_decode($response->getBody(), true);
            $parsed = json_decode($body['candidates'][0]['content']['parts'][0]['text'], true);
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

        if (max($scores['forged_percentage'], $scores['ai_generated_percentage']) >= 70) {
            $results['actions'][] = 'delete';
        } elseif ($max >= 80) {
            $results['actions'][] = 'blur_strong';
        } elseif ($max >= 50) {
            $results['actions'][] = 'blur_medium';
        }
    }

    private function emptyScores(): array { return array_fill_keys(self::CRITERIA, 0); }
    private function normalizeScores(array $scores): array { /* منطق التنسيق */ return $scores; }
}
