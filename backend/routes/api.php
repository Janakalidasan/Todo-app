<?php

// routes/api.php
use App\Http\Controllers\TodoController;

Route::apiResource('todos', TodoController::class);
