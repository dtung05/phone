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
        $this->categoryRepo = $categoryRepo;
    }

    public function index()
    {
        $categories = $this->categoryRepo->getAll();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
        ], [
            'name.required' => 'Vui lòng nhập tên danh mục.',
            'name.string' => 'Tên danh mục phải là chuỗi ký tự.',
            'name.max' => 'Tên danh mục không được vượt quá 255 ký tự.',
            'name.unique' => 'Tên danh mục này đã tồn tại trong hệ thống.',
        ]);

        $category = $this->categoryRepo->create([
            'name' => trim($request->name),
        ]);

        return response()->json([
            'message' => 'Thêm danh mục thành công!',
            'data' => $category,
        ], 201);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $id,
        ], [
            'name.required' => 'Vui lòng nhập tên danh mục.',
            'name.string' => 'Tên danh mục phải là chuỗi ký tự.',
            'name.max' => 'Tên danh mục không được vượt quá 255 ký tự.',
            'name.unique' => 'Tên danh mục này đã tồn tại trong hệ thống.',
        ]);

        $category = $this->categoryRepo->update($id, [
            'name' => trim($request->name),
        ]);

        if (!$category) {
            return response()->json(['message' => 'Danh mục không tồn tại.'], 404);
        }

        return response()->json([
            'message' => 'Cập nhật danh mục thành công!',
            'data' => $category,
        ]);
    }

    public function destroy(string $id)
    {
        $category = $this->categoryRepo->find($id);
        if (!$category) {
            return response()->json(['message' => 'Danh mục không tồn tại.'], 404);
        }

        if ($category->products_count > 0) {
            return response()->json([
                'message' => "Không thể xóa danh mục '{$category->name}' vì đang có {$category->products_count} sản phẩm thuộc danh mục này.",
            ], 400);
        }

        $this->categoryRepo->delete($id);

        return response()->json([
            'message' => 'Xóa danh mục thành công!',
        ]);
    }

    public function trashed()
    {
        $trashedCategories = $this->categoryRepo->getTrashed();
        return response()->json($trashedCategories);
    }

    public function restore(string $id)
    {
        $category = $this->categoryRepo->restore($id);
        if (!$category) {
            return response()->json(['message' => 'Không tìm thấy danh mục trong thùng rác.'], 404);
        }

        return response()->json([
            'message' => "Đã khôi phục danh mục '{$category->name}' thành công!",
            'data' => $category,
        ]);
    }
}
