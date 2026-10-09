<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
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
use App\Repositories\Review\ReviewRepository;
use App\Repositories\Review\ReviewRepositoryInterface;
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
        $this->app->singleton(
            ReviewRepositoryInterface::class,
            ReviewRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(80)->by($request->user()?->id ?: $request->ip())->response(function (Request $request, array $headers) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau.'
                ], 429, $headers);
            });
        });
        RateLimiter::for('login', function (Request $request) {
            return [
                Limit::perMinute(20)->by($request->ip()),
                Limit::perMinutes(5, 3)->by($request->input('email'))->response(function (Request $request, array $headers) {
                    return response()->json([
                        'status' => "error",
                        'message' => "Thử đăng nhập lại sau 5 phút"
                    ], 429, $headers);
                }),
            ];
        });
    }
}
