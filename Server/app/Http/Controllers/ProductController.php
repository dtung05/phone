<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductCreateValidation;
use Illuminate\Http\Request;
use App\Repositories\Product\ProductRepositoryInterface;
use App\Repositories\ProductVariant\ProductVariantRepoInter;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    protected $productRepo;
    protected $productVariantRepo;
    public function __construct(ProductRepositoryInterface $productRepo, ProductVariantRepoInter $productVariantRepo)
    {
        $this->productRepo = $productRepo;
        $this->productVariantRepo = $productVariantRepo;
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
    public function productNew()
    {
        return $this->productRepo->getProductNew();
    }

    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductCreateValidation $request)
    {
        $uploadedFiles = [];
        try {
            DB::transaction(function () use ($request, &$uploadedFiles) {
                // Upload Thumbnail
                $thumbnailPath = null;
                if ($request->hasFile('thumbnail')) {
                    $thumbnailPath = $request->file('thumbnail')->store('products', 'public');
                    $uploadedFiles[] = $thumbnailPath;
                }

                // Upload Gallery Images
                $imagesDB = [];
                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $image) {
                        $path = $image->store('products', 'public');
                        $uploadedFiles[] = $path;
                        $imagesDB[] = $path;
                    }
                }

                // Xử lý specifications an toàn
                $specifications = $request->specifications;
                if (is_string($specifications)) {
                    $decoded = json_decode($specifications, true);
                    $specifications = (json_last_error() === JSON_ERROR_NONE) ? $decoded : ['mo_ta' => $specifications];
                }

                // Xử lý slug duy nhất
                $baseSlug = Str::slug($request->product_name);
                $slug = $baseSlug . '-' . Str::lower(Str::random(6));

                // Lấy phần trăm giảm giá (hỗ trợ cả 2 tên trường)
                $discount = $request->discount_percentage ?? $request->discount_perventage ?? 0;

                $product = $this->productRepo->create([
                    'brand_id' => $request->brand_id,
                    'slug' => $slug,
                    'thumbnail' => $thumbnailPath ?? '',
                    'category_id' => $request->category_id,
                    'product_name' => $request->product_name,
                    'review_video' => $request->review_video ?? '',
                    'discount_perventage' => $discount,
                    'images' => $imagesDB,
                    'specifications' => $specifications ?? [],
                    'is_sale' => 0,
                ]);

                // Xử lý biến thể
                $variants = is_array($request->variants)
                    ? $request->variants
                    : json_decode($request->variants, true);

                if (!empty($variants)) {
                    foreach ($variants as $variant) {
                        $attributes = is_array($variant['attributes'])
                            ? $variant['attributes']
                            : json_decode($variant['attributes'] ?? '{}', true);

                        $this->productVariantRepo->create([
                            'product_id' => $product->id,
                            'selling_price' => $variant['selling_price'],
                            'stock_quantity' => $variant['stock_quantity'] ?? 0,
                            'attributes' => $attributes ?? [],
                            'average_cost' => $variant['average_cost'] ?? 0,
                        ]);
                    }
                }

                return true;
            });

            return response()->json([
                'message' => 'Thêm sản phẩm thành công',
                'type' => 'success',
            ], 201);
        } catch (\Exception $e) {
            foreach ($uploadedFiles as $path) {
                Storage::disk('public')->delete($path);
            }
            return response()->json([
                'message' => $e->getMessage(),
                'type' => 'error'
            ], 500);
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
