import { RotateCcw, Search } from "lucide-react";
import { useGetSuppliersQuery } from "../../store/api/purchaseReceiptApi";

const PurchaseSearch = ({
  search,
  supplierId,
  fromDate,
  toDate,
  setSearch,
  setSupplierId,
  setFromDate,
  setToDate,
}) => {
  const { data: suppliers } = useGetSuppliersQuery();
  const handleResetFilters = () => {
    setSearch("");
    setSupplierId("");
    setFromDate("");
    setToDate("");
    setPage(1);
  };
  const hasFilters = Boolean(search || supplierId || fromDate || toDate);
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-4 relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Tìm theo mã phiếu hoặc nhà cung cấp..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all"
          />
        </div>

        <div className="lg:col-span-3">
          <select
            value={supplierId}
            onChange={(e) => {
              setSupplierId(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 outline-none focus:bg-white focus:border-slate-600 transition-all cursor-pointer"
          >
            <option value="">-- Tất cả nhà cung cấp --</option>
            {suppliers?.map((s) => (
              <option key={s.id} value={s.id}>
                {s.company_name}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => {
              setFromDate(e.target.value);
              setPage(1);
            }}
            title="Từ ngày"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-700 outline-none focus:bg-white focus:border-slate-600 cursor-pointer"
          />
        </div>

        <div className="lg:col-span-2">
          <input
            type="date"
            value={toDate}
            onChange={(e) => {
              setToDate(e.target.value);
              setPage(1);
            }}
            title="Đến ngày"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-700 outline-none focus:bg-white focus:border-slate-600 cursor-pointer"
          />
        </div>

        <div className="lg:col-span-1 flex items-center">
          {hasFilters && (
            <button
              onClick={handleResetFilters}
              title="Đặt lại bộ lọc"
              className="w-full flex items-center justify-center p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg text-xs font-medium border border-slate-200 transition-colors"
            >
              <RotateCcw size={15} /> Đặt lại
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseSearch;
