import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination_2 = ({ meta, setPage,page  }) => {
  return (
    <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
      <div>
        Hiển thị{" "}
        <strong className="text-slate-800">
          {meta.total === 0 ? 0 : meta.from}
        </strong>{" "}
        -{" "}
        <strong className="text-slate-800">
          {meta.total === 0 ? 0 : meta.to}
        </strong>{" "}
        trên tổng số <strong className="text-slate-800">{meta.total}</strong>{" "}
        đơn hàng
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          className="px-2.5 py-1.5 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Trước</span>
        </button>

        <span className="px-3 py-1.5 font-medium text-slate-700">
          Trang {meta.current_page} / {meta.last_page}
        </span>

        <button
          type="button"
          onClick={() => setPage((p) => Math.min(meta.last_page, p + 1))}
          disabled={page >= meta.last_page}
          className="px-2.5 py-1.5 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
        >
          <span>Sau</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination_2;
