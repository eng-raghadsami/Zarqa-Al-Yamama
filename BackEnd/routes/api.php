<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PublishedContentController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AIAnalysisController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImageAnalysisController;
use App\Http\Controllers\ReportAnalysisController;
use App\Http\Controllers\TermController;
use App\Http\Controllers\TextAnalysisController;

Route::get('/api/documentation', function () {
    return view('l5-swagger::index');
});

// Resources
Route::apiResource('stories', StoryController::class);
Route::apiResource('contents', ContentController::class);
Route::apiResource('reviews', ReviewController::class);
Route::apiResource('published', PublishedContentController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('analyses', AIAnalysisController::class);
Route::apiResource('users', UserController::class);
Route::apiResource('terms', TermController::class);

// AI Endpoints (متطابقة مع Swagger)
Route::post('/reports/analyze', [ReportAnalysisController::class, 'analyze']);
Route::post('/images/analyze', [ImageAnalysisController::class, 'analyze']);
Route::post('/texts/analyze', [TextAnalysisController::class, 'analyze']);
Route::post('/terms/match', [TermController::class, 'match']);
