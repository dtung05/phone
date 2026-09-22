<?php

namespace App\Models;

use App\Models\Product;
use App\Models\ReviewReply;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Review extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'product_id',
        'rating',
        'content',
        'is_replied',
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_replied' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function replies()
    {
        return $this->hasMany(ReviewReply::class, 'review_id');
    }
}
