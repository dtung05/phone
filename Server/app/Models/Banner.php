<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'title',
        'imager',
        'link',
        'position',
        'is_active',
        'start_date',
        'end_date',
    ];
    protected $casts = [
        'start_date' => 'date:Y-m-d',
        'end_date' => 'date:Y-m-d',
    ];
}
