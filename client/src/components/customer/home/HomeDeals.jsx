import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/price";
import { getImageUrl } from "../../../utils/image";
import {
  Flame,
  ChevronRight,
  ChevronLeft,
  Heart,
  Star,
  Zap,
} from "lucide-react";

const extractRealSpecs = (specs) => {
  if (!specs) return ["Chính hãng", "Bảo hành 12T"];
  try {
    const obj = typeof specs === "string" ? JSON.parse(specs) : specs;
    const entries = Object.entries(obj).slice(0, 3);
    if (entries.length > 0) {
      return entries.map(([k, v]) => `${k}: ${v}`);
    }
  } catch {}
  return ["Chính hãng", "Bảo hành 12T"];
};

export default function HomeDeals({
  products = [],
  categories = [],
  brands = [],
}) {
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [likedIds, setLikedIds] = useState([]);
  const sliderRef = useRef(null);

  if (!products || products.length === 0) return null;

  const toggleLike = (id) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCatId && p.category_id !== selectedCatId) return false;
    if (selectedBrandId && p.brand_id !== selectedBrandId) return false;
    return true;
  });

  const displayList = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <section
      id="deal-section"
      className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 py-3"
    >
      <div className="bg-white rounded-2xl border border-teal-200/90 p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase bg-[#009b7a] text-white shadow-xs flex items-center gap-1.5">
              <Flame size={15} className="fill-white" />
              <span>DEAL SỐC MỖI NGÀY</span>
            </div>
          </div>

          <Link
            to="/products/sale"
            className="text-xs sm:text-sm font-semibold text-[#006b5a] hover:text-[#009b7a] hover:underline flex items-center gap-1"
          >
            <span>Xem tất cả ({products.length})</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        {categories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
            <button
              onClick={() => setSelectedCatId(null)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCatId === null
                  ? "bg-[#009b7a] text-white shadow-xs"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-[#009b7a] hover:text-[#009b7a]"
              }`}
            >
              Tất cả danh mục
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCatId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCatId(isSelected ? null : cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#009b7a] text-white shadow-xs"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-[#009b7a] hover:text-[#009b7a]"
                  }`}
                >
                  {cat.name}
                  {cat.products_count !== undefined &&
                    ` (${cat.products_count})`}
                </button>
              );
            })}
          </div>
        )}

        {brands.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider shrink-0 mr-1">
              Thương hiệu:
            </span>
            <button
              onClick={() => setSelectedBrandId(null)}
              className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedBrandId === null
                  ? "bg-[#eefbf6] border border-[#009b7a] text-[#006b5a] font-bold"
                  : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Tất cả hãng
            </button>

            {brands.map((brand) => {
              const isSelected = selectedBrandId === brand.id;
              return (
                <button
                  key={brand.id}
                  onClick={() =>
                    setSelectedBrandId(isSelected ? null : brand.id)
                  }
                  className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#eefbf6] border border-[#009b7a] text-[#006b5a] font-bold"
                      : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {brand.name}
                </button>
              );
            })}
          </div>
        )}

        <div className="relative group/slider">
          {displayList.length > 4 && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md text-gray-700 hover:bg-[#009b7a] hover:text-white hover:border-[#009b7a] flex items-center justify-center transition-all cursor-pointer opacity-90 group-hover/slider:opacity-100"
                aria-label="Scroll left"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={scrollRight}
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md text-gray-700 hover:bg-[#009b7a] hover:text-white hover:border-[#009b7a] flex items-center justify-center transition-all cursor-pointer opacity-90 group-hover/slider:opacity-100"
                aria-label="Scroll right"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          <div
            ref={sliderRef}
            className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto scrollbar-hide py-2 px-1"
          >
            {displayList.map((product) => {
              const originalPrice = Number(product.min_price) || 0;
              const discountPercent = Number(product.discount_perventage) || 0;
              const salePrice =
                discountPercent > 0
                  ? originalPrice - (originalPrice * discountPercent) / 100
                  : originalPrice;
              const specs = extractRealSpecs(product.specifications);
              const isLiked = likedIds.includes(product.id);

              return (
                <div
                  key={product.id || product.slug}
                  className="w-[190px] sm:w-[220px] shrink-0 bg-white rounded-2xl border border-gray-200/90 p-3 hover:border-[#009b7a]/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between relative group/card"
                >
                  {discountPercent > 0 && (
                    <div className="absolute top-0 left-0 z-10 bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-tl-2xl rounded-br-lg shadow-xs">
                      Giảm {discountPercent}%
                    </div>
                  )}

                  <Link
                    to={`/products/${product.slug}`}
                    className="flex flex-col flex-1"
                  >
                    <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider text-right mb-1">
                      {product.brand?.name || "Chính hãng"}
                    </div>

                    <div className="relative aspect-square w-full mb-2 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center p-2">
                      <img
                        src={getImageUrl(product.thumbnail)}
                        alt={product.product_name}
                        className="w-full h-full object-contain group-hover/card:scale-105 transition-transform duration-200"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/300x300?text=No+Image";
                        }}
                      />
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {specs.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[9.5px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 truncate max-w-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xs sm:text-[13px] font-semibold text-gray-800 line-clamp-2 min-h-[2.4rem] leading-snug group-hover/card:text-[#009b7a] transition-colors mb-2">
                      {product.product_name}
                    </h3>

                    <div className="mt-auto mb-2">
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

                      <div className="mt-1 text-[10px] font-medium text-[#006b5a] bg-[#eefbf6] px-2 py-0.5 rounded-md inline-block">
                        Nhận hàng 30p trong nội thành.
                      </div>
                    </div>
                  </Link>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px]">
                    <div className="flex items-center gap-1 text-[#006b5a] font-semibold bg-[#d9f7eb] px-2 py-0.5 rounded-full">
                      <Zap
                        size={11}
                        className="fill-[#009b7a] text-[#009b7a]"
                      />
                      <span>2 Giờ</span>
                    </div>

                    {Number(product.reviews_count) > 0 && product.avg_rating ? (
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star
                          size={12}
                          className="fill-amber-400 text-amber-400"
                        />
                        <span className="text-[10px] text-gray-700">
                          {Number(product.avg_rating).toFixed(1)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-gray-400">
                        Chính hãng
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleLike(product.id)}
                      className={`p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer ${
                        isLiked
                          ? "text-red-500 fill-red-500"
                          : "text-gray-400 hover:text-red-500"
                      }`}
                      title="Yêu thích"
                    >
                      <Heart
                        size={15}
                        className={isLiked ? "fill-red-500" : ""}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
