<?php

namespace App\Services;

use OpenAI;
use GuzzleHttp\Client;

class TextAnalysisService
{
    public function analyze(string $text): array
    {
        $results = [];

        // إذا كان النص فارغاً تماماً تجنباً لهدر الـ API Requests
        if (empty(trim($text))) {
            return [
                'openai_summary' => 'لم يتم العثور على نص لتحليله.',
                'perspective' => []
            ];
        }

        // ✅ OpenAI: ملخص وتقييم المقال برمجياً
        $client = OpenAI::client(config('services.openai.key'));
        $response = $client->chat()->create([
            'model' => 'gpt-4o-mini',
            'messages' => [
                ['role' => 'system', 'content' => 'Summarize and evaluate the article based on ethics, credibility, and bias.'],
                ['role' => 'user', 'content' => $text],
            ],
        ]);
        $results['openai_summary'] = $response->choices[0]->message->content ?? 'فشل في توليد الملخص.';

        // ✅ Perspective API: تحليل لغة الكراهية والسمية
        $http = new Client();
        $perspectiveResponse = $http->post('https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze', [
            'query' => ['key' => config('services.perspective.key')],
            'json' => [
                'comment' => ['text' => $text],
                'requestedAttributes' => [
                    'TOXICITY' => new \stdClass(),
                    'INSULT' => new \stdClass(),
                    'SPAM' => new \stdClass(),
                ],
            ],
        ]);

        $results['perspective'] = json_decode($perspectiveResponse->getBody(), true);

        return $results;
    }
}
