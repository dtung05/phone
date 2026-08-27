<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\Banner\BannerRepoInter;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    protected $bannerRepo;
    public function __construct(BannerRepoInter $bannerRepo)
    {
        $this->bannerRepo = $bannerRepo;
    }
    public function index()
    {
        $banner = $this->bannerRepo->getActionBanner();
        return response()->json($banner);
    }
}
