import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetProductsByBrandQuery } from "../../../store/api/product";
import { useGetBrandsQuery } from "../../../store/api/brandApi";
import { useGetCategoryQuery } from "../../../store/api/categoryApi";
import Loading from "../../../components/common/feedback/Loading";
import Error from "../../../components/common/feedback/Error";
import ProductList from "../../../components/customer/product/ProductList";
import Pagination from "../../../components/common/pagination/Pagination";
import NoResult from "../../../components/common/feedback/NoResult";
import ProductFilterBar from "../../../components/customer/product/ProductFilterBar";
import {  ChevronRight } from "lucide-react";

const ProductsByBrand = () => {
  const { brand: brandId } = useParams();
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);

  const { data: brands = [] } = useGetBrandsQuery();
  const { data: categories = [] } = useGetCategoryQuery();

  const currentBrand = brands.find((b) => String(b.id) === String(brandId));

  const { data, isLoading, error } = useGetProductsByBrandQuery({
    brand: brandId,
    page,
    category_id: categoryId,
  });

  const { data: products = [], current_page, last_page, total = 0 } = data ?? {};

  const handleResetFilters = () => {
    setCategoryId("");
    setPage(1);
  };

  const handleSelectCategory = (catId) => {
    setCategoryId(catId);
    setPage(1);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const brandName = currentBrand?.name || "Thương hiệu";

  return (
    <div className="max-w-[1440px] mx-auto p-3 sm:p-5 lg:p-6 space-y-5">
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#d9f7eb] text-[#009b7a] flex items-center justify-center text-xl font-black shadow-xs shrink-0">
            {brandName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                Sản phẩm {brandName}
              </h1>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#d9f7eb] text-[#006b5a]">
                Chính hãng
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Khám phá các dòng thiết bị công nghệ chính hãng từ {brandName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
          <Link to="/" className="hover:text-[#009b7a]">Trang chủ</Link>
          <ChevronRight size={13} />
          <span className="text-gray-800 font-semibold">{brandName}</span>
        </div>
      </div>

      <ProductFilterBar
        title={`Lọc theo danh mục:`}
        categories={categories}
        showBrandFilter={false}
        selectedCategory={categoryId}
        onSelectCategory={handleSelectCategory}
        total={total}
        hasFilters={Boolean(categoryId)}
        onReset={handleResetFilters}
      />

      {total === 0 ? (
        <NoResult
          title={`Chưa có sản phẩm nào của ${brandName}`}
          content="Vui lòng thử lại với danh mục khác hoặc quay về trang chủ để mua sắm."
        />
      ) : (
        <div className="space-y-6">
          <ProductList products={products} />

          {last_page > 1 && (
            <div className="flex justify-center pt-4 border-t border-gray-100">
              <Pagination
                currentPage={current_page}
                lastPage={last_page}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsByBrand;
