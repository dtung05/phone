import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/price";
import { getImageUrl } from "../../../utils/image";
import { ChevronRight, Heart, Truck, Star } from "lucide-react";

const FlashSale = ({ products = [] }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-white rounded-2xl border-2 border-teal-500 p-4 sm:p-5 shadow-sm">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="bg-teal-600 text-white font-bold text-sm sm:text-base px-3 py-1.5 rounded-lg uppercase tracking-wide">
              ⚡ DEAL SỐC MỖI NGÀY
            </span>
          </div>

          <Link
            to="/products/sale"
            className="inline-flex items-center self-start sm:self-auto gap-1 text-xs sm:text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
          >
            <span>Xem tất cả ({products.length})</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {products.map((item) => {
            const originalPrice = Number(item.min_price) || 0;
            const discountPercent = Number(item.discount_perventage) || 0;
            const salePrice =
              discountPercent > 0
                ? originalPrice - (originalPrice * discountPercent) / 100
                : originalPrice;

            return (
              <div
                key={item.id}
                className="group relative flex flex-col bg-white rounded-xl border border-gray-200 p-3 hover:border-teal-500 hover:shadow-md transition-all duration-200"
              >
                {discountPercent > 0 && (
                  <div className="absolute top-0 left-0 z-10 bg-red-600 text-white font-bold text-[10px] sm:text-xs px-2 py-0.5 rounded-br-lg rounded-tl-xl">
                    Giảm {discountPercent}%
                  </div>
                )}

                <Link to={`/products/${item.slug}`} className="flex flex-col flex-1">
                  <div className="relative aspect-square w-full mb-2 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center p-2">
                    <img
                      src={getImageUrl(item.thumbnail)}
                      alt={item.product_name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/200x200?text=No+Img";
                      }}
                    />
                  </div>

                  <h3 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem] mb-2 leading-tight group-hover:text-teal-600 transition-colors">
                    {item.product_name}
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
                        <span className="text-xs font-bold text-teal-600">
                          Liên hệ
                        </span>
                      )}
                    </div>
                  </div>
                </Link>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px]">
                  <div className="flex items-center gap-1 text-teal-600 font-medium bg-teal-50 px-2 py-0.5 rounded-full">
                    <Truck size={12} />
                    <span>2 Giờ</span>
                  </div>

                  <button 
                    type="button" 
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Thêm vào yêu thích"
                  >
                    <Heart size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;