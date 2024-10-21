<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransacaoController;
use App\Http\Controllers\TipoTransacaoController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/tipos-transacao', [TipoTransacaoController::class, 'index']);

Route::apiResource('/api/transacoes', TransacaoController::class);
