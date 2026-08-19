<?php

namespace App\Repositories\Cart;

use App\Models\Cart;
use App\Repositories\BaseRepository;

use App\Repositories\Cart\CartRepoInter;
use Exception;
use Illuminate\Support\Facades\DB;

class CartRepo  extends BaseRepository implements CartRepoInter
{
    public function getModel()
    {
        return Cart::class;
    }
    public function addCart($idUser, $product, $stockQuantity)
    {
        return  DB::transaction(
            function () use ($idUser, $product, $stockQuantity) {
                if ($product['quantity'] > $stockQuantity) {
                    throw new Exception('Số lượng sản phẩm không đủ');
                }
                $cart = $this->model
                    ->where('user_id', $idUser)
                    ->first();
                if (!$cart) {
                    $cart = $this->model->create([
                        'user_id' => $idUser
                    ]);
                }
                $item = $cart->cartItems()->where('product_variant_id', $product['product_variant_id'])->first();
                if ($item) {
                    $item->quantity += $product['quantity'];
                    if ($item->quantity > $stockQuantity) {
                        throw new Exception('Số lượng sản phẩm không đủ');
                    }
                    $item->save();
                    return $item;
                } else {
                    return  $cart->cartItems()->create($product);
                }
            }
        );
    }
    public function getMyCart($idUser)
    {
        return $this->model
            ->where('user_id', $idUser)
            ->with([
                'cartItems:id,cart_id,product_variant_id,quantity',
                'cartItems.productVariant:id,product_id,attributes,selling_price,stock_quantity',
                'cartItems.productVariant.product:id,product_name,slug,thumbnail',
            ])
            ->get();
    }
    public function deleteCartItem($idUser, $id)
    {
        $cart = $this->model->where('user_id', $idUser)->first();
        if ($cart) {
            $item = $cart->cartItems()
                ->where('id', $id)
                ->first();
            if ($item) {
                $item->delete();
                return true;
            }
            return false;
        }
        return false;
    }

    public function updateCartItem($idUser, $id, $quantity)
    {
        $cart = $this->model
            ->where('user_id', $idUser)
            ->first();
        if (!$cart) {
            return false;
        }
        $item = $cart->cartItems()
            ->where('id', $id)
            ->first();
        if (!$item) {
            return false;
        }
        $item->quantity = $quantity;
        $item->save();
        return true;
    }
}
