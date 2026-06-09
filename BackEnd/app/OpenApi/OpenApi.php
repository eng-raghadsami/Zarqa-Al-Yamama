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
class OpenApi {}
