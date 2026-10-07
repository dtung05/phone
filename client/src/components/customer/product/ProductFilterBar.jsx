import { Filter, RotateCcw, X, Layers, Award, ArrowUpDown } from "lucide-react";

export default function ProductFilterBar({
  categories = [],
  brands = [],
  selectedCategory = "",
  onSelectCategory,
  selectedBrand = "",
  onSelectBrand,
  selectedSort = "",
  onSelectSort,
  total = 0,
  onReset,
  hasFilters = false,
  showBrandFilter = true,
  showCategoryFilter = true,
  showSort = false,
  title = "Bộ lọc sản phẩm",
  className = "",
}) {
  const activeCategoryObj = categories?.find(
    (c) => String(c.id) === String(selectedCategory)
  );
  const activeBrandObj = brands?.find(
    (b) => String(b.id) === String(selectedBrand)
  );

  return (
    <div
      className={`bg-white border border-gray-200/80 rounded-2xl p-4 shadow-2xs space-y-3 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
          <div className="w-7 h-7 rounded-lg bg-[#d9f7eb] text-[#009b7a] flex items-center justify-center shrink-0">
            <Filter size={15} />
          </div>
          <span>{title}</span>
          <span className="px-2 py-0.5 rounded-full bg-[#eefbf6] text-[#006b5a] text-[11px] font-semibold border border-[#d9f7eb]">
            {total} sản phẩm
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:justify-end">
          {showCategoryFilter && categories?.length > 0 && (
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => onSelectCategory && onSelectCategory(e.target.value)}
                className={`py-1.5 pl-3 pr-8 rounded-xl text-xs font-semibold border transition-all cursor-pointer outline-none ${
                  selectedCategory
                    ? "bg-[#eefbf6] border-[#009b7a] text-[#006b5a]"
                    : "bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300 focus:bg-white focus:border-[#009b7a]"
                }`}
              >
                <option value="">-- Tất cả danh mục --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.products_count !== undefined ? `(${c.products_count})` : ""}
                  </option>
                ))}
              </select>
            </div>
          )}

          {showBrandFilter && brands?.length > 0 && (
            <div className="relative">
              <select
                value={selectedBrand}
                onChange={(e) => onSelectBrand && onSelectBrand(e.target.value)}
                className={`py-1.5 pl-3 pr-8 rounded-xl text-xs font-semibold border transition-all cursor-pointer outline-none ${
                  selectedBrand
                    ? "bg-[#eefbf6] border-[#009b7a] text-[#006b5a]"
                    : "bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300 focus:bg-white focus:border-[#009b7a]"
                }`}
              >
                <option value="">-- Tất cả thương hiệu --</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} {b.products_count !== undefined ? `(${b.products_count})` : ""}
                  </option>
                ))}
              </select>
            </div>
          )}

          {showSort && (
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => onSelectSort && onSelectSort(e.target.value)}
                className="py-1.5 pl-3 pr-8 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 outline-none hover:border-gray-300 focus:bg-white focus:border-[#009b7a] cursor-pointer"
              >
                <option value="">-- Sắp xếp --</option>
                <option value="price_asc">Giá: Thấp đến Cao</option>
                <option value="price_desc">Giá: Cao đến Thấp</option>
                <option value="discount">Giảm giá nhiều nhất</option>
                <option value="newest">Mới nhất</option>
              </select>
            </div>
          )}

          {hasFilters && (
            <button
              onClick={onReset}
              title="Đặt lại bộ lọc"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-[#d9f7eb] text-gray-600 hover:text-[#006b5a] hover:border-[#009b7a] text-xs font-semibold transition-all cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Đặt lại</span>
            </button>
          )}
        </div>
      </div>

      {hasFilters && (
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-gray-100 text-xs">
          <span className="text-[11px] font-semibold text-gray-400">Đang lọc theo:</span>

          {activeCategoryObj && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#eefbf6] text-[#006b5a] text-xs font-semibold border border-[#d9f7eb]">
              <Layers size={12} className="text-[#009b7a]" />
              <span>{activeCategoryObj.name}</span>
              <button
                type="button"
                onClick={() => onSelectCategory && onSelectCategory("")}
                className="hover:text-red-500 cursor-pointer ml-0.5"
                title="Bỏ chọn danh mục"
              >
                <X size={13} />
              </button>
            </span>
          )}

          {activeBrandObj && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#eefbf6] text-[#006b5a] text-xs font-semibold border border-[#d9f7eb]">
              <Award size={12} className="text-[#009b7a]" />
              <span>{activeBrandObj.name}</span>
              <button
                type="button"
                onClick={() => onSelectBrand && onSelectBrand("")}
                className="hover:text-red-500 cursor-pointer ml-0.5"
                title="Bỏ chọn thương hiệu"
              >
                <X size={13} />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={onReset}
            className="text-[11px] font-semibold text-[#009b7a] hover:underline cursor-pointer ml-1"
          >
            Xóa tất cả
          </button>
        </div>
      )}
    </div>
  );
}
