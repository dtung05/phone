<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Repositories\Cart\CartRepoInter;
use App\Repositories\ProductVariant\ProductVariantRepoInter;
use Illuminate\Http\Request;

class CartController extends Controller
{
    protected $cartRepo;
    protected $productVariantRepo;
    public function __construct(CartRepoInter $cartRepo, ProductVariantRepoInter $productVariantRepo)
    {
        $this->cartRepo = $cartRepo;
        $this->productVariantRepo = $productVariantRepo;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cart = $this->cartRepo->getMyCart(Auth()->id());
        return response()->json($cart);
    }

    // Thêm sản phẩm vào giỏ
    public function store(Request $request)
    {
        try {
            $product =  $this->productVariantRepo->find($request->product_variant_id);
            $this->cartRepo->addCart(Auth()->id(), $request->all(), $product['stock_quantity']);
            return [
                'message' => "Thêm thành công sản phẩm vào giỏ hàng",
                'type' => 'success'
            ];
        } catch (\Exception $err) {
            return [
                'message' => $err->getMessage(),
                'type' => 'error'
            ];
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $result = $this->cartRepo->deleteCartItem(Auth()->id(), $id);
            if ($result) {
                return response()->json([
                    'message' => "Xóa sản phẩm thành công",
                    'type' => "success"
                ], 200);
            }
            return response()->json([
                'message' => "Không tìm thấy sản phẩm cần xóa",
                'type' => "error"
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'type' => 'error',
            ], 500);
        }
    }
}
