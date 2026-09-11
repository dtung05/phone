<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Product;

class Categorie extends Model
{
    use SoftDeletes;

    protected $fillable = ['name'];
    protected $withCount = ['products'];

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }
}
