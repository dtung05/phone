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
        //
    }
}
