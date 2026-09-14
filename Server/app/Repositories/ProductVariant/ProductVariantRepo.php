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
            $variantId = is_array($item)
                ? ($item['product_variant_id'] ?? $item['id'] ?? null)
                : ($item->product_variant_id ?? $item->id ?? null);

            $quantity = is_array($item) ? ($item['quantity'] ?? 0) : ($item->quantity ?? 0);

            if (!$variantId || $quantity <= 0) {
                continue;
            }

            $product = $this->model
                ->where('id', $variantId)
                ->lockForUpdate()
                ->first();

            if (!$product) {
                throw new Exception("Không tìm thấy thông tin biến thể sản phẩm #{$variantId}.");
            }

            if ($product->stock_quantity < $quantity) {
                $productName = $product->product ? $product->product->product_name : "Sản phẩm";
                throw new Exception("Sản phẩm '{$productName}' (Mã #{$variantId}) không đủ tồn kho (còn {$product->stock_quantity}, cần {$quantity}).");
            }

            $product->decrement('stock_quantity', $quantity);
        }
    }

    public function increaseStock($orderItems)
    {
        foreach ($orderItems as $item) {
            $variantId = is_array($item)
                ? ($item['product_variant_id'] ?? $item['id'] ?? null)
                : ($item->product_variant_id ?? $item->id ?? null);

            $quantity = is_array($item) ? ($item['quantity'] ?? 0) : ($item->quantity ?? 0);

            if (!$variantId || $quantity <= 0) {
                continue;
            }

            $product = $this->model
                ->where('id', $variantId)
                ->lockForUpdate()
                ->first();

            if ($product) {
                $product->increment('stock_quantity', $quantity);
            }
        }
    }
}
