<?php

namespace App\Services;

use GuzzleHttp\Client;
use Throwable;

class ImageAnalysisService
{
    /**
     * Criteria evaluated for every image. Keys map to the percentage fields
     * returned in the response.
     */
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

        if (! is_file($imagePath) || ! is_readable($imagePath)) {
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
        $geminiModel = config('services.gemini.model', 'gemini-2.5-flash');

        if (blank($geminiKey)) {
            $results['errors']['gemini'] = 'مفتاح Gemini غير مضبوط في ملف .env.';
            return;
        }

        $mimeType = $mimeType ?: $this->detectMimeType($imagePath);
        $imageData = @file_get_contents($imagePath);

        if ($imageData === false) {
            $results['errors']['image'] = 'تعذر قراءة محتوى الصورة.';
            return;
        }

        try {
            $http = new Client(['timeout' => 60, 'verify' => false]);

            $prompt = 'أنت خبير في الإشراف على المحتوى المرئي. حلّل الصورة المرفقة وأعد JSON صالح فقط بدون أي شرح خارجي.
            يجب أن تكون كل القيم النصية باللغة العربية.
            قيّم كل معيار كنسبة مئوية عدد صحيح من 0 إلى 100 (0 يعني غير موجود إطلاقا، 100 يعني موجود بشدة):
            {
              "criteria_scores": {
                "racism_percentage": 0,
                "violence_or_hate_percentage": 0,
                "sensitive_content_percentage": 0,
                "blood_gore_percentage": 0,
                "forged_percentage": 0,
                "ai_generated_percentage": 0
              },
              "description": "وصف سريع للصورة بالعربية في جملة أو جملتين"
            }
            معاني المعايير:
            - racism_percentage: محتوى عنصري أو تمييزي.
            - violence_or_hate_percentage: عنف أو تحريض أو كراهية.
            - sensitive_content_percentage: محتوى حساس أو غير لائق أو للبالغين +18.
            - blood_gore_percentage: محتوى دموي (دماء أو إصابات).
            - forged_percentage: صورة مفبركة أو معدّلة بأدوات التصميم.
            - ai_generated_percentage: صورة مولّدة بالذكاء الاصطناعي.';

            $response = $http->post(
                "https://generativelanguage.googleapis.com/v1beta/models/{$geminiModel}:generateContent",
                [
                    'headers' => ['Content-Type' => 'application/json', 'x-goog-api-key' => $geminiKey],
                    'json' => [
                        'contents' => [[
                            'parts' => [
                                ['text' => $prompt],
                                ['inline_data' => [
                                    'mime_type' => $mimeType,
                                    'data' => base64_encode($imageData),
                                ]],
                            ],
                        ]],
                        'generationConfig' => ['responseMimeType' => 'application/json'],
                    ],
                ]
            );

            $body = json_decode($response->getBody(), true);
            $rawText = $body['candidates'][0]['content']['parts'][0]['text'] ?? null;

            if (! $rawText) {
                $results['errors']['gemini'] = 'لم يُرجع Gemini أي نتيجة للصورة.';
                return;
            }

            $parsed = json_decode(trim($rawText), true);

            if (json_last_error() !== JSON_ERROR_NONE || ! is_array($parsed)) {
                $results['errors']['gemini'] = 'أرجع Gemini صيغة JSON غير صالحة: ' . json_last_error_msg();
                return;
            }

            $results['criteria_scores'] = $this->normalizeScores($parsed['criteria_scores'] ?? []);
            $results['description'] = $parsed['description'] ?? null;
        } catch (Throwable $e) {
            $results['errors']['gemini'] = 'خطأ في Gemini: ' . $e->getMessage();
        }
    }

    /**
     * Decide the recommended action (and the blur strength) from the scores.
     */
    private function resolveActions(array &$results): void
    {
        $scores = $results['criteria_scores'];
        $max = empty($scores) ? 0 : max($scores);

        $aiOrForged = max(
            $scores['forged_percentage'] ?? 0,
            $scores['ai_generated_percentage'] ?? 0
        );

        if ($aiOrForged >= 70) {
            $results['actions'][] = 'delete';
            $results['recommended_action'] = 'delete';
            return;
        }

        if ($max >= 80) {
            $results['actions'][] = 'blur_strong';
            $results['recommended_action'] = 'blur_strong';
        } elseif ($max >= 50) {
            $results['actions'][] = 'blur_medium';
            $results['recommended_action'] = 'blur_medium';
        } elseif ($max >= 25) {
            $results['actions'][] = 'blur_light';
            $results['recommended_action'] = 'blur_light';
        } else {
            $results['recommended_action'] = 'none';
        }
    }

    private function normalizeScores(array $scores): array
    {
        $normalized = $this->emptyScores();

        foreach (self::CRITERIA as $criterion) {
            $value = $scores[$criterion] ?? 0;
            $normalized[$criterion] = $this->clampPercentage($value);
        }

        return $normalized;
    }

    private function emptyScores(): array
    {
        return array_fill_keys(self::CRITERIA, 0);
    }

    private function clampPercentage(mixed $value): int
    {
        $number = is_numeric($value) ? (float) $value : 0;

        // Accept models that return a 0-1 probability instead of 0-100.
        if ($number > 0 && $number <= 1) {
            $number *= 100;
        }

        return (int) max(0, min(100, round($number)));
    }

    private function detectMimeType(string $imagePath): string
    {
        if (function_exists('mime_content_type')) {
            $detected = @mime_content_type($imagePath);
            if (is_string($detected) && str_starts_with($detected, 'image/')) {
                return $detected;
            }
        }

        $extension = strtolower(pathinfo($imagePath, PATHINFO_EXTENSION));

        return match ($extension) {
            'png' => 'image/png',
            'webp' => 'image/webp',
            'gif' => 'image/gif',
            default => 'image/jpeg',
        };
    }
}
