<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    public function product()
    {
        return $this->belongsTo(product::class);
    }
}
