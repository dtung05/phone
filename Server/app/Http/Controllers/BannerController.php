<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\Banner\BannerRepoInter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

    /**
     * Danh sách banner cho Staff/Admin
     */
    public function staffIndex(Request $request)
    {
        $filters = [
            'search' => $request->query('search'),
            'position' => $request->query('position'),
            'is_active' => $request->query('is_active'),
        ];
        $perPage = (int) $request->query('per_page', 10);

        $banners = $this->bannerRepo->getStaffBanners($filters, $perPage);
        return response()->json($banners);
    }

    /**
     * Xem chi tiết 1 banner
     */
    public function show($id)
    {
        $banner = $this->bannerRepo->find($id);
        if (!$banner) {
            return response()->json([
                'type' => 'error',
                'message' => 'Không tìm thấy banner #' . $id,
            ], 404);
        }

        return response()->json($banner);
    }

    /**
     * Thêm mới banner
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'link' => 'required|string|max:255',
            'position' => 'required|in:main,left,min, rigth',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'is_active' => 'nullable|in:0,1',
            'imager_file' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            'imager' => 'nullable|string|max:1000',
        ], [
            'title.required' => 'Vui lòng nhập tiêu đề banner.',
            'link.required' => 'Vui lòng nhập đường dẫn liên kết.',
            'position.required' => 'Vui lòng chọn vị trí hiển thị.',
            'start_date.required' => 'Vui lòng chọn ngày bắt đầu.',
            'end_date.required' => 'Vui lòng chọn ngày kết thúc.',
            'end_date.after_or_equal' => 'Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.',
        ]);

        $imagePath = null;
        if ($request->hasFile('imager_file')) {
            $imagePath = $request->file('imager_file')->store('banners', 'public');
        } elseif ($request->filled('imager')) {
            $imagePath = trim($request->imager);
        }

        if (!$imagePath) {
            return response()->json([
                'type' => 'error',
                'message' => 'Vui lòng tải ảnh banner lên hoặc dán link ảnh.',
            ], 422);
        }

        $banner = $this->bannerRepo->create([
            'title' => $request->title,
            'imager' => $imagePath,
            'link' => $request->link,
            'position' => $request->position,
            'is_active' => $request->input('is_active', '1'),
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        return response()->json([
            'type' => 'success',
            'message' => 'Thêm banner quảng cáo thành công!',
            'data' => $banner,
        ], 201);
    }

    /**
     * Cập nhật banner
     */
    public function update(Request $request, $id)
    {
        $banner = $this->bannerRepo->find($id);
        if (!$banner) {
            return response()->json([
                'type' => 'error',
                'message' => 'Không tìm thấy banner #' . $id,
            ], 404);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'link' => 'required|string|max:255',
            'position' => 'required|in:main,left,min, rigth',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'is_active' => 'nullable|in:0,1',
            'imager_file' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            'imager' => 'nullable|string|max:1000',
        ], [
            'title.required' => 'Vui lòng nhập tiêu đề banner.',
            'link.required' => 'Vui lòng nhập đường dẫn liên kết.',
            'position.required' => 'Vui lòng chọn vị trí hiển thị.',
            'start_date.required' => 'Vui lòng chọn ngày bắt đầu.',
            'end_date.required' => 'Vui lòng chọn ngày kết thúc.',
            'end_date.after_or_equal' => 'Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.',
        ]);

        $imagePath = $banner->imager;
        if ($request->hasFile('imager_file')) {
            $newPath = $request->file('imager_file')->store('banners', 'public');
            if ($banner->imager && Storage::disk('public')->exists($banner->imager)) {
                Storage::disk('public')->delete($banner->imager);
            }
            $imagePath = $newPath;
        } elseif ($request->filled('imager')) {
            $imagePath = trim($request->imager);
        }

        $banner->update([
            'title' => $request->title,
            'imager' => $imagePath,
            'link' => $request->link,
            'position' => $request->position,
            'is_active' => $request->input('is_active', $banner->is_active),
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        return response()->json([
            'type' => 'success',
            'message' => 'Cập nhật banner thành công!',
            'data' => $banner,
        ]);
    }

    /**
     * Bật/tắt nhanh trạng thái hiển thị
     */
    public function toggleActive($id)
    {
        $banner = $this->bannerRepo->toggleActive($id);
        if (!$banner) {
            return response()->json([
                'type' => 'error',
                'message' => 'Không tìm thấy banner #' . $id,
            ], 404);
        }

        return response()->json([
            'type' => 'success',
            'message' => 'Đổi trạng thái banner thành công!',
            'data' => $banner,
        ]);
    }

    /**
     * Xóa banner
     */
    public function destroy($id)
    {
        $banner = $this->bannerRepo->find($id);
        if (!$banner) {
            return response()->json([
                'type' => 'error',
                'message' => 'Không tìm thấy banner #' . $id,
            ], 404);
        }

        if ($banner->imager && Storage::disk('public')->exists($banner->imager)) {
            Storage::disk('public')->delete($banner->imager);
        }

        $this->bannerRepo->delete($id);

        return response()->json([
            'type' => 'success',
            'message' => 'Xóa banner quảng cáo thành công!',
        ]);
    }
}
