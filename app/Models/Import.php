<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Import extends Model
{
    protected $fillable = [
    'user_id',
    'type',
    'filename',
    'status',
    'total_rows',
    'imported_rows',
    'failed_rows'
];

public function user()
{
    return $this->belongsTo(User::class);
}
}
