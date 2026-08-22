<?php

namespace App\Repositories\Product;

use App\Models\Product;
use App\Models\Review;
use App\Repositories\BaseRepository;
use Override;

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
    public function productSearch($name)
    {
        return $this->model
            ->where('product_name', 'like', "%{$name}%")
            ->select(
                'id',
                'product_name',
                'slug',
                'thumbnail',
                'discount_perventage'
            )->withMin('productVariants as min_price', 'selling_price')
            ->paginate(10);
    }

    public function getProductsByBrand($id)
    {
        return $this->model->where('brand_id', $id)
            ->select(
                'id',
                'product_name',
                'slug',
                'thumbnail',
                'discount_perventage'
            )->withMin('productVariants as min_price', 'selling_price')
            ->paginate(10);
    }
}
