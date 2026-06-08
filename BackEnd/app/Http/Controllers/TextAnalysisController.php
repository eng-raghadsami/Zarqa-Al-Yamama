<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TextAnalysisService;
use OpenApi\Attributes as OA;

class TextAnalysisController extends Controller
{
    #[OA\Post(
        path: "/api/texts/analyze",
        summary: "Analyze plain text",
        tags: ["Texts"],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\MediaType(
                mediaType: "application/json",
                schema: new OA\Schema(
                    type: "object",
                    properties: [
                        new OA\Property(property: "text", type: "string")
                    ]
                )
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Analysis result")
        ]
    )]
    public function analyze(Request $request, TextAnalysisService $service)
    {
        $request->validate([
            'text' => 'required|string'
        ]);

        $results = $service->analyze($request->input('text'));

        return response()->json($results);
    }
}
