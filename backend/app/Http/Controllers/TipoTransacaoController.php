<?php

namespace App\Http\Controllers;

use App\Models\TipoTransacao;
use Illuminate\Http\Request;

class TipoTransacaoController extends Controller
{
    // Método para listar todos os tipos de transação
    public function index()
    {
        $tipos = TipoTransacao::all();  // Recupera todos os tipos de transação
        return response()->json($tipos, 200);
    }
}