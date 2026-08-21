<?php

namespace App\Providers;

use App\Repositories\Brand\BrandRepo;
use App\Repositories\Brand\BrandRepoInter;
use App\Repositories\Cart\CartRepo;
use App\Repositories\Cart\CartRepoInter;
use App\Repositories\Order\OrderRepo;
use App\Repositories\Order\OrderRepositoryInterface;
use App\Repositories\User\UserRepository;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\Product\ProductRepository;
use App\Repositories\Product\ProductRepositoryInterface;
use App\Repositories\ProductVariant\ProductVariantRepo;
use App\Repositories\ProductVariant\ProductVariantRepoInter;
use Illuminate\Support\ServiceProvider;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
