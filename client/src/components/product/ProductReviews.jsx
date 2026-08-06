import { useDeleteReviewMutation } from "../../store/api/reviewApi";
import ReviewForm from "./ReviewForm";

export default function ProductReviews({ reviews, total = 0, data }) {
  const [deleteReview, { isLoading, error }] = useDeleteReviewMutation();
  const handleDeleteReview = async (id) => {
    if (!confirm("Bạn chắc chắn muốn xóa bình luận này?")) return;
    try {
      const result = await deleteReview(id);
    } catch (error) {}
  };
  return (
    <div className="mt-10 flex gap-2">
      <div className="space-y-5 w-150">
        <h2 className="text-2xl font-bold mb-6">Đánh giá sản phẩm ({total})</h2>
        {reviews.map((review) => (
          <div key={review.id} className="bg-white border rounded-xl p-5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{review.user.full_name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(review.created_at).toLocaleDateString("vi-VN")}
                </p>
              </div>
              <div className="text-yellow-500 text-lg">
                {"★".repeat(review.rating)}
                <span className="text-gray-300">
                  {"★".repeat(5 - review.rating)}
                </span>
              </div>
            </div>
            <p className="mt-2 text-gray-700">{review.content}</p>
            <button onClick={() => handleDeleteReview(review.id)}>Xóa</button>
          </div>
        ))}
      </div>

      <ReviewForm data={data} />
    </div>
  );
}
