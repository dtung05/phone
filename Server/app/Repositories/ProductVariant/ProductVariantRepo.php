<?php

namespace App\Repositories\ProductVariant;

use App\Models\ProductVariant;
use App\Repositories\BaseRepository;

use App\Repositories\ProductVariant\ProductVariantRepoIner;

class ProductVariantRepo extends BaseRepository implements ProductVariantRepoInter
{
    public function getModel()
    {
        return ProductVariant::class;
    }
    public function getQuantitys($id)
    {
        return $this->model->whereIn("id", $id)->pluck('stock_quantity', 'id');
    }
    public function getProductVariants($ids)
    {
        return  $this->model->with('product:id,product_name,thumbnail')
            ->whereIn('id', $ids)->select('id', 'product_id', 'selling_price', 'attributes')->get();
    }
    public function decreaseStock($productVariant)
    {
        foreach ($productVariant as $item) {
            $this->model
                ->findId($item['id'])
                ->decrement('stock_quantity', $item['quantity']);
        }
    }
}
