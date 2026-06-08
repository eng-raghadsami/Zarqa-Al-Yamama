<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ReportAnalysisService;
use OpenApi\Attributes as OA;

class ReportAnalysisController extends Controller
{
    protected $service;

    public function __construct(ReportAnalysisService $service)
    {
        $this->service = $service;
    }

    #[OA\Post(
        path: "/api/reports/analyze",
        summary: "Analyze an uploaded report (PDF or image)",
        tags: ["Reports"],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\MediaType(
                mediaType: "multipart/form-data",
                schema: new OA\Schema(
                    type: "object",
                    properties: [
                        new OA\Property(property: "report", type: "string", format: "binary")
                    ]
                )
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Analysis result")
        ]
    )]
    public function analyze(Request $request)
    {
        $request->validate([
            'report' => 'required|file|mimes:jpg,jpeg,png,pdf'
        ]);

        $path = $request->file('report')->getRealPath();
        $results = $this->service->analyze($path);

        return response()->json($results);
    }
}
