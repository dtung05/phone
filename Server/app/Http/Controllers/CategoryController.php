<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\Category\CategoryRepoInter;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    protected $categoryRepo;
    public function __construct(CategoryRepoInter $categoryRepo)
    {
        return $this->categoryRepo = $categoryRepo;
    }
    public function index()
    {
        $categories = $this->categoryRepo->getAll();
        return response()->json($categories);
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
