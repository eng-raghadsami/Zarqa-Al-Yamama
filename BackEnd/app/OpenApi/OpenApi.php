<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: "1.0.0",
    title: "Zurqa Al-Yamama API",
    description: "API Documentation"
)]
#[OA\Server(
    url: "https://zurqa-al-yamama.onrender.com",
    description: "Production Server"
)]
#[OA\Server(
    url: "http://127.0.0.1:8000",
    description: "Local Server"
)]
class OpenApi {}
