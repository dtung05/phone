import { useState } from "react";
import { Link } from "react-router-dom";
import { Flame, PackageX, RotateCcw } from "lucide-react";
import { useGetProductsSalePaginatedQuery } from "../../../store/api/product";
import { useGetBrandsQuery } from "../../../store/api/brandApi";
import { useGetCategoryQuery } from "../../../store/api/categoryApi";
import Loading from "../../../components/common/feedback/Loading";
import Pagination from "../../../components/common/pagination/Pagination";
import ProductList from "../../../components/customer/product/ProductList";
import ProductFilterBar from "../../../components/customer/product/ProductFilterBar";

const ProductSaleList = () => {
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [page, setPage] = useState(1);

  const { data: categories = [] } = useGetCategoryQuery();
  const { data: brands = [] } = useGetBrandsQuery();

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

  const handleSelectCategory = (catId) => {
    setCategoryId(catId);
    setPage(1);
  };

  const handleSelectBrand = (bId) => {
    setBrandId(bId);
    setPage(1);
  };

  const hasFilters = Boolean(categoryId || brandId);

  return (
    <div className="max-w-[1440px] mx-auto p-3 sm:p-5 lg:p-6 space-y-5">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#009b7a] to-[#006b5a] p-6 sm:p-8 text-white shadow-2xs">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold uppercase tracking-wider mb-2.5">
            <Flame size={14} className="fill-white" />
            <span>Chương trình khuyến mãi đặc biệt</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            SĂN SALE GIÁ SỐC MỖI NGÀY
          </h1>
          <p className="text-xs sm:text-sm text-white/90 mt-1.5 leading-relaxed">
            Tổng hợp các mẫu điện thoại và phụ kiện chính hãng đang được áp dụng mức giá ưu đãi tốt nhất tại Di Động.
          </p>
        </div>

        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none text-white">
          <Flame size={200} />
        </div>
      </div>

      <ProductFilterBar
        title="Lọc sản phẩm khuyến mãi:"
        categories={categories}
        brands={brands}
        selectedCategory={categoryId}
        onSelectCategory={handleSelectCategory}
        selectedBrand={brandId}
        onSelectBrand={handleSelectBrand}
        total={total}
        hasFilters={hasFilters}
        onReset={handleResetFilters}
      />

      {isLoading ? (
        <div className="py-20">
          <Loading />
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white border border-gray-200/80 rounded-2xl p-12 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
            <PackageX size={28} />
          </div>
          <h3 className="text-base font-bold text-gray-800">
            Không tìm thấy sản phẩm giảm giá nào
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Hiện chưa có sản phẩm nào thuộc bộ lọc đang diễn ra chương trình khuyến mãi.
          </p>
          {hasFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#009b7a] hover:underline pt-2 cursor-pointer"
            >
              <RotateCcw size={12} /> Bỏ lọc điều kiện
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <ProductList products={products} />

          {lastPage > 1 && (
            <div className="flex justify-center pt-4 border-t border-gray-100">
              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSaleList;
