<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AddressController;

//Public route
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

//Protected routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/api/proxy-cep/{cep}', [AddressController::class, 'proxyCep']);
    Route::get('dashboard', [ContactController::class, 'index'])->name('dashboard');
    Route::resource('contacts', ContactController::class)->except(['index', 'show']);
});

require __DIR__.'/settings.php';
