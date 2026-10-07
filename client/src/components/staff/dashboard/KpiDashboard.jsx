import formatPrice from "@/utils/price";
import { DollarSign, Package, PiggyBank, ShoppingBag } from "lucide-react";

const KpiDashboard = ({ kpi }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Doanh thu thuần
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-black text-slate-800">
            {formatPrice(kpi.total_revenue)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Đơn giao thành công, đã thanh toán</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Tổng giá vốn
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-black text-slate-800">
            {formatPrice(kpi.total_cogs)}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Giá vốn nhập sản phẩm về
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Lợi nhuận ròng
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-black text-emerald-700">
            {formatPrice(kpi.gross_profit)}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-slate-400">(Doanh thu - Vốn)</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Đơn hàng hoàn tất
          </span>
        
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800">
              {kpi.completed_orders_count}
            </span>
            <span className="text-xs text-slate-500">
              / {kpi.total_orders_count} tổng đơn
            </span>
          </div>
          <div className="text-xs text-red-600 mt-1 flex items-center justify-between">
            <span>Hủy: {kpi.cancelled_orders_count} đơn</span>
            <span>Tổng tiền: {formatPrice(kpi.cancelled_amount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiDashboard;
