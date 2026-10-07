import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/price";
import { getImageUrl } from "../../../utils/image";
import { ChevronRight, ArrowRight } from "lucide-react";

export default function HomeCategoryShowcase({
  categories = [],
  brands = [],
  products = [],
  banners = [],
}) {
  const [selectedCatId, setSelectedCatId] = useState(
    categories.length > 0 ? categories[0].id : null
  );
  const [selectedBrandId, setSelectedBrandId] = useState(null);

  if (!products || products.length === 0) return null;

  const sideBanner = banners.find(
    (b) => (b.position || "").trim() === "side" || (b.position || "").trim() === "min"
  ) || banners[0];

  const topProduct = products[0];

  const filteredProducts = products.filter((p) => {
    if (selectedCatId && p.category_id && p.category_id !== selectedCatId) return false;
    if (selectedBrandId && p.brand_id && p.brand_id !== selectedBrandId) return false;
    return true;
  });

  const displayList = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <section className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        <div className="hidden lg:flex lg:col-span-3 xl:col-span-3 flex-col rounded-2xl bg-white border border-gray-200/80 p-4 justify-between shadow-2xs relative overflow-hidden group">
          
          {sideBanner ? (
            <Link
              to={sideBanner.link || "/products"}
              className="flex flex-col justify-between h-full"
            >
              <div>
                <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-gray-50 mb-3 flex items-center justify-center p-2">
                  <img
                    src={getImageUrl(sideBanner.imager || sideBanner.image)}
                    alt={sideBanner.title || "Khuyến mãi"}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/400x300?text=DiDong.Com";
                    }}
                  />
                </div>

                <div className="text-center">
                  <span className="text-[11px] font-bold text-[#006b5a] uppercase tracking-wider">
                    SẢN PHẨM NỔI BẬT
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-gray-800 mt-1 line-clamp-2">
                    {sideBanner.title}
                  </h3>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#009b7a] group-hover:text-[#006b5a]">
                <span>Xem chi tiết ưu đãi</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ) : topProduct ? (
            <Link
              to={`/products/${topProduct.slug}`}
              className="flex flex-col justify-between h-full"
            >
              <div>
                <div className="aspect-square w-full rounded-xl overflow-hidden bg-gray-50 mb-3 flex items-center justify-center p-3">
                  <img
                    src={getImageUrl(topProduct.thumbnail)}
                    alt={topProduct.product_name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/400x400?text=No+Image";
                    }}
                  />
                </div>

                <div className="text-center">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#d9f7eb] text-[#006b5a] uppercase tracking-wider">
                    {topProduct.brand?.name || "CHÍNH HÃNG"}
                  </span>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mt-2 line-clamp-2">
                    {topProduct.product_name}
                  </h3>
                  <p className="text-sm font-bold text-red-600 mt-1">
                    {topProduct.min_price ? formatPrice(topProduct.min_price) : "Liên hệ giá tốt"}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center gap-1 text-xs font-semibold text-[#009b7a]">
                <span>Khám phá ngay</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ) : null}
        </div>

        <div className="col-span-1 lg:col-span-9 xl:col-span-9 flex flex-col gap-3.5">
          
          <div className="flex items-center gap-6 border-b-2 border-gray-200 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedCatId(null)}
              className={`pb-2.5 text-xs sm:text-sm font-bold tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer relative ${
                selectedCatId === null
                  ? "text-[#009b7a] after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2.5px] after:bg-[#009b7a]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              TẤT CẢ DANH MỤC
            </button>

            {categories.map((cat) => {
              const isActive = selectedCatId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCatId(cat.id)}
                  className={`pb-2.5 text-xs sm:text-sm font-bold tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer relative ${
                    isActive
                      ? "text-[#009b7a] after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2.5px] after:bg-[#009b7a]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {cat.name}
                  {cat.products_count !== undefined && ` (${cat.products_count})`}
                </button>
              );
            })}
          </div>

          {brands.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1">
              <button
                onClick={() => setSelectedBrandId(null)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedBrandId === null
                    ? "bg-[#009b7a] text-white shadow-2xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tất cả hãng
              </button>

              {brands.map((brand) => {
                const isSelected = selectedBrandId === brand.id;
                return (
                  <button
                    key={brand.id}
                    onClick={() => setSelectedBrandId(isSelected ? null : brand.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#009b7a] text-white font-bold shadow-2xs"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {brand.name}
                  </button>
                );
              })}

              <Link
                to="/products"
                className="text-xs font-semibold text-[#006b5a] hover:underline flex items-center gap-0.5 whitespace-nowrap ml-2"
              >
                <span>Xem tất cả</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {displayList.slice(0, 8).map((product) => {
              const originalPrice = Number(product.min_price) || 0;
              const discountPercent = Number(product.discount_perventage) || 0;
              const salePrice =
                discountPercent > 0
                  ? originalPrice - (originalPrice * discountPercent) / 100
                  : originalPrice;

              return (
                <Link
                  key={product.id || product.slug}
                  to={`/products/${product.slug}`}
                  className="bg-white rounded-2xl border border-gray-200/80 p-3 hover:border-[#009b7a]/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative"
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#eefbf6] text-[#006b5a] text-[10px] font-semibold border border-[#d9f7eb]">
                      Trả góp 0%
                    </span>
                    {discountPercent > 0 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-bold">
                        Giảm {discountPercent}%
                      </span>
                    )}
                  </div>

                  <div className="relative aspect-square w-full mb-3 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center p-2">
                    <img
                      src={getImageUrl(product.thumbnail)}
                      alt={product.product_name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/300x300?text=No+Image";
                      }}
                    />
                  </div>

                  <h4 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem] leading-snug group-hover:text-[#009b7a] transition-colors mb-2">
                    {product.product_name}
                  </h4>

                  <div className="mb-2">
                    <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                      {product.brand?.name || "Chính hãng"}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      {originalPrice > 0 ? (
                        <>
                          <span className="text-sm sm:text-base font-bold text-red-600">
                            {formatPrice(salePrice)}
                          </span>
                          {discountPercent > 0 && (
                            <span className="text-[11px] text-gray-400 line-through">
                              {formatPrice(originalPrice)}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-xs font-bold text-[#006b5a]">
                          Liên hệ giá tốt
                        </span>
                      )}
                    </div>

                    <div className="mt-2 text-[10.5px] text-gray-500 bg-gray-50 p-1.5 rounded-lg line-clamp-1 leading-tight">
                      Bảo hành chính hãng 12 tháng
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
