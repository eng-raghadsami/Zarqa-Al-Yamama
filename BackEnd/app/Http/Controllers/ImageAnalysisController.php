<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ImageAnalysisService;
use OpenApi\Attributes as OA;

class ImageAnalysisController extends Controller
{
    #[OA\Post(
        path: '/api/images/analyze',
        summary: 'Analyze an image for safety',
        tags: ['Images'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\MediaType(
                mediaType: 'multipart/form-data',
                schema: new OA\Schema(
                    required: ['image'],
                    properties: [
                        new OA\Property(property: 'image', type: 'string', format: 'binary')
                    ]
                )
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Successful analysis'),
            new OA\Response(response: 422, description: 'Validation error')
        ]
    )]
public function analyze(Request $request, ImageAnalysisService $service)
{
    $request->validate([
        'image' => 'required|file|mimes:jpg,jpeg,png,webp|max:10240'
    ]);

    $file = $request->file('image');
    $path = $file->getRealPath();

    // 1. استدعاء الخدمة
    $results = $service->analyze($path, $file->getMimeType());
    $scores = $results['criteria_scores'];

    // 2. تطبيق التغبيش بناءً على الـ Actions
    $blurredImageUrl = null;
    foreach ($results['actions'] as $action) {
        if (in_array($action, ['blur_strong', 'blur_medium', 'blur_light'])) {
            $blurredImageUrl = $service->applyBlur($path, $action);
        }
    }

    // 3. تحويل النتيجة للصيغة المطلوبة (مسطّحة)
    return response()->json([
        'racism'            => ($scores['racism_percentage'] ?? 0) / 100,
        'violence'          => ($scores['violence_or_hate_percentage'] ?? 0) / 100,
        'sensitive_content' => ($scores['sensitive_content_percentage'] ?? 0) / 100,
        'blood'             => ($scores['blood_gore_percentage'] ?? 0) / 100,
        'ai_generated'      => ($scores['ai_generated_percentage'] ?? 0) >= 70,
        'forged'            => ($scores['forged_percentage'] ?? 0) >= 70,
        'description'       => $results['description'] ?? '',
        'actions'           => $results['actions'],
        ...( $blurredImageUrl ? ['blurred_image_url' => $blurredImageUrl] : []),
    ]);
}
}
