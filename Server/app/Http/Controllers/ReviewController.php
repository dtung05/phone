<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Repositories\Review\ReviewRepositoryInterface;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    protected $reviewRepo;

    public function __construct(ReviewRepositoryInterface $reviewRepo)
    {
        $this->reviewRepo = $reviewRepo;
    }

    /**
     * Lấy danh sách đánh giá của 1 sản phẩm (cho khách hàng)
     */
    public function index(Product $product)
    {
        return response()->json($this->reviewRepo->getReviewsByProduct($product->id, 5));
    }

    /**
     * Khách hàng gửi đánh giá mới
     */
    public function store(Request $request)
    {
        $request->validate([
            'productId' => 'required|exists:products,id',
            'rating' => 'required|integer|between:1,5',
            'content' => 'required|string|max:1000'
        ], [
            'productId.required' => 'Mã sản phẩm không hợp lệ.',
            'rating.required' => 'Vui lòng chọn số sao đánh giá.',
            'content.required' => 'Vui lòng nhập nội dung đánh giá.',
        ]);

        try {
            $userId = auth()->id() ?? 1;
            $this->reviewRepo->create([
                'user_id' => $userId,
                'product_id' => $request->productId,
                'rating' => $request->rating,
                'content' => trim($request->content),
                'is_replied' => false,
            ]);

            return response()->json([
                'type' => 'success',
                'message' => 'Gửi đánh giá thành công! Đánh giá của bạn đã được ghi nhận.',
            ], 201);
        } catch (\Exception $err) {
            return response()->json([
                'type' => 'error',
                'message' => 'Lỗi máy chủ khi gửi đánh giá: ' . $err->getMessage(),
            ], 500);
        }
    }

    /**
     * Danh sách đánh giá cho nhân viên quản lý (bộ lọc, tìm kiếm, phân trang)
     */
    public function staffIndex(Request $request)
    {
        $filters = [
            'status' => $request->query('status'), 
            'rating' => $request->query('rating'), // 1..5
            'search' => $request->query('search'),
            'product_id' => $request->query('product_id'),
        ];

        $perPage = (int) $request->query('per_page', 10);
        $reviews = $this->reviewRepo->getStaffReviews($filters, $perPage);

        return response()->json($reviews);
    }

    /**
     * Lấy số lượng bình luận mới chưa phản hồi (phục vụ badge notification)
     */
    public function unrepliedCount()
    {
        $count = $this->reviewRepo->getUnrepliedCount();
        return response()->json([
            'unreplied_count' => $count,
        ]);
    }

    /**
     * Nhân viên gửi phản hồi cho bình luận của khách hàng
     */
    public function reply(Request $request, $id)
    {
        $request->validate([
            'content' => 'required|string|min:2|max:2000',
        ], [
            'content.required' => 'Vui lòng nhập nội dung câu trả lời.',
            'content.min' => 'Nội dung phản hồi tối thiểu 2 ký tự.',
        ]);

        try {
            $userId = auth()->id() ?? 1;
            $this->reviewRepo->replyReview($id, $userId, $request->content);

            return response()->json([
                'type' => 'success',
                'message' => 'Đã gửi phản hồi thành công đến khách hàng!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'type' => 'error',
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Xóa đánh giá (vi phạm chính sách)
     */
    public function destroy($id)
    {
        try {
            $this->reviewRepo->delete($id);
            return response()->json([
                'type' => 'success',
                'message' => 'Xóa đánh giá thành công.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'type' => 'error',
                'message' => 'Không thể xóa đánh giá.',
            ], 500);
        }
    }

    /**
     * Xóa câu trả lời của nhân viên
     */
    public function destroyReply($replyId)
    {
        try {
            $this->reviewRepo->deleteReply($replyId);
            return response()->json([
                'type' => 'success',
                'message' => 'Xóa phản hồi thành công.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'type' => 'error',
                'message' => 'Không thể xóa phản hồi.',
            ], 500);
        }
    }
}
