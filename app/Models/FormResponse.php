<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormResponse extends Model
{
    protected $fillable = [
        'form_id',
        'submitted_by',
        'ip_address',
        'user_agent',
        'submitted_at',
    ];

    protected $casts = [
        'submitted_at' => 'datetime',
    ];

    public function form()
    {
        return $this->belongsTo(Form::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'submitted_by');
    }

    public function field()
{
    return $this->belongsTo(FormField::class, 'field_id');
}

    public function answers()
    {
        return $this->hasMany(ResponseAnswer::class, 'response_id');
    }
}