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
        return $this->model
            ->where('slug', '=', $slug)
            ->orWhere('id', '=', $slug)
            ->with(['productVariants'])
            ->first();
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
    public function getProductSale()
    {
        return $this->model
            ->where('is_sale', 1)
            ->select(
                'id',
                'product_name',
                'slug',
                'thumbnail',
                'discount_perventage'
            )->withMin('productVariants as min_price', 'selling_price')->get();
    }
    public function getProductNew()
    {
        return $this->model
            ->select(
                'id',
                'product_name',
                'slug',
                'thumbnail',
                'discount_perventage'
            )->withMin('productVariants as min_price', 'selling_price')
            ->orderBy('created_at', 'desc')
            ->paginate(10);
    }

    public function getStaffProducts($search = null, $categoryId = null, $brandId = null, $perPage = 10)
    {   $query = $this->model
            ->with([
                'brand:id,name',
                'category:id,name',
            ])
            ->withMin('productVariants as min_price', 'selling_price')
            ->withSum('productVariants as total_stock', 'stock_quantity')
            ->withCount('productVariants as variants_count');
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('product_name', 'like', "%{$search}%")
                    ->orWhere('id', $search);
            });
        }
        if (!empty($categoryId)) {
            $query->where('category_id', $categoryId);
        }
        if (!empty($brandId)) {
            $query->where('brand_id', $brandId);
        }
        return $query->latest()->paginate($perPage);
    }
}
