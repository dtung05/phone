import { useState } from "react";
import Loading from "./components/common/feedback/Loading";
import ProductList from "./components/customer/product/ProductList";
import Pagination from "./components/common/pagination/Pagination";

import HomeHero from "./components/customer/home/HomeHero";
import HomeDeals from "./components/customer/home/HomeDeals";
import HomeCategoryShowcase from "./components/customer/home/HomeCategoryShowcase";
import FloatingActions from "./components/common/feedback/FloatingActions";

import { useGetBannersQuery } from "./store/api/bannerApi";
import { useGetCategoryQuery } from "./store/api/categoryApi";
import { useGetBrandsQuery } from "./store/api/brandApi";
import {
  useGetProductsNewQuery,
  useGetProductsSaleQuery,
} from "./store/api/product";

import { Sparkles } from "lucide-react";

function App() {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: banners = [], isLoading: bannerLoading } = useGetBannersQuery();
  const { data: categories = [], isLoading: categoryLoading } =
    useGetCategoryQuery();
  const { data: brands = [] } = useGetBrandsQuery();
  const { data: dataSale } = useGetProductsSaleQuery(10);
  const { data: productResponse, isLoading: productsLoading } =
    useGetProductsNewQuery({ page });

  const {
    data: productsNew = [],
    current_page,
    last_page,
    total,
  } = productResponse ?? {};

  const handleSelectCategory = (catId) => {
    setSelectedCategory((prev) => (prev === catId ? null : catId));
    const element = document.getElementById("main-products-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const displayedProducts = selectedCategory
    ? productsNew.filter((p) => p.category_id === selectedCategory)
    : productsNew;

  const currentCategoryObj = categories.find((c) => c.id === selectedCategory);

  if (bannerLoading && categoryLoading && productsLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-gray-800 flex flex-col gap-1 sm:gap-3 pb-16">
      {/* trang ưu đãi  */}
      <HomeHero
        banners={banners}
        categories={categories}
        brands={brands}
        featuredProducts={productsNew}
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
      />
      {/* //Phần sale */}
      {dataSale?.data && dataSale.data.length > 0 && (
        <HomeDeals
          products={dataSale.data}
          categories={categories}
          brands={brands}
        />
      )}

      <HomeCategoryShowcase
        categories={categories}
        brands={brands}
        products={productsNew}
        banners={banners}
      />

      {/* / Snar phẩm mới thêm */}
      <section
        id="main-products-section"
        className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 py-4"
      >
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200/80 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d9f7eb] text-[#009b7a] flex items-center justify-center shrink-0">
                <Sparkles size={22} />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
                  <span>GỢI Ý HÔM NAY</span>
                 
                </h2>
                <p className="text-xs text-gray-500">
                  {currentCategoryObj
                    ? `Đang lọc theo: ${currentCategoryObj.name} (${displayedProducts.length} sản phẩm)`
                    : "Tất cả sản phẩm điện thoại và phụ kiện chính hãng"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === null
                    ? "bg-[#009b7a] text-white shadow-2xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tất cả ({total || productsNew.length})
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-[#009b7a] text-white shadow-2xs"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.name}
                  {cat.products_count !== undefined &&
                    ` (${cat.products_count})`}
                </button>
              ))}
            </div>
          </div>

          <ProductList products={displayedProducts} />

          {selectedCategory === null && last_page > 1 && (
            <div className="mt-8 flex justify-center pt-4 border-t border-gray-100">
              <Pagination
                currentPage={current_page}
                lastPage={last_page}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </section>

      <FloatingActions />
    </div>
  );
}

export default App;
