<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ProductVariant;
use App\Models\Review;

class Product extends Model
{
    public function productVariants()
    {
        return $this->hasMany(ProductVariant::class);
    }
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    protected function casts(): array
    {
        return [
            'images' => 'array',
            'specifications' => 'array',
        ];
    }
    protected $fillable = [
        'brand_id',
        'category_id',
        'product_name',
        'slug',
        'thumbnail',
        'review_video',
        'discount_perventage',
        'images',
        'specifications',
        'is_sale'
    ];
}
