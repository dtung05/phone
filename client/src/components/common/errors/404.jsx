import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search, Flame } from "lucide-react";

export default function Err404() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-emerald-50/30 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#009b7a] text-xs font-semibold uppercase tracking-wider mb-6 shadow-2xs">
          <Search className="w-3.5 h-3.5" />
          <span>Lỗi 404 - Không tìm thấy trang</span>
        </div>

        <div className="relative mb-6 select-none">
          <h1 className="text-8xl sm:text-9xl font-black text-slate-200 tracking-tight">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[#009b7a] to-emerald-600 bg-clip-text text-transparent">
              Quay về trang cũ đi =)))
            </span>
          </div>
        </div>

        <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
          Trang bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc tạm thời không khả dụng. Vui lòng kiểm tra lại đường dẫn!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:text-slate-900 shadow-2xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang trước</span>
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#009b7a] text-white text-sm font-semibold hover:bg-[#008669] shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Về trang chủ</span>
          </Link>

          <Link
            to="/products/sale"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 text-sm font-semibold hover:bg-orange-100/70 transition-all cursor-pointer"
          >
            <Flame className="w-4 h-4 text-orange-500" />
            <span>Xem hàng Sale</span>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200/80 text-xs text-slate-400">
          Cần hỗ trợ gấp? Gọi ngay hotline tư vấn miễn phí:{" "}
          <span className="font-semibold text-slate-600">1800 6868</span>
        </div>
      </div>
    </div>
  );
}
