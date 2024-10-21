<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transacao;

class TransacaoController extends Controller
{
    // Função para listar transações
    public function index(Request $request) {
        $tipo = $request->query(key: 'tipo');
        $transacoes = Transacao::when($tipo, function($query, $tipo) {
            return $query->where('tipo', $tipo);
        })->get();
        return response()->json($transacoes);
    }

    // Função para criar nova transação
    public function store(Request $request) {
        $data = $request->validate([
            'descricao' => 'required|string',
            'valor' => 'required|numeric',
            'categoria' => 'required|string',
            'tipo_transacao_id' => 'required|exists:tipo_transacao,id',  // Validação do ID do tipo
            'tipo_transacao_nome' => 'required|string'  // Nome também validado
        ]);

        // Se for despesa, converte o valor para negativo
        if ($data['tipo_transacao_nome'] == 'Despesa') {
            $data['valor'] = -abs($data['valor']);
        }

        $transacao = Transacao::create($data);
        return response()->json($transacao, 201);
    }

    // Função para editar transação
    public function update(Request $request, $id) {
        $transacao = Transacao::findOrFail($id);
        $data = $request->validate([
            'descricao' => 'sometimes|required',
            'valor' => 'sometimes|required|numeric',
            'tipo' => 'sometimes|required|in:receita,despesa',
            'tipo_transacao_id' => 'sometimes|required|exists:tipo_transacao,id'
        ]);

        // Ajusta valor se for despesa
        if (isset($data['tipo']) && $data['tipo'] == 'despesa') {
            $data['valor'] = -abs($data['valor']);
        }

        $transacao->update($data);
        return response()->json($transacao);
    }

    // Função para deletar transação
    public function destroy($id) {
        Transacao::destroy($id);
        return response()->json(['message' => 'Transação excluída']);
    }
}
