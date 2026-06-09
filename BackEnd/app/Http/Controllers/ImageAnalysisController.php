<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ImageAnalysisService;

class ImageAnalysisController extends Controller
{
    /**
     * @OA\Post(
     * path="/api/images/analyze",
     * summary="Analyze an image for safety",
     * @OA\RequestBody(
     * required=true,
     * @OA\MediaType(
     * mediaType="multipart/form-data",
     * @OA\Schema(
     * @OA\Property(property="image", type="string", format="binary")
     * )
     * )
     * ),
     * @OA\Response(response=200, description="Successful analysis")
     * )
     */
    public function analyze(Request $request, ImageAnalysisService $service)
    {
        $request->validate([
            'image' => 'required|file|mimes:jpg,jpeg,png,webp|max:10240'
        ]);

        $file = $request->file('image');
        $path = $file->getRealPath();

        // 1. استدعاء الخدمة
        $results = $service->analyze($path, $file->getMimeType());

        // 2. تطبيق التغبيش بناءً على الـ Actions
        foreach ($results['actions'] as $action) {
            if (in_array($action, ['blur_strong', 'blur_medium', 'blur_light'])) {
                $results['blurred_image_url'] = $service->applyBlur($path, $action);
            }
        }

        // 3. إرجاع النتيجة النهائية
        return response()->json([
            'analysis' => $results,
        ]);
    }
}
