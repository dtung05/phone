import { useDeleteReviewMutation } from "../../store/api/reviewApi";
import ReviewForm from "./ReviewForm";

export default function ProductReviews({ reviews = [], total = 0, data }) {
  const [deleteReview, { isLoading }] = useDeleteReviewMutation();

  const handleDeleteReview = async (id) => {
    if (!confirm("Bạn chắc chắn muốn xóa bình luận này?")) return;
    try {
      await deleteReview(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white p-5 space-y-5">
      <h2 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2.5">
        Khách hàng đánh giá ({total})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* DANH SÁCH REVIEW (7 CỘT) */}
        <div className="md:col-span-7 space-y-3">
          {reviews.length === 0 ? (
            <div className="border border-dashed border-gray-200 rounded p-6 text-center text-xs text-gray-500">
              Chưa có đánh giá nào cho sản phẩm này.
            </div>
          ) : (
            reviews.map((review) => {
              const userName = review.user?.full_name || "Khách hàng";
              const reviewDate = review.created_at
                ? new Date(review.created_at).toLocaleDateString("vi-VN")
                : "—";

              return (
                <div
                  key={review.id}
                  className="border-b border-gray-100 last:border-b-0 pb-3 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800">{userName}</span>
                      <span className="text-amber-400 font-bold">
                        {"★".repeat(review.rating || 5)}
                        <span className="text-gray-200">
                          {"★".repeat(Math.max(0, 5 - (review.rating || 5)))}
                        </span>
                      </span>
                    </div>
                    <span className="text-gray-400 text-[11px]">{reviewDate}</span>
                  </div>

                  <p className="text-xs text-gray-700 leading-relaxed">
                    {review.content}
                  </p>

                  {/* CÂU TRẢ LỜI CỦA SHOP / NHÂN VIÊN */}
                  {review.replies && review.replies.length > 0 && (
                    <div className="mt-2 pl-3 border-l-2 border-emerald-500 space-y-1.5">
                      {review.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className="bg-emerald-50/70 border border-emerald-100 p-2.5 rounded-lg text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-emerald-800 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                              Phản hồi từ Phone Store ({reply.user?.full_name || "Chăm sóc khách hàng"})
                            </span>
                            <span className="text-emerald-700/60 text-[10px]">
                              {reply.created_at ? new Date(reply.created_at).toLocaleDateString("vi-VN") : "—"}
                            </span>
                          </div>
                          <p className="text-gray-800 leading-relaxed font-medium">
                            {reply.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="text-right">
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-[11px] text-gray-400 hover:text-red-600 transition cursor-pointer"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* FORM ĐÁNH GIÁ (5 CỘT) */}
        <div className="md:col-span-5">
          <ReviewForm data={data} />
        </div>
      </div>
    </div>
  );
}
