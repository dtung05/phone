<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\Product\ProductRepositoryInterface;

class ProductController extends Controller
{
    protected $productRepo;
    public function __construct(ProductRepositoryInterface $productRepo)
    {
        $this->productRepo = $productRepo;
    }
    // lấy ra chi tiết sản phẩm
    public function productDetail(String $slug)
    {
        $data = $this->productRepo->getProduct($slug);
        return response()->json($data);
    }
    // tra cứu sản phẩm
    public function productSearch(Request $request)
    {
        $result = $this->productRepo->productSearch($request->search);
        return response()->json($result);
    }
    //TÌm sản phẩm theo brand
    public function productsByBrand(int $brand)
    {
        $result = $this->productRepo->getProductsByBrand($brand);
        return  response()->json($result);
    }
    // lấy sản phẩm đang sale
    public function productSale()
    {
        return $this->productRepo->getProductSale();
    }

    // lấy ra sản phẩm mới thêm
    public function productNew(){
        return $this->productRepo->getProductNew();
    }

    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
