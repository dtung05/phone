<?php

namespace App\Providers;

use App\Repositories\Banner\BannerRepo;
use App\Repositories\Banner\BannerRepoInter;
use App\Repositories\Brand\BrandRepo;
use App\Repositories\Brand\BrandRepoInter;
use App\Repositories\Cart\CartRepo;
use App\Repositories\Cart\CartRepoInter;
use App\Repositories\Category\CategoryRepo;
use App\Repositories\Category\CategoryRepoInter;
use App\Repositories\Order\OrderRepo;
use App\Repositories\Order\OrderRepositoryInterface;
use App\Repositories\User\UserRepository;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\Product\ProductRepository;
use App\Repositories\Product\ProductRepositoryInterface;
use App\Repositories\ProductVariant\ProductVariantRepo;
use App\Repositories\ProductVariant\ProductVariantRepoInter;
use App\Repositories\Supplier\SupplierRepo;
use App\Repositories\Supplier\SupplierRepoInter;
use App\Repositories\PurchaseReceipt\PurchaseReceiptRepo;
use App\Repositories\PurchaseReceipt\PurchaseReceiptRepoInter;
use Illuminate\Support\ServiceProvider;


class AppServiceProvider extends ServiceProvider
{

    public function register(): void
    {
        $this->app->singleton(
            UserRepositoryInterface::class,
            UserRepository::class
        );
        $this->app->singleton(
            ProductRepositoryInterface::class,
            ProductRepository::class
        );
        $this->app->singleton(
            ProductVariantRepoInter::class,
            ProductVariantRepo::class
        );
        $this->app->singleton(
            OrderRepositoryInterface::class,
            OrderRepo::class
        );
        $this->app->singleton(
            CartRepoInter::class,
            CartRepo::class
        );
        $this->app->singleton(
            BrandRepoInter::class,
            BrandRepo::class
        );
        $this->app->singleton(
            BannerRepoInter::class,
            BannerRepo::class
        );
        $this->app->singleton(
            CategoryRepoInter::class,
            CategoryRepo::class
        );
        $this->app->singleton(
            SupplierRepoInter::class,
            SupplierRepo::class
        );
        $this->app->singleton(
            PurchaseReceiptRepoInter::class,
            PurchaseReceiptRepo::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
