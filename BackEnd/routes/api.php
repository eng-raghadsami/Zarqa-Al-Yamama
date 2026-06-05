<?php

use App\Http\Controllers\StoryController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PublishedContentController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AIAnalysisController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/api/documentation', function () {
    return view('l5-swagger::index');
});


Route::apiResource('stories', StoryController::class);
Route::apiResource('contents', ContentController::class);
Route::apiResource('reviews', ReviewController::class);
Route::apiResource('published', PublishedContentController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('analyses', AIAnalysisController::class);
Route::apiResource('users', UserController::class);
