import React, { useEffect, useState } from "react";
import { TrendingUp, RotateCcw, AlertCircle, Filter } from "lucide-react";

import { useGetDashboardStatsQuery } from "../../../store/api/dashboardApi";
import KpiDashboard from "@/components/staff/dashboard/KpiDashboard";
import DashboardRevenueBreakDown from "@/components/staff/dashboard/DashboardRevenueBreakDown";
import ProductTopSales from "@/components/staff/dashboard/ProductTopSales";
import { useForm } from "react-hook-form";
import { getPresetRange } from "@/utils/date_time";

const Dashboard = () => {
 
  const [activePreset, setActivePreset] = useState("30days");
  const initialRange = getPresetRange("30days");

  const [filterParams, setFilterParams] = useState(initialRange);

  const { data, isLoading, isFetching, isError, refetch } =
    useGetDashboardStatsQuery({
      start_date: filterParams.start,
      end_date: filterParams.end,
    });
  const stats = data?.data || {};
  const kpi = stats.kpi || {};
  const topProducts = stats.top_products || [];

  const handleApplyPreset = (preset) => {
    setActivePreset(preset);
    const range = getPresetRange(preset);
    setFilterParams(range);
  };

  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    setValue("start_date", filterParams.start);
    setValue("end_date", filterParams.end);
  }, [filterParams, setValue]);

  const onSubmit = (data) => {
    setFilterParams({ start: data.start_date, end: data.end_date });
  };
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            Báo cáo Doanh thu & Lợi nhuận
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Theo dõi dòng tiền, giá vốn bình quân và lợi nhuận gộp thực tế
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
            <button
              type="button"
              onClick={() => handleApplyPreset("today")}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activePreset === "today"
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Hôm nay
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("7days")}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activePreset === "7days"
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              7 ngày
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("30days")}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activePreset === "30days"
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              30 ngày
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("this_month")}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activePreset === "this_month"
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Tháng này
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-2 text-xs"
          >
            <input
              type="date"
              {...register("start_date")}
              className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-hidden focus:border-emerald-600"
            />
            <span className="text-slate-400 font-medium">đến</span>
            <input
              type="date"
              {...register("end_date")}
              className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-hidden focus:border-emerald-600"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Filter className="w-3.5 h-3.5" />
              Lọc
            </button>
          </form>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            title="Làm mới dữ liệu"
            className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 disabled:opacity-50 transition-colors"
          >
            <RotateCcw
              className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* loading khung */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Không thể tải dữ liệu báo cáo doanh thu. Vui lòng thử lại!
          </div>
          <button
            onClick={() => refetch()}
            className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 font-semibold"
          >
            Thử lại
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <KpiDashboard kpi={kpi} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* cột cơ cấu doanh thu */}
            <DashboardRevenueBreakDown kpi={kpi} stats={stats} />
            {/* // sản phẩm bán chạy nhất */}
            <ProductTopSales topProducts={topProducts} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
