<?php

namespace App\Repositories\ProductVariant;

use App\Models\ProductVariant;
use App\Repositories\BaseRepository;

use App\Repositories\ProductVariant\ProductVariantRepoIner;
use Exception;

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
            $product = $this->model
                ->where('id', $item['id'])
                ->lockForUpdate()
                ->first();
            // Check số lượng
            if ($product->stock_quantity < $item['quantity']) {
                throw new Exception("Số lượng sản phẩm không đủ");
            }
            //Trừ sản phẩm 
            $product->decrement('stock_quantity', $item['quantity']);
        }
    }
    public function increaseStock($orderItems)
    {
        foreach ($orderItems as $item) {
            $product = $this->model
                ->where('id', $item->product_variant_id)
                ->lockForUpdate()
                ->first();

            $product->increment('stock_quantity', $item->quantity);
        }
    }
}
