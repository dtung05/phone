import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, RotateCcw, Package } from "lucide-react";
import { useGetStaffProductsQuery } from "../../store/api/product";
import { useGetBrandsQuery } from "../../store/api/brandApi";
import { useGetCategoryQuery } from "../../store/api/CategoryApi";
import Loading from "../../components/block/Loading";
import Pagination from "../../components/block/Pagination";

import Error from "../../components/block/Error";
import { ProductListManager } from "./ProductListManager";

const ProductListStaff = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [page, setPage] = useState(1);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: categories } = useGetCategoryQuery();
  const { data: brands } = useGetBrandsQuery();

  const {
    data: response,
    isLoading,
    error,
  } = useGetStaffProductsQuery({
    search: debouncedSearch,
    category_id: categoryId,
    brand_id: brandId,
    page,
  });

  const products = response?.data || [];
  const total = response?.total || 0;
  const lastPage = response?.last_page || 1;
  const currentPage = response?.current_page || 1;

  const handleResetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setCategoryId("");
    setBrandId("");
    setPage(1);
  };

  const hasFilters = Boolean(search || categoryId || brandId);
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              Quản lý sản phẩm
            </h1>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              {total} sản phẩm
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tra cứu, lọc danh mục, theo dõi tồn kho và cập nhật thông tin biến
            thể
          </p>
        </div>

        <Link
          to="/staff/products/create"
          className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg text-xs font-semibold shadow-sm transition-all shrink-0"
        >
          <Plus size={16} />
          <span>Thêm sản phẩm mới</span>
        </Link>
      </div>

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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên sản phẩm hoặc mã ID..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all"
            />
          </div>

          <div className="lg:col-span-3">
            <select
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 outline-none focus:bg-white focus:border-slate-600 transition-all cursor-pointer"
            >
              <option value="">-- Tất cả danh mục --</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-3">
            <select
              value={brandId}
              onChange={(e) => {
                setBrandId(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 outline-none focus:bg-white focus:border-slate-600 transition-all cursor-pointer"
            >
              <option value="">-- Tất cả thương hiệu --</option>
              {brands?.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
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
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-16">
            <Loading />
          </div>
        ) : error ? (
          <Error />
        ) : products.length === 0 ? (
          <div className="py-16 px-4 text-center">
            <Package size={44} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-sm font-bold text-slate-700">
              Không tìm thấy sản phẩm nào
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Không có sản phẩm nào khớp với tiêu chí tìm kiếm hoặc bộ lọc hiện
              tại.
            </p>
            {hasFilters && (
              <button
                onClick={handleResetFilters}
                className="mt-4 px-4 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        ) : (
          <ProductListManager products={products} />
        )}

        {!isLoading && products.length > 0 && (
          <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
            <span className="text-xs text-slate-500 font-medium">
              Hiển thị trang <strong>{currentPage}</strong> /{" "}
              <strong>{lastPage}</strong> (Tổng <strong>{total}</strong> sản
              phẩm)
            </span>
            <Pagination
              currentPage={currentPage}
              lastPage={lastPage}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListStaff;
