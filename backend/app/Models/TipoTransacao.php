<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TipoTransacao extends Model
{
    use HasFactory;
    protected $table = 'tipo_transacao';
    protected $fillable = ['nome'];
}
