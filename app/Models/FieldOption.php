<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FieldOption extends Model
{
    protected $fillable = [
    'field_id',
    'label',
    'value',
    'sort_order'
];

public function field()
{
    return $this->belongsTo(FormField::class, 'field_id');
}
}
