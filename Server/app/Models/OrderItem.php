<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Order;
use App\Models\ProductVariant;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id',
        'product_variant_id',
        'product_name',
        'product_thumbnail',
        'unit_price',
        'variant_attributes',
        'quantity',
        'total_amount',
    ];
    protected $casts = [
        'variant_attributes' => 'array',
        'unit_price' => 'decimal:2',
        'total_amount' => 'decimal:2',
    ];
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    public function productVariant()
    {
        return $this->belongsTo(ProductVariant::class);
    }
    public $timestamps = false;
}
