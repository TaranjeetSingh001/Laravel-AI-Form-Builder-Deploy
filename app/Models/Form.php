<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
   protected $fillable = [
    'user_id',
    'title',
    'slug',
    'description',
    'status',
    'is_ai_generated'
];

protected function casts(): array
{
    return [
        'is_ai_generated' => 'boolean',
    ];
}

public function user()
{
    return $this->belongsTo(User::class);
}

public function fields()
{
    return $this->hasMany(FormField::class);
}

public function responses()
{
    return $this->hasMany(FormResponse::class);
}
}
