import { RotateCcw, Search } from "lucide-react";

const BannerSearch = ({
  search = "",
  setSearch,
  position = "",
  setPosition,
  isActive = "",
  setIsActive,
  setPage,
  handleResetFilters,
  hasFilters = false,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-5 relative">
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
            placeholder="Tìm theo tiêu đề banner..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all"
          />
        </div>

        <div className="lg:col-span-3">
          <select
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 outline-none focus:bg-white focus:border-slate-600 transition-all cursor-pointer"
          >
            <option value="">-- Tất cả vị trí --</option>
            <option value="main">Banner Chính (Slider)</option>
            <option value="left">Cột Trái (Đứng)</option>
            <option value="min">Banner Phụ (Cuộn)</option>
          </select>
        </div>

        <div className="lg:col-span-3">
          <select
            value={isActive}
            onChange={(e) => {
              setIsActive(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 outline-none focus:bg-white focus:border-slate-600 transition-all cursor-pointer"
          >
            <option value="">-- Trạng thái hiển thị --</option>
            <option value="1">Đang bật (Active)</option>
            <option value="0">Tạm ẩn (Inactive)</option>
          </select>
        </div>

        <div className="lg:col-span-1 flex items-center">
          {hasFilters && (
            <button
              onClick={handleResetFilters}
              title="Đặt lại bộ lọc"
              className="w-full flex items-center justify-center p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg text-xs font-medium border border-slate-200 transition-colors"
            >
              <RotateCcw size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerSearch;
