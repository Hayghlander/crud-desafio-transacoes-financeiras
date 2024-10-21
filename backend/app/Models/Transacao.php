<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transacao extends Model
{
    protected $table = 'transacoes';
    protected $fillable = ['descricao', 'valor', 'tipo', 'tipo_transacao_id', 'categoria'];
    
    public function tipoTransacao() {
        return $this->belongsTo(TipoTransacao::class);
    }
}