import {
  CheckCircle2,
  Clock,
  Loader2,
  MessageSquare,
  Send,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import {
  useDeleteStaffReviewMutation,
  useDeleteStaffReviewReplyMutation,
  useReplyReviewMutation,
} from "../../../store/api/reviewApi";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/slices/toastSlice";
import { useState } from "react";
import NoResult from "../../block/NoResult";

const ProductReview = ({
  reviews,
  unrepliedCount,
  activeReplyBox,
  setActiveReplyBox,
}) => {
  const [deleteReview] = useDeleteStaffReviewMutation();
  const [deleteReply] = useDeleteStaffReviewReplyMutation();
  const [replyInputs, setReplyInputs] = useState({});
  const [replyReview, { isLoading: isReplying }] = useReplyReviewMutation();

  const dispatch = useDispatch();

  const handleReplySubmit = async (reviewId) => {
    const text = replyInputs[reviewId]?.trim();
    if (!text) {
      dispatch(
        showToast({
          type: "error",
          message: "Vui lòng nhập nội dung phản hồi!",
        }),
      );
      return;
    }

    try {
      await replyReview({ id: reviewId, content: text }).unwrap();
      dispatch(
        showToast({
          type: "success",
          message: "Đã gửi câu trả lời đến khách hàng!",
        }),
      );
      setReplyInputs((prev) => ({ ...prev, [reviewId]: "" }));
      setActiveReplyBox(null);
    } catch (err) {
      dispatch(
        showToast({
          type: "error",
          message: err?.data?.message || "Lỗi khi gửi phản hồi!",
        }),
      );
    }
  };
  const handleDeleteReview = async (reviewId) => {
    if (!confirm("Bạn có chắc chắn muốn xóa bình luận này của khách hàng?"))
      return;
    try {
      await deleteReview(reviewId).unwrap();
      dispatch(
        showToast({ type: "success", message: "Đã xóa bình luận thành công!" }),
      );
    } catch (err) {
      dispatch(
        showToast({ type: "error", message: "Xóa bình luận thất bại!" }),
      );
    }
  };

  const handleDeleteReply = async (replyId) => {
    if (!confirm("Bạn có chắc chắn muốn xóa phản hồi này?")) return;
    try {
      await deleteReply(replyId).unwrap();
      dispatch(
        showToast({ type: "success", message: "Đã xóa phản hồi thành công!" }),
      );
    } catch (err) {
      dispatch(showToast({ type: "error", message: "Xóa phản hồi thất bại!" }));
    }
  };
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">
            Đánh giá từ khách hàng ({reviews.length})
          </h3>
        </div>
        {unrepliedCount > 0 ? (
          <span className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1.5">
            <Clock size={14} className="text-amber-600" />
            Còn {unrepliedCount} bình luận chưa phản hồi
          </span>
        ) : (
          <span className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 size={14} /> Tất cả bình luận đã được phản hồi
          </span>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
           <NoResult
          Icon={MessageSquare}
          title="Chưa có đánh giá nào"
          content="Sản phẩm này chưa nhận được đánh giá nào từ khách hàng"
        />
        </div>
       
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => {
            const userName = rev.user?.full_name || "Khách hàng ẩn danh";
            const isReplied = Boolean(rev.is_replied);
            const replies = rev.replies || [];
            const isReplyingThis = activeReplyBox === rev.id;

            return (
              <div
                key={rev.id}
                className={`bg-white rounded-2xl border p-5 shadow-2xs transition-all ${
                  !isReplied
                    ? "border-amber-200 ring-2 ring-amber-50"
                    : "border-slate-200"
                }`}
              >
                {/* Header đánh giá */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-xs">
                          {userName}
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {rev.created_at
                            ? new Date(rev.created_at).toLocaleString("vi-VN")
                            : "—"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 text-xs mt-0.5">
                        {"★".repeat(rev.rating || 5)}
                        <span className="text-slate-200">
                          {"★".repeat(Math.max(0, 5 - (rev.rating || 5)))}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isReplied ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <CheckCircle2 size={12} /> Đã trả lời
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                        <Clock size={12} /> Chưa trả lời
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeleteReview(rev.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa bình luận vi phạm"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-700 mt-3 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  {rev.content}
                </p>

                {replies.length > 0 && (
                  <div className="mt-3.5 pl-4 border-l-2 border-emerald-500 space-y-2.5">
                    {replies.map((rep) => (
                      <div
                        key={rep.id}
                        className="bg-emerald-50/60 border border-emerald-100 p-3 rounded-xl text-xs flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 font-bold text-emerald-800 text-[11px]">
                              <ShieldCheck
                                size={13}
                                className="text-emerald-600"
                              />
                              {rep.user?.full_name || "Nhân viên hỗ trợ"}
                            </span>
                            <span className="text-[10px] text-emerald-600/70">
                              {rep.created_at
                                ? new Date(rep.created_at).toLocaleString(
                                    "vi-VN",
                                  )
                                : "—"}
                            </span>
                          </div>
                          <p className="text-slate-800 leading-relaxed font-medium">
                            {rep.content}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteReply(rep.id)}
                          className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                          title="Xóa phản hồi này"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Nút mở hộp trả lời hoặc Khung trả lời */}
                <div className="mt-3.5 pt-3 border-t border-slate-100">
                  {isReplyingThis ? (
                    <div className="space-y-2 animate-fadeIn">
                      <textarea
                        rows={2}
                        placeholder="Nhập câu trả lời cho khách hàng (ví dụ: Chào bạn, cảm ơn bạn đã ủng hộ...)"
                        value={replyInputs[rev.id] || ""}
                        onChange={(e) =>
                          setReplyInputs((prev) => ({
                            ...prev,
                            [rev.id]: e.target.value,
                          }))
                        }
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveReplyBox(null)}
                          className="px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          Hủy
                        </button>
                        <button
                          type="button"
                          disabled={isReplying}
                          onClick={() => handleReplySubmit(rev.id)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors disabled:opacity-50"
                        >
                          {isReplying ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : (
                            <Send size={13} />
                          )}
                          <span>Gửi phản hồi</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveReplyBox(rev.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                    >
                      <Send size={13} />
                      <span>
                        {replies.length > 0
                          ? "Thêm câu trả lời khác"
                          : "Trả lời bình luận này"}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductReview;
