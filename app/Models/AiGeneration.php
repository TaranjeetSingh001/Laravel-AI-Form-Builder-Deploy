<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AiGeneration extends Model
{
    protected $fillable = [
    'user_id',
    'provider',
    'model',
    'prompt',
    'response',
    'tokens_used'
];

protected function casts(): array
{
    return [
        'response' => 'array',
    ];
}

public function user()
{
    return $this->belongsTo(User::class);
}
}
