<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductCreateValidation;
use App\Http\Requests\ProductUpdateValidation;
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

    // Quản lý danh sách sản phẩm cho Staff/Admin
    public function staffProducts(Request $request)
    {
        $search = $request->query('search');
        $categoryId = $request->query('category_id');
        $brandId = $request->query('brand_id');
        $perPage = $request->query('per_page', 10);

        $products = $this->productRepo->getStaffProducts($search, $categoryId, $brandId, $perPage);
        return response()->json($products);
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
    public function update(ProductUpdateValidation $request, string $id)
    {
        $product = $this->productRepo->find($id);
        if (!$product) {
            return response()->json([
                'message' => 'Sản phẩm không tồn tại',
                'type' => 'error'
            ], 404);
        }

        $uploadedFiles = [];
        try {
            DB::transaction(function () use ($request, $product, &$uploadedFiles) {
             
                if ($request->hasFile('thumbnail')) {
                    $newThumbnail = $request->file('thumbnail')->store('products', 'public');
                    $uploadedFiles[] = $newThumbnail;
                    if ($product->thumbnail && Storage::disk('public')->exists($product->thumbnail)) {
                        Storage::disk('public')->delete($product->thumbnail);
                    }
                    $product->thumbnail = $newThumbnail;
                }

                // 2. Gallery Images
                $existingImages = [];
                if ($request->has('existing_images')) {
                    $existingImages = is_array($request->existing_images)
                        ? $request->existing_images
                        : json_decode($request->existing_images, true) ?? [];
                } else {
                    $existingImages = is_array($product->images) ? $product->images : [];
                }

                $newImages = [];
                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $image) {
                        $path = $image->store('products', 'public');
                        $uploadedFiles[] = $path;
                        $newImages[] = $path;
                    }
                }

                $allImages = array_values(array_unique(array_merge($existingImages, $newImages)));
                $product->images = $allImages;

                // 3. Specifications
                $specifications = $request->specifications;
                if (is_string($specifications)) {
                    $decoded = json_decode($specifications, true);
                    $specifications = (json_last_error() === JSON_ERROR_NONE) ? $decoded : ['mo_ta' => $specifications];
                }
                $product->specifications = $specifications ?? [];

                // 4. Update basic fields
                if ($product->product_name !== $request->product_name) {
                    $baseSlug = Str::slug($request->product_name);
                    $product->slug = $baseSlug . '-' . Str::lower(Str::random(6));
                    $product->product_name = $request->product_name;
                }

                $product->brand_id = $request->brand_id;
                $product->category_id = $request->category_id;
                $product->review_video = $request->review_video ?? '';
                $product->discount_perventage = $request->discount_percentage ?? $request->discount_perventage ?? 0;
                $product->save();

                // 5. Variants sync (cập nhật thông minh, không xóa trực tiếp để tránh lỗi khoá ngoại và mất tồn kho)
                $variants = is_array($request->variants)
                    ? $request->variants
                    : json_decode($request->variants, true);

                if (!empty($variants)) {
                    $existingVariants = $product->productVariants()->get()->keyBy('id');
                    $retainedVariantIds = [];

                    foreach ($variants as $variant) {
                        $attributes = is_array($variant['attributes'])
                            ? $variant['attributes']
                            : json_decode($variant['attributes'] ?? '{}', true);

                        $variantId = !empty($variant['id']) ? (int) $variant['id'] : null;

                        if ($variantId && isset($existingVariants[$variantId])) {
                           
                            $existingVariants[$variantId]->update([
                                'selling_price' => $variant['selling_price'],
                                'attributes' => $attributes ?? [],
                            ]);
                            $retainedVariantIds[] = $variantId;
                        } else {
                          
                            $newVariant = $this->productVariantRepo->create([
                                'product_id' => $product->id,
                                'selling_price' => $variant['selling_price'],
                                'stock_quantity' => $variant['stock_quantity'] ?? 0,
                                'attributes' => $attributes ?? [],
                                'average_cost' => $variant['average_cost'] ?? 0,
                            ]);
                            $retainedVariantIds[] = $newVariant->id;
                        }
                    }

                  
                    foreach ($existingVariants as $oldId => $oldVariant) {
                        if (!in_array($oldId, $retainedVariantIds)) {
                            $oldVariant->delete();
                        }
                    }
                }

                return true;
            });

            return response()->json([
                'message' => 'Cập nhật sản phẩm thành công',
                'type' => 'success',
            ], 200);
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
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
