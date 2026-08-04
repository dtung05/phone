<?php

namespace App\Repositories\Product;

use App\Models\Product;
use App\Models\Review;
use App\Repositories\BaseRepository;

class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
    public function getModel()
    {
        return Product::class;
    }
    public function getProduct(String $slug)
    {
        return  $this->model->where('slug', '=', $slug)
            ->with(['productVariants'])->first();
    }
}
