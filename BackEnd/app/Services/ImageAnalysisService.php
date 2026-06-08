<?php

namespace App\Services;

use GuzzleHttp\Client;

class ImageAnalysisService
{
public function analyze(string $imagePath): array
{
    $raw = []; // هنا نخزن النتائج الخام من Google Vision, Deepware, HuggingFace
    // ... نفس الكود اللي عندك الآن ...

    // ✅ تحويل النتائج لمعايير موحدة
    $results = [
        'racism' => $raw['google_vision']['racy'] ?? 0,
        'violence' => $raw['google_vision']['violence'] ?? 0,
        'sensitive_content' => $raw['google_vision']['adult'] ?? 0,
        'blood' => ($raw['google_vision']['violence'] ?? 0) > 2 ? 0.7 : 0.2,
        'ai_generated' => $raw['ai_detector']['result'] ?? false,
        'forged' => $raw['deepware']['fake'] ?? false,
        'description' => 'صورة تم تحليلها باستخدام Google Vision و Deepware',
        'actions' => []
    ];

    // ✅ تحديد الأكشنات
    if ($results['violence'] > 0.6 || $results['sensitive_content'] > 0.6) {
        $results['actions'][] = 'blur_strong';
    }
    if ($results['ai_generated'] || $results['forged']) {
        $results['actions'][] = 'reject';
    }

    return $results;
}

}
