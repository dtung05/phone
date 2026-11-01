import formatPrice from "@/utils/price";
import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const DashboardRevenueBreakDown = ({ stats, kpi }) => {
  const [breakdownTab, setBreakdownTab] = useState("category");

  const categories = stats.categories || [];
  const brands = stats.brands || [];
  const paymentMethods = stats.payment_methods || [];

  const COLORS = [
    "#059669", 
    "#3b82f6", 
    "#64748b", 
    "#f59e0b", 
    "#8b5cf6", 
    "#06b6d4",
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
    <div className="bg-white p-4 rounded-md border border-slate-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
          <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
            Cơ cấu doanh thu
          </h3>
          <div className="inline-flex rounded border border-slate-200 p-0.5 bg-slate-50 text-xs">
            <button
              type="button"
              onClick={() => setBreakdownTab("category")}
              className={`px-2 py-0.5 rounded transition-colors ${
                breakdownTab === "category"
                  ? "bg-white text-slate-900 font-medium shadow-2xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Danh mục
            </button>
            <button
              type="button"
              onClick={() => setBreakdownTab("brand")}
              className={`px-2 py-0.5 rounded transition-colors ${
                breakdownTab === "brand"
                  ? "bg-white text-slate-900 font-medium shadow-2xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Thương hiệu
            </button>
          </div>
        </div>

        {pieData.length === 0 ? (
          <div className="h-56 flex items-center justify-center text-slate-400 text-xs">
            Chưa có số liệu trong kỳ này
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-1/2 h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={2}
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [formatPrice(value), "Doanh thu"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full sm:w-1/2 space-y-1.5 text-xs">
              {pieData.slice(0, 5).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-slate-600 py-0.5"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-xs shrink-0"
                      style={{
                        backgroundColor: COLORS[idx % COLORS.length],
                      }}
                    ></span>
                    <span className="truncate">{item.name}</span>
                  </div>
                  <span className="font-mono text-slate-900 font-medium">
                    {formatPrice(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {paymentMethods.length > 0 && (
        <div className="pt-3 border-t border-slate-100 mt-3">
          <p className="text-[11px] text-slate-400 uppercase font-medium mb-1.5">
            Kênh thanh toán
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {paymentMethods.map((pm, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-slate-50 p-1.5 rounded"
              >
                <span className="text-slate-600">{pm.method || "Khác"}</span>
                <span className="font-mono font-medium text-slate-900">
                  {formatPrice(pm.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardRevenueBreakDown;
