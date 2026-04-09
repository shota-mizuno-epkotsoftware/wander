<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'latitude',
        'longitude',
        'zip',
        'prefecture',
        'city',
        'town',
    ];

    public function address()
    {
        return $this->belongsTo(Post::class);
    }
}
