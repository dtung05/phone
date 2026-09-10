<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductVariant extends Model
{
    use SoftDeletes;
    public function product()
    {
        return $this->belongsTo(product::class);
    }
    protected function casts(): array
    {
        return [
            'attributes' => 'array',
            'selling_price' => 'integer',
            'average_cost' => 'integer',
        ];
    }
    protected $fillable = [
        'product_id',
        'selling_price',
        'stock_quantity',
        'average_cost',
        'attributes'
    ];
}
