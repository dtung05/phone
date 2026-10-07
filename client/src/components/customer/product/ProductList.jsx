import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/price";
import { getImageUrl } from "../../../utils/image";
import { ShieldCheck, Truck, Star, ArrowUpRight, Sparkles } from "lucide-react";

const ProductList = ({ products = [] }) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
          <Sparkles size={28} />
        </div>
        <p className="text-gray-500 font-medium">Chưa có sản phẩm nào phù hợp.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => {
        const minPrice = Number(product.min_price) || 0;
        const discountPercent = Number(product.discount_perventage) || 0;
        const hasDiscount = discountPercent > 0;
        const finalPrice = hasDiscount
          ? minPrice - (minPrice * discountPercent) / 100
          : minPrice;

        return (
          <Link
            key={product.slug || product.id}
            to={`/products/${product.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-3 sm:p-3.5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#009b7a]/60 hover:shadow-md"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center p-2">
              <img
                src={getImageUrl(product.thumbnail)}
                alt={product.product_name}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = "https://placehold.co/300x300?text=No+Image";
                }}
              />

              {hasDiscount && (
                <span className="absolute top-2 left-2 rounded-lg bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                  -{discountPercent}%
                </span>
              )}

              <span className="absolute bottom-2 left-2 rounded-md bg-white/90 backdrop-blur-xs px-1.5 py-0.5 text-[10px] font-medium text-gray-700 shadow-2xs border border-gray-200">
                Trả góp 0%
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between pt-3">
              <div>
                <h3 className="line-clamp-2 text-xs sm:text-sm font-semibold leading-snug text-gray-800 transition-colors group-hover:text-[#009b7a] min-h-[2.5rem]">
                  {product.product_name}
                </h3>

                <div className="mt-1 flex items-center gap-1 text-[11px]">
                  {Number(product.reviews_count) > 0 && product.avg_rating ? (
                    <>
                      <div className="flex items-center text-amber-500">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span className="ml-1 font-bold text-gray-700">
                          {Number(product.avg_rating).toFixed(1)}
                        </span>
                        <span className="text-[10px] text-gray-400 ml-0.5">
                          ({product.reviews_count})
                        </span>
                      </div>
                      <span className="text-gray-300">•</span>
                    </>
                  ) : null}
                  <span className="text-gray-400">Chính hãng</span>
                </div>

                <div className="mt-2 flex flex-wrap items-baseline gap-1.5">
                  {minPrice > 0 ? (
                    <>
                      <span className="text-sm sm:text-base font-bold text-red-600">
                        {formatPrice(finalPrice)}
                      </span>
                      {hasDiscount && (
                        <span className="text-[11px] sm:text-xs text-gray-400 line-through font-normal">
                          {formatPrice(minPrice)}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-xs sm:text-sm font-bold text-[#006b5a]">
                      Liên hệ báo giá
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-3 border-t border-gray-100 pt-2.5 space-y-1 text-[11px] text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Truck size={13} className="text-[#009b7a] shrink-0" />
                  <span className="truncate">Miễn phí giao hàng</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-blue-500 shrink-0" />
                  <span className="truncate">Bảo hành 12 tháng</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-center gap-1 rounded-xl bg-gray-50 py-1.5 text-xs font-semibold text-gray-700 transition-all group-hover:bg-[#009b7a] group-hover:text-white">
                <span>Xem chi tiết</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductList;
