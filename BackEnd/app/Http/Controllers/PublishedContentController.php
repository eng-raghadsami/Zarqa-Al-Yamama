<?php
namespace App\Http\Controllers;

use App\Models\PublishedContent;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;
use Illuminate\Support\Facades\Auth;


class PublishedContentController extends Controller
{
    #[OA\Get(
        path: '/api/published',
        summary: 'Get all published contents',
        tags: ['Published'],
        responses: [new OA\Response(response: 200, description: 'List of published contents')]
    )]
    public function index()
    {
        return response()->json(PublishedContent::with(['content','journalist','editor','updater'])->get());
    }

    #[OA\Post(
        path: '/api/published',
        summary: 'Create a new published content',
        tags: ['Published'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: 'content_id', type: 'integer', example: 1)
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Published content created successfully')
        ]
    )]
    public function store(Request $request)
    {
        $validated = $request->validate([
            'content_id' => ['required', 'integer', 'exists:contents,id'],
        ]);

        try {
            $userId = Auth::id();



            // journalist_id/editor_id are NOT nullable in DB, so we must provide them.
            // Prefer authenticated user; otherwise fall back to the first user in DB.
            $fallbackUserId = \App\Models\User::query()->value('id');
            $journalistId = $userId ?? $fallbackUserId;
            $editorId = $userId ?? $fallbackUserId;

            if (blank($journalistId) || blank($editorId)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot publish: missing journalist_id/editor_id (no authenticated user and no fallback user).',
                ], 422);
            }

            $published = PublishedContent::create([
                'content_id' => $validated['content_id'],
                'journalist_id' => $journalistId,
                'editor_id' => $editorId,
                'published_at' => now(),
                'updated_by' => $editorId,
            ]);

            return response()->json(['success' => true, 'published' => $published]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create published content.',
                'error' => $e->getMessage(),
            ], 422);
        }
    }

    #[OA\Get(
        path: '/api/published/{id}',
        summary: 'Get a single published content',
        tags: ['Published'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [new OA\Response(response: 200, description: 'Published content details')]
    )]
    public function show($id)
    {
        $published = PublishedContent::with(['content','journalist','editor','updater'])->findOrFail($id);
        return response()->json($published);
    }

    #[OA\Put(
        path: '/api/published/{id}',
        summary: 'Update a published content',
        tags: ['Published'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(properties: [
                new OA\Property(property: 'editor_id', type: 'integer', example: 3),
                new OA\Property(property: 'updater_id', type: 'integer', example: 4)
            ])
        ),
        responses: [new OA\Response(response: 200, description: 'Published content updated successfully')]
    )]
    public function update(Request $request, $id)
    {
        $published = PublishedContent::findOrFail($id);
        $published->update($request->all());
        return response()->json(['success' => true, 'published' => $published]);
    }

    #[OA\Delete(
        path: '/api/published/{id}',
        summary: 'Delete a published content',
        tags: ['Published'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [new OA\Response(response: 200, description: 'Published content deleted successfully')]
    )]
    public function destroy($id)
    {
        PublishedContent::destroy($id);
        return response()->json(['success' => true]);
    }
}
