<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\Brand\BrandRepoInter;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    protected $brandRepo;

    public function __construct(BrandRepoInter $brandRepo)
    {
        $this->brandRepo = $brandRepo;
    }

    public function index()
    {
        $brands = $this->brandRepo->getAll();
        return response()->json($brands);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:brands,name',
        ], [
            'name.required' => 'Vui lòng nhập tên thương hiệu.',
            'name.string' => 'Tên thương hiệu phải là chuỗi ký tự.',
            'name.max' => 'Tên thương hiệu không được vượt quá 255 ký tự.',
            'name.unique' => 'Tên thương hiệu này đã tồn tại trong hệ thống.',
        ]);

        $brand = $this->brandRepo->create([
            'name' => trim($request->name),
        ]);

        return response()->json([
            'message' => 'Thêm thương hiệu thành công!',
            'data' => $brand,
        ], 201);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:brands,name,' . $id,
        ], [
            'name.required' => 'Vui lòng nhập tên thương hiệu.',
            'name.string' => 'Tên thương hiệu phải là chuỗi ký tự.',
            'name.max' => 'Tên thương hiệu không được vượt quá 255 ký tự.',
            'name.unique' => 'Tên thương hiệu này đã tồn tại trong hệ thống.',
        ]);

        $brand = $this->brandRepo->update($id, [
            'name' => trim($request->name),
        ]);

        if (!$brand) {
            return response()->json(['message' => 'Thương hiệu không tồn tại.'], 404);
        }

        return response()->json([
            'message' => 'Cập nhật thương hiệu thành công!',
            'data' => $brand,
        ]);
    }

    public function destroy(string $id)
    {
        $brand = $this->brandRepo->find($id);
        if (!$brand) {
            return response()->json(['message' => 'Thương hiệu không tồn tại.'], 404);
        }

        if ($brand->products_count > 0) {
            return response()->json([
                'message' => "Không thể xóa thương hiệu '{$brand->name}' vì đang có {$brand->products_count} sản phẩm thuộc thương hiệu này.",
            ], 400);
        }

        $this->brandRepo->delete($id);

        return response()->json([
            'message' => 'Xóa thương hiệu thành công!',
        ]);
    }

    public function trashed()
    {
        $trashedBrands = $this->brandRepo->getTrashed();
        return response()->json($trashedBrands);
    }

    public function restore(string $id)
    {
        $brand = $this->brandRepo->restore($id);
        if (!$brand) {
            return response()->json(['message' => 'Không tìm thấy thương hiệu trong thùng rác.'], 404);
        }

        return response()->json([
            'message' => "Đã khôi phục thương hiệu '{$brand->name}' thành công!",
            'data' => $brand,
        ]);
    }
}
