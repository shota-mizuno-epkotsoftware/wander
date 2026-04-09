<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Picture extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'name',
    ];

    public function post()
    {
        return $this->belongsTo(User::class);
    }
}
