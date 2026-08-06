<?php

use App\Http\Controllers\AIController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResponseController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::resource('forms', FormController::class);

    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::get('/ai', [AIController::class, 'index'])
        ->name('ai.index');

    Route::post('/ai/generate', [AIController::class, 'generate'])
        ->name('ai.generate');

    Route::resource('imports', ImportController::class)
        ->only(['index', 'store']);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/forms/{form}/builder', [FormController::class, 'builder'])
        ->name('forms.builder');

    Route::post('/forms/{form}/fields', [FormController::class, 'storeField'])
        ->name('forms.fields.store');

    Route::put('/forms/{form}/fields/{field}', [FormController::class, 'updateField'])
        ->name('forms.fields.update');

    Route::delete('/forms/{form}/fields/{field}', [FormController::class, 'destroyField'])
        ->name('forms.fields.destroy');

    Route::get('/f/{form:slug}', [FormController::class, 'render'])
        ->name('forms.render');

    Route::post('/f/{form:slug}', [FormController::class, 'submit'])
        ->name('forms.submit');

    Route::delete('/forms/{form}', [FormController::class, 'destroy'])
        ->name('forms.destroy');

    Route::get('/forms/{form}/responses', [ResponseController::class, 'index'])
        ->name('responses.index');

    Route::get(
        '/forms/{form}/responses/{response}',
        [ResponseController::class, 'show']
    )->name('responses.show');

    Route::delete(
        '/forms/{form}/responses/{response}',
        [ResponseController::class, 'destroy']
    )->name('responses.destroy');

    Route::get(
        '/forms/{form}/responses/{response}/edit',
        [ResponseController::class, 'edit']
    )->name('responses.edit');

    Route::put(
        '/forms/{form}/responses/{response}',
        [ResponseController::class, 'update']
    )->name('responses.update');

    Route::get('/imports', [ImportController::class, 'index'])
        ->name('imports.index');

    Route::post('/imports', [ImportController::class, 'store'])
        ->name('imports.store');

});

require __DIR__.'/auth.php';
