import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  useGetStaffReviewsQuery,
  useGetUnrepliedReviewsCountQuery,
} from "../../store/api/reviewApi";
import Loading from "../../components/block/Loading";
import NoResult from "../../components/block/NoResult";
import ReviewList from "../../components/review/ReviewList";

const StaffReviewManager = () => {
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  const [activeReplyBox, setActiveReplyBox] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 600);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: reviewsData, isLoading } = useGetStaffReviewsQuery({
    status,
    rating,
    search: debouncedSearch,
    page,
    per_page: 10,
  });

  const { data: countData } = useGetUnrepliedReviewsCountQuery();
  const unrepliedCount = countData?.unreplied_count ?? 0;

  const reviews = reviewsData?.data || [];
  const pagination = {
    total: reviewsData?.total || 0,
    current_page: reviewsData?.current_page || 1,
    last_page: reviewsData?.last_page || 1,
    from: reviewsData?.from || 0,
    to: reviewsData?.to || 0,
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <Link to="/staff/products" className="hover:text-emerald-600">
              Quản trị
            </Link>
            <span>/</span>
            <span className="text-slate-800">Đánh giá & Bình luận</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <MessageSquare className="w-6 h-6 text-emerald-600" />
            Quản lý Đánh giá & Bình luận
          </h1>
        </div>

        {unrepliedCount > 0 && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl text-amber-800 text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>Có {unrepliedCount} bình luận mới chưa phản hồi!</span>
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setStatus("");
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                status === ""
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Tất cả
            </button>
            <button
              type="button"
              onClick={() => {
                setStatus("unreplied");
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                status === "unreplied"
                  ? "bg-white text-amber-700 shadow-2xs font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>Chưa trả lời</span>
              {unrepliedCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-600 text-white text-[10px] font-black">
                  {unrepliedCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setStatus("replied");
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                status === "replied"
                  ? "bg-white text-emerald-700 shadow-2xs font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Đã trả lời
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
                setPage(1);
              }}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Tất cả số sao</option>
              <option value="5">5 sao (Rất hài lòng)</option>
              <option value="4">4 sao (Hài lòng)</option>
              <option value="3">3 sao (Bình thường)</option>
              <option value="2">2 sao (Chưa hài lòng)</option>
              <option value="1">1 sao (Kém / Khiếu nại)</option>
            </select>

            <div className="relative w-64">
              <Search
                size={14}
                className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm khách hàng, sản phẩm..."
                className="w-full pl-8 pr-20 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all"
              />
              <button
                type="button"
                onClick={() => {
                  setRating("");
                  setSearch("");
                  setPage(1);
                  setStatus("");
                }}
                className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 text-[10px] font-semibold text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                Đặt lại
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <Loading text="Đang tải danh sách bình luận" />
        ) : reviews.length === 0 ? (
          <NoResult
            Icon={MessageSquare}
            title="Không tìm thấy bình luận nào"
            content="Thử thay đổi bộ lọc trạng thái hoặc từ khóa tìm kiếm"
          />
        ) : (
          <ReviewList
            reviews={reviews}
            activeReplyBox={activeReplyBox}
            setActiveReplyBox={setActiveReplyBox}
          />
        )}
        {pagination.last_page > 1 && (
          <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Trang <strong>{pagination.current_page}</strong> /{" "}
              <strong>{pagination.last_page}</strong> (Tổng {pagination.total}{" "}
              bình luận)
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from(
                { length: pagination.last_page },
                (_, i) => i + 1,
              ).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                    p === page
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                disabled={page >= pagination.last_page}
                onClick={() =>
                  setPage((p) => Math.min(pagination.last_page, p + 1))
                }
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffReviewManager;
