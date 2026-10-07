import formatPrice from "@/utils/price";
import { useMemo, useState } from "react";
import { CreditCard, Layers } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const DashboardRevenueBreakDown = ({  stats, kpi }) => {
  const [breakdownTab, setBreakdownTab] = useState("category"); 

  const categories = stats.categories || [];
  const brands = stats.brands || [];
  const paymentMethods = stats.payment_methods || [];
  const COLORS = [
    "#059669", // emerald-600
    "#2563eb", // blue-600
    "#d97706", // amber-600
    "#7c3aed", // violet-600
    "#db2777", // pink-600
    "#0891b2", // cyan-600
    "#4b5563", // gray-600
  ];
  const pieData = useMemo(() => {
    const source = breakdownTab === "category" ? categories : brands;
    const key = breakdownTab === "category" ? "category_name" : "brand_name";
    return source.map((item) => ({
      name: item[key] || "Khác",
      value: Number(item.revenue) || 0,
      quantity: Number(item.total_quantity) || 0,
    }));
  }, [breakdownTab, categories, brands]);
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            Cơ cấu Doanh thu
          </h3>
          <div className="inline-flex rounded-md border border-slate-200 p-0.5 bg-slate-50 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setBreakdownTab("category")}
              className={`px-2 py-1 rounded transition-colors ${
                breakdownTab === "category"
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Danh mục
            </button>
            <button
              type="button"
              onClick={() => setBreakdownTab("brand")}
              className={`px-2 py-1 rounded transition-colors ${
                breakdownTab === "brand"
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Thương hiệu
            </button>
          </div>
        </div>
        {pieData.length === 0 ? (
          <div className="h-56 flex items-center justify-center text-slate-400 text-xs">
            Chưa có số liệu danh mục trong kỳ này
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-1/2 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val) => [formatPrice(val), "Doanh thu"]}
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full sm:w-1/2 space-y-2 text-xs">
              {pieData.slice(0, 5).map((item, idx) => {
                const totalRev = kpi.total_revenue || 1;
                const percent = ((item.value / totalRev) * 100).toFixed(1);
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{
                          backgroundColor: COLORS[idx % COLORS.length],
                        }}
                      ></span>
                      <span className="font-semibold text-slate-800 truncate">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-slate-800">
                        {formatPrice(item.value)}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {item.quantity} cái ({percent}%)
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100">
        <div className="text-xs font-bold text-slate-600 mb-2 flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5 text-slate-400" />
          Phương thức thanh toán
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {paymentMethods.map((pm, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col"
            >
              <span className="font-bold uppercase text-[11px] text-slate-600">
                {pm.payment_method === "cod"
                  ? "Tiền mặt (COD)"
                  : "VNPAY / Online"}
              </span>
              <span className="font-extrabold text-slate-900 mt-1">
                {formatPrice(pm.revenue)}
              </span>
              <span className="text-[10px] text-slate-400">
                {pm.orders_count} đơn hàng
              </span>
            </div>
          ))}
          {paymentMethods.length === 0 && (
            <span className="text-xs text-slate-400 italic">
              Chưa có đơn hàng
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardRevenueBreakDown;
