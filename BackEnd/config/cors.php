<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | هذا الملف يحدد إعدادات CORS للسماح للمتصفح بتنفيذ طلبات API
    | من أي دومين خارجي (Swagger UI, Postman, إلخ).
    |
    */

    'paths' => ['api/*', 'texts/*', 'reports/*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
