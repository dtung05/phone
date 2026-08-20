<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\Product\ProductRepositoryInterface;

class ProductController extends Controller
{
    protected $productRepo ;
    public function __construct(ProductRepositoryInterface $productRepo){
        $this->productRepo = $productRepo;
    }

    public function productDetail(String $slug)
    {   $data = $this->productRepo->getProduct($slug);
        return response()->json($data);
    }
    public function productSearch(Request $request){
        $result = $this->productRepo->productSearch($request->search);
        return response()->json($result);
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
