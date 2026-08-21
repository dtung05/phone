<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\Brand\BrandRepoInter;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    protected $brandRepo;
    public function __construct(BrandRepoInter $brand)
    {
        $this->brandRepo = $brand;
    }
    public function index()
    {
        $brands = $this->brandRepo->getAll();
        return response()->json($brands);
    }
}
