<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AddressController;

Route::middleware(['auth'])->group(function () {
    Route::get('/api/proxy-cep/{cep}', [AddressController::class, 'proxyCep']);
});

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', [ContactController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::get('/contacts/create', [ContactController::class, 'create'])
    ->name('contacts.create');
Route::post('/contacts', [ContactController::class, 'store'])->name('contacts.store');

Route::delete('/contacts/{contact}', [ContactController::class, 'destroy']);

Route::get('/contacts/{contact}/edit', [ContactController::class, 'edit'])->name('contacts.edit');
Route::patch('/contacts/{contact}', [ContactController::class, 'update'])->name('contacts.update');

require __DIR__.'/settings.php';
