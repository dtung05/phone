<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    protected $orderService;
    public function __construct(OrderService $order)
    {
        $this->orderService = $order;
    }


    /**
     * Display a listing of the resource.
     */
    public function checkout(Request $request)
    {
        $productVariant = $request->productVariant;
        $check = $this->orderService->checkout($productVariant);
        return $check;
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
