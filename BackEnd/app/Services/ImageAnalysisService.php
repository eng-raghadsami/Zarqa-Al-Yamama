<?php

namespace App\Services;

use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Facades\Storage;


class ImageAnalysisService
{
    private function mapLikelihoodToScore(string $likelihood): float
    {
        $map = [
            'VERY_UNLIKELY' => 0.0,
            'UNLIKELY'      => 0.2,
            'POSSIBLE'      => 0.5,
            'LIKELY'        => 0.8,
            'VERY_LIKELY'   => 1.0,
        ];
        return $map[$likelihood] ?? 0.0;
    }

    public function analyze(string $imagePath): array
    {
        $raw = $this->fetchRawData($imagePath);

        $results = [
            'racism'            => $this->mapLikelihoodToScore($raw['google_vision']['racy'] ?? 'VERY_UNLIKELY'),
            'violence'          => $this->mapLikelihoodToScore($raw['google_vision']['violence'] ?? 'VERY_UNLIKELY'),
            'sensitive_content' => $this->mapLikelihoodToScore($raw['google_vision']['adult'] ?? 'VERY_UNLIKELY'),
            'blood'             => $this->mapLikelihoodToScore($raw['google_vision']['blood'] ?? 'VERY_UNLIKELY'),
            'ai_generated'      => (bool) ($raw['ai_detector']['is_ai'] ?? false),
            'forged'            => (bool) ($raw['deepware']['is_forged'] ?? false),
            'description'       => $raw['gemini_description'] ?? 'تم تحليل الصورة بنجاح',
            'actions'           => []
        ];

        // منطق التغبيش
        if ($results['violence'] >= 0.8 || $results['blood'] >= 0.8 || $results['sensitive_content'] >= 0.8) {
            $results['actions'][] = 'blur_strong';
        } elseif ($results['violence'] >= 0.5 || $results['sensitive_content'] >= 0.5) {
            $results['actions'][] = 'blur_mild';
        }

        if ($results['ai_generated'] || $results['forged']) {
            $results['actions'][] = 'reject_image';
        }

        return $results;
    }

public function applyBlur(string $path, string $action): string
    {
        // في الإصدار 3 نستخدم Image::read() بدلاً من Image::make()
        $img = Image::read($path);

        $blurLevel = ($action === 'blur_strong') ? 50 : 20;

        $fileName = 'blurred_' . time() . '.jpg';
        $savePath = storage_path('app/public/' . $fileName);

        $img->blur($blurLevel)->save($savePath);

        return asset('storage/' . $fileName);
    }

    private function fetchRawData($imagePath)
    {
        // هنا يتم ربط الـ APIs الحقيقية لاحقاً
        return [];
    }
}
