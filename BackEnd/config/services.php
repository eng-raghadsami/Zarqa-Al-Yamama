<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],
    'google' => [
    'vision_key' => env('GOOGLE_APPLICATION_CREDENTIALS'),
    'project_id' => env('GOOGLE_CLOUD_PROJECT'),
],

'gemini' => [
    'key' => env('GEMINI_API_KEY'),
    'model' => env('GEMINI_MODEL', 'gemini-1.5-flash'),
],

'deepware' => [
    'key' => env('DEEPWARE_API_KEY'),
],

'perspective' => [
    'key' => env('PERSPECTIVE_API_KEY'),
],

'huggingface' => [
    'key' => env('HUGGINGFACE_API_KEY'),
    'moderation_model' => env('HUGGINGFACE_MODERATION_MODEL', 'textdetox/xlmr-large-toxicity-classifier'),
    'api_url' => env('HUGGINGFACE_API_URL', 'https://router.huggingface.co/hf-inference/models'),
],

];
