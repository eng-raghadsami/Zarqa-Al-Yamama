<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ImageAnalysisService;

class ImageAnalysisController extends Controller
{
    public function analyze(Request $request, ImageAnalysisService $service)
    {
        $request->validate(['image' => 'required|file|mimes:jpg,jpeg,png']);

        $path = $request->file('image')->getRealPath();
        $results = $service->analyze($path);

        // تنفيذ التغبيش إذا لزم الأمر
        foreach ($results['actions'] as $action) {
            if ($action === 'blur_strong' || $action === 'blur_mild') {
                $results['blurred_image_url'] = $service->applyBlur($path, $action);
            }
        }

        return response()->json([
            'analysis' => $results,
        ]);
    }
}
