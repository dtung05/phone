<?php

namespace App\Repositories\Review;

use App\Repositories\RepositoryInterface;

interface ReviewRepositoryInterface extends RepositoryInterface
{
    /**
     * Lấy danh sách đánh giá của sản phẩm (cho trang chi tiết người dùng)
     */
    public function getReviewsByProduct(int $productId, int $perPage = 5);

    /**
     * Lấy danh sách đánh giá cho nhân viên quản lý (phân trang, bộ lọc)
     */
    public function getStaffReviews(array $filters = [], int $perPage = 10);

    /**
     * Đếm số lượng bình luận mới chưa được phản hồi
     */
    public function getUnrepliedCount(): int;

    /**
     * Lấy chi tiết bình luận kèm khách hàng, sản phẩm và danh sách phản hồi
     */
    public function findWithReplies(int $id);

    /**
     * Nhân viên gửi câu trả lời cho bình luận của khách
     */
    public function replyReview(int $reviewId, int $userId, string $content): bool;

    /**
     * Xóa câu trả lời của nhân viên
     */
    public function deleteReply(int $replyId): bool;
}
