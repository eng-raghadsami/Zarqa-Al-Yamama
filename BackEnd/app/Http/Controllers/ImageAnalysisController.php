<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ImageAnalysisService;
use OpenApi\Attributes as OA;

class ImageAnalysisController extends Controller
{
    #[OA\Post(
        path: "/images/analyze",
        summary: "Analyze an uploaded image",
        tags: ["Images"],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\MediaType(
                mediaType: "multipart/form-data",
                schema: new OA\Schema(
                    type: "object",
                    properties: [
                        new OA\Property(property: "image", type: "string", format: "binary")
                    ]
                )
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Analysis result")
        ]
    )]
    public function analyze(Request $request, ImageAnalysisService $service)
    {
        $request->validate([
            'image' => 'required|file|mimes:jpg,jpeg,png'
        ]);

        $path = $request->file('image')->getRealPath();
        $results = $service->analyze($path);

        return response()->json($results);
    }
}
