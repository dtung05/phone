import React, { useEffect, useState } from "react";
import { RotateCcw, AlertCircle, Filter } from "lucide-react";
import { useGetDashboardStatsQuery } from "../../../store/api/dashboardApi";
import KpiDashboard from "@/components/staff/dashboard/KpiDashboard";
import DashboardRevenueBreakDown from "@/components/staff/dashboard/DashboardRevenueBreakDown";
import ProductTopSales from "@/components/staff/dashboard/ProductTopSales";
import { useForm } from "react-hook-form";
import { getPresetRange } from "@/utils/date_time";
import Button from "@/components/common/form/Button";

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
    <div className="space-y-4 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 tracking-tight">
            Báo cáo doanh thu & Lợi nhuận
          </h1>
          <p className="text-xs text-slate-500">
            Theo dõi dòng tiền, giá vốn bình quân và kết quả kinh doanh thực tế
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded border border-slate-200 p-0.5 bg-slate-50 text-xs">
            {[
              { id: "today", label: "Hôm nay" },
              { id: "7days", label: "7 ngày" },
              { id: "30days", label: "30 ngày" },
              { id: "this_month", label: "Tháng này" },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleApplyPreset(p.id)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activePreset === p.id
                    ? "bg-white text-slate-900 font-medium shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-1.5 text-xs"
          >
            <input
              type="date"
              {...register("start_date")}
              className="px-2 py-1 border border-slate-200 focus:border-emerald-600 rounded text-slate-700 bg-white outline-none"
            />
            <span className="text-slate-400">—</span>
            <input
              type="date"
              {...register("end_date")}
              className="px-2 py-1 border border-slate-200 focus:border-emerald-600 rounded text-slate-700 bg-white outline-none"
            />
            <Button
              type="submit"
              variant="primary"
              size="xs"
              icon={Filter}
            >
              Lọc
            </Button>
          </form>

          <Button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            variant="secondary"
            size="xs"
            title="Tải lại dữ liệu"
          >
            <RotateCcw
              size={13}
              className={isFetching ? "animate-spin text-slate-600" : ""}
            />
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-slate-100 rounded-md"></div>
          ))}
        </div>
      )}

      {isError && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-rose-700 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle size={15} className="text-rose-600 shrink-0" />
            <span>Không thể tải dữ liệu báo cáo doanh thu. Vui lòng thử lại!</span>
          </div>
          <button
            onClick={() => refetch()}
            className="px-2.5 py-1 bg-rose-600 text-white rounded hover:bg-rose-700 font-medium"
          >
            Thử lại
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <KpiDashboard kpi={kpi} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DashboardRevenueBreakDown kpi={kpi} stats={stats} />
            <ProductTopSales topProducts={topProducts} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
