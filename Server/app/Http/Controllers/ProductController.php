<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductCreateValidation;
use App\Http\Requests\ProductUpdateValidation;
use Illuminate\Http\Request;
use App\Repositories\Product\ProductRepositoryInterface;
use App\Repositories\ProductVariant\ProductVariantRepoInter;
use App\Services\UploadService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    protected $productRepo;
    protected $productVariantRepo;
    protected $uploadService;
    public function __construct(ProductRepositoryInterface $productRepo, ProductVariantRepoInter $productVariantRepo, UploadService $uploadService)
    {
        $this->productRepo = $productRepo;
        $this->productVariantRepo = $productVariantRepo;
        $this->uploadService = $uploadService;
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
    public function productsByBrand(Request $request, int $brand)
    {
        $categoryId = $request->query('category_id');
        $result = $this->productRepo->getProductsByBrand($brand, $categoryId);
        return response()->json($result);
    }
    // lấy sản phẩm đang sale
    public function productSale(Request $request)
    {
        $perPage = (int) $request->query('per_page', 10);
        if ($request->has('page') || $request->has('paginate')) {
            $filters = [
                'brand_id' => $request->query('brand_id'),
                'category_id' => $request->query('category_id'),
            ];
            return response()->json($this->productRepo->getProductSale($perPage, $filters));
        }
        return response()->json($this->productRepo->getProductSale($perPage));
    }

    // lấy ra sản phẩm mới thêm
    public function productNew()
    {
        return $this->productRepo->getProductNew();
    }

    // Lấy danh sách biến thể kèm thông tin sản phẩm phục vụ nhập kho & bán hàng
    public function staffVariants(Request $request)
    {
        $search = $request->query('search');
        $query = \App\Models\ProductVariant::with([
            'product:id,product_name,thumbnail,category_id,brand_id',
            'product.brand:id,name',
            'product.category:id,name',
        ]);

        if (!empty($search)) {
            $query->whereHas('product', function ($q) use ($search) {
                $q->where('product_name', 'like', "%{$search}%");
            });
        }

        $variants = $query->orderBy('id', 'desc')->take(100)->get();
        return response()->json($variants);
    }

    // Quản lý danh sách sản phẩm cho Staff/Admin
    public function staffProducts(Request $request)
    {
        $search = $request->query('search');
        $categoryId = $request->query('category_id');
        $brandId = $request->query('brand_id');
        $isSale = $request->query('is_sale');
        $perPage = (int) $request->query('per_page', 10);

        $products = $this->productRepo->getStaffProducts($search, $categoryId, $brandId, $isSale, $perPage);
        return response()->json($products);
    }

    // Chi tiết sản phẩm toàn diện cho nhân viên
    public function staffProductDetail(string $id)
    {
        $product = $this->productRepo->getStaffProductDetail($id);
        if (!$product) {
            return response()->json([
                'type' => 'error',
                'message' => 'Không tìm thấy sản phẩm #' . $id,
            ], 404);
        }

        return response()->json($product);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductCreateValidation $request)
    {
        $uploadedFiles = [];
        try {
            DB::transaction(function () use ($request, &$uploadedFiles) {
                // Ảnh đại diện sản phẩm
                $thumbnailPath = $this->uploadService->uploadSingle($request->file('thumbnail'), 'products');
                $uploadedFiles[] = $thumbnailPath;
                // ảnh chi tiết sản phẩm
                $imagesDB = $this->uploadService->uploadMultiple($request->file('images'), 'products');
                if (!empty($imagesDB)) {
                    array_push($uploadedFiles, ...$imagesDB);
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
                // Lấy phần trăm giảm giá 
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
                    'is_sale' => $request->has('is_sale')
                        ? ((string) $request->is_sale === '1' || $request->is_sale === true || $request->is_sale === 1 ? '1' : '0')
                        : '0',
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
            $this->uploadService->deleteMultiple($uploadedFiles);
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
                // 1. Cập nhật Thumbnail
                if ($request->hasFile('thumbnail')) {
                    $this->uploadService->deleteFile($product->thumbnail);
                    $product->thumbnail = $this->uploadService->uploadSingle($request->file('thumbnail'), 'products');
                    if ($product->thumbnail) {
                        $uploadedFiles[] = $product->thumbnail;
                    }
                }
                // 2. Cập nhật Gallery Images
                $newImages = $this->uploadService->uploadMultiple($request->file('images'), 'products');
                if (!empty($newImages)) {
                    array_push($uploadedFiles, ...$newImages);
                }

                $existingImages = is_array($request->existing_images)
                    ? $request->existing_images
                    : (json_decode($request->existing_images ?? '[]', true) ?: ($product->images ?? []));

                $product->images = array_values(array_unique(array_merge($existingImages, $newImages)));

                // 3. Thông số kỹ thuật
                if ($request->filled('specifications')) {
                    $specs = $request->specifications;
                    $product->specifications = is_string($specs)
                        ? (json_decode($specs, true) ?: ['mo_ta' => $specs])
                        : (array) $specs;
                }

                // 4. Thông tin cơ bản 
                if ($product->product_name !== $request->product_name) {
                    $product->slug = Str::slug($request->product_name) . '-' . Str::lower(Str::random(6));
                    $product->product_name = $request->product_name;
                }

                $product->brand_id = $request->brand_id;
                $product->category_id = $request->category_id;
                $product->review_video = $request->review_video ?? '';
                $product->discount_perventage = $request->discount_percentage ?? $request->discount_perventage ?? 0;
                if ($request->has('is_sale')) {
                    $product->is_sale = in_array((string) $request->is_sale, ['1', 'true', 1], true) ? '1' : '0';
                }
                $product->save();

                // 5. Đồng bộ biến thể thông minh 
                $variants = is_array($request->variants)
                    ? $request->variants
                    : json_decode($request->variants, true);

                if (!empty($variants)) {
                    $existingVariants = $product->productVariants()->get()->keyBy('id');
                    $retainedVariantIds = [];

                    foreach ($variants as $variant) {
                        $attributes = is_array($variant['attributes'] ?? null)
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
                    // Xóa những biến thể bị gỡ khỏi form
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
            $this->uploadService->deleteMultiple($uploadedFiles);
            return response()->json([
                'message' => $e->getMessage(),
                'type' => 'error'
            ], 500);
        }
    }

    /**
     * Bật/tắt nhanh trạng thái sale của sản phẩm
     */
    public function toggleSale(string $id)
    {
        $product = $this->productRepo->toggleSale($id);
        if (!$product) {
            return response()->json([
                'type' => 'error',
                'message' => 'Không tìm thấy sản phẩm #' . $id,
            ], 404);
        }

        return response()->json([
            'type' => 'success',
            'message' => 'Đổi trạng thái giảm giá sản phẩm thành công!',
            'data' => [
                'id' => $product->id,
                'is_sale' => $product->is_sale,
            ],
        ]);
    }

    // xóa mềm
    public function destroy(string $id)
    {
        //
    }
}
