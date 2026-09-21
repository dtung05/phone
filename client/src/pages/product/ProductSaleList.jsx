import { useState } from "react";
import { Link } from "react-router-dom";
import { Flame, Filter, RotateCcw, PackageX } from "lucide-react";
import { useGetProductsSalePaginatedQuery } from "../../store/api/product";
import { useGetBrandsQuery } from "../../store/api/brandApi";
import { useGetCategoryQuery } from "../../store/api/CategoryApi";
import Loading from "../../components/block/Loading";
import Pagination from "../../components/block/Pagination";
import { formatPrice } from "../../utils/price";
import { getImageUrl } from "../../utils/image";

const ProductSaleList = () => {
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [page, setPage] = useState(1);

  const { data: categories } = useGetCategoryQuery();
  const { data: brands } = useGetBrandsQuery();

  const { data: response, isLoading } = useGetProductsSalePaginatedQuery({
    page,
    brand_id: brandId,
    category_id: categoryId,
  });

  const products = response?.data || [];
  const total = response?.total || 0;
  const lastPage = response?.last_page || 1;
  const currentPage = response?.current_page || 1;

  const handleResetFilters = () => {
    setCategoryId("");
    setBrandId("");
    setPage(1);
  };

  const hasFilters = Boolean(categoryId || brandId);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Banner / Header Title */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 p-6 md:p-8 text-white shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-wider mb-3">
            <Flame size={15} className="fill-white" />
            <span>Chương trình khuyến mãi đặc biệt</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            DEAL SỐC CÔNG NGHỆ
          </h1>
          <p className="text-xs sm:text-sm text-white/90 mt-2">
            Tổng hợp các mẫu điện thoại và thiết bị đang được giảm giá cực sốc. Số lượng có hạn, nhanh tay săn ngay!
          </p>
        </div>
        <div className="absolute -right-8 -bottom-8 opacity-15 pointer-events-none text-white">
          <Flame size={240} />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 w-full sm:w-auto">
          <Filter size={16} className="text-red-500" />
          <span>Bộ lọc sản phẩm sale:</span>
          <span className="text-slate-400 font-normal">({total} sản phẩm)</span>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto flex-wrap">
          <select
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setPage(1);
            }}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 outline-none focus:bg-white focus:border-slate-600 cursor-pointer"
          >
            <option value="">-- Tất cả danh mục --</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={brandId}
            onChange={(e) => {
              setBrandId(e.target.value);
              setPage(1);
            }}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 outline-none focus:bg-white focus:border-slate-600 cursor-pointer"
          >
            <option value="">-- Tất cả thương hiệu --</option>
            {brands?.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={handleResetFilters}
              title="Đặt lại bộ lọc"
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            >
              <RotateCcw size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="py-20">
          <Loading />
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <PackageX size={28} />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            Không tìm thấy sản phẩm giảm giá nào
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Hiện tại chưa có sản phẩm nào thuộc bộ lọc đang diễn ra chương trình khuyến mãi. Vui lòng quay lại sau!
          </p>
          {hasFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline pt-2"
            >
              <RotateCcw size={12} /> Bỏ lọc điều kiện
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {products.map((item) => {
            const originalPrice = Number(item.min_price) || 0;
            const discountPercent = Number(item.discount_perventage) || 0;
            const salePrice =
              discountPercent > 0
                ? originalPrice - (originalPrice * discountPercent) / 100
                : originalPrice;

            return (
              <Link
                key={item.id}
                to={`/products/${item.slug}`}
                className="relative flex flex-col bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-red-200 transition-all duration-300 group"
              >
                {discountPercent > 0 && (
                  <div className="absolute top-0 left-0 bg-red-600 text-white font-bold text-[11px] px-2.5 py-1 rounded-tl-2xl rounded-br-xl z-10 shadow-sm flex items-center gap-1">
                    <Flame size={11} className="fill-white" />
                    <span>-{discountPercent}%</span>
                  </div>
                )}

                <div className="relative aspect-square w-full mb-3 overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center p-3">
                  <img
                    src={getImageUrl(item.thumbnail)}
                    alt={item.product_name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/250x250?text=No+Img";
                    }}
                  />
                </div>

                <div className="mb-2">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    {item.brand?.name || "Smartphone"}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 min-h-[2.5rem] leading-tight group-hover:text-red-600 transition-colors">
                    {item.product_name}
                  </h3>
                </div>

                <div className="mt-auto pt-2 border-t border-slate-100 flex items-baseline gap-2 flex-wrap">
                  <span className="text-base sm:text-lg font-extrabold text-red-600">
                    {formatPrice(salePrice)}
                  </span>
                  {discountPercent > 0 && (
                    <span className="text-xs text-slate-400 line-through">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {lastPage > 1 && (
        <div className="flex justify-center pt-4">
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default ProductSaleList;
