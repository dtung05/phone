import formatPrice from "@/utils/price";

const KpiDashboard = ({ kpi }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="bg-white p-4 rounded-md border border-slate-200">
        <p className="text-xs text-slate-500 font-medium">Doanh thu thuần</p>
        <p className="text-xl font-bold text-slate-900 mt-1 font-mono">
          {formatPrice(kpi.total_revenue)}
        </p>
        <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          Đã thanh toán & hoàn tất
        </p>
      </div>

      <div className="bg-white p-4 rounded-md border border-slate-200">
        <p className="text-xs text-slate-500 font-medium">Tổng giá vốn hàng bán</p>
        <p className="text-xl font-bold text-slate-900 mt-1 font-mono">
          {formatPrice(kpi.total_cogs)}
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          Theo giá nhập bình quân kho
        </p>
      </div>

      <div className="bg-white p-4 rounded-md border border-slate-200">
        <p className="text-xs text-slate-500 font-medium">Lợi nhuận gộp</p>
        <p className="text-xl font-bold text-emerald-700 mt-1 font-mono">
          {formatPrice(kpi.gross_profit)}
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          Doanh thu thuần trừ giá vốn
        </p>
      </div>

      <div className="bg-white p-4 rounded-md border border-slate-200">
        <p className="text-xs text-slate-500 font-medium">Đơn hàng hoàn tất</p>
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-xl font-bold text-slate-900 font-mono">
            {kpi.completed_orders_count || 0}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            / {kpi.total_orders_count || 0} tổng đơn
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          Hủy: <span className="text-slate-600 font-medium">{kpi.cancelled_orders_count || 0}</span> ({formatPrice(kpi.cancelled_amount || 0)})
        </p>
      </div>
    </div>
  );
};

export default KpiDashboard;
