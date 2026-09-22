<?php

namespace App\Repositories\Review;

use App\Models\Review;
use App\Models\ReviewReply;
use App\Repositories\BaseRepository;

class ReviewRepository extends BaseRepository implements ReviewRepositoryInterface
{
    public function getModel()
    {
        return Review::class;
    }

    /**
     * Lấy danh sách đánh giá của sản phẩm kèm user và replies cho phía khách hàng
     */
    public function getReviewsByProduct(int $productId, int $perPage = 5)
    {
        return $this->model
            ->where('product_id', $productId)
            ->with([
                'user:id,full_name',
                'replies' => function ($q) {
                    $q->with('user:id,full_name,role')->oldest();
                }
            ])
            ->latest('id')
            ->paginate($perPage);
    }

    /**
     * Lấy danh sách đánh giá cho nhân viên quản lý (tìm kiếm, lọc chưa trả lời, xếp hạng sao...)
     */
    public function getStaffReviews(array $filters = [], int $perPage = 10)
    {
        $query = $this->model->with([
            'user:id,full_name,email',
            'product:id,product_name,thumbnail,slug',
            'replies' => function ($q) {
                $q->with('user:id,full_name,role')->latest();
            }
        ]);

        // Lọc theo trạng thái trả lời
        if (!empty($filters['status'])) {
            if ($filters['status'] === 'unreplied') {
                $query->where('is_replied', false);
            } elseif ($filters['status'] === 'replied') {
                $query->where('is_replied', true);
            }
        }

        // Lọc theo số sao rating (1-5)
        if (!empty($filters['rating'])) {
            $query->where('rating', $filters['rating']);
        }
        // Lọc theo sản phẩm cụ thể
        if (!empty($filters['product_id'])) {
            $query->where('product_id', $filters['product_id']);
        }
        // Tìm kiếm theo nội dung, tên khách hàng hoặc tên sản phẩm
        if (!empty($filters['search'])) {
            $search = trim($filters['search']);
            $query->where(function ($q) use ($search) {
                $q->where('content', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($uq) use ($search) {
                        $uq->where('full_name', 'like', "%{$search}%")
                           ->orWhere('email', 'like', "%{$search}%");
                    })
                    ->orWhereHas('product', function ($pq) use ($search) {
                        $pq->where('product_name', 'like', "%{$search}%");
                    });
            });
        }

        return $query->latest('id')->paginate($perPage);
    }

    /**
     * Đếm số lượng bình luận mới chưa được phản hồi
     */
    public function getUnrepliedCount(): int
    {
        return $this->model->where('is_replied', false)->count();
    }

    /**
     * Lấy chi tiết bình luận kèm khách hàng, sản phẩm và danh sách phản hồi
     */
    public function findWithReplies(int $id)
    {
        return $this->model->with([
            'user:id,full_name,email',
            'product:id,product_name,thumbnail,slug',
            'replies.user:id,full_name,role'
        ])->find($id);
    }

    /**
     * Nhân viên gửi câu trả lời cho bình luận của khách
     */
    public function replyReview(int $reviewId, int $userId, string $content): bool
    {
        $review = $this->find($reviewId);
        if (!$review) {
            throw new \Exception("Không tìm thấy bình luận #{$reviewId} để phản hồi.");
        }

        $review->replies()->create([
            'user_id' => $userId,
            'content' => trim($content),
        ]);

        $review->is_replied = true;
        $review->save();

        return true;
    }

    /**
     * Xóa câu trả lời của nhân viên
     */
    public function deleteReply(int $replyId): bool
    {
        $reply = ReviewReply::find($replyId);
        if ($reply) {
            $reviewId = $reply->review_id;
            $reply->delete();
            //Cập nhật lại nếu kh còn câu trả lời nào
            $hasOtherReplies = ReviewReply::where('review_id', $reviewId)->exists();
            if (!$hasOtherReplies) {
                $this->model->where('id', $reviewId)->update(['is_replied' => false]);
            }

            return true;
        }
        return false;
    }
}
