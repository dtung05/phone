<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    protected $fillable = [
        'user_id',
        'product_id',
        'rating',
        "content",
    ];
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
