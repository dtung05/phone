import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/price";

const FlashSale = ({ products = [] }) => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="bg-[#eef5ff] border border-[#d0e3ff] rounded-2xl p-4 md:p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-sm md:text-base px-4 py-2 rounded-xl shadow-sm uppercase tracking-wide flex items-center gap-1.5">
            <span>🔥</span>
            DEAL SỐC MỖI NGÀY
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products.map((item) => {
            const currentPrice = Number(item.min_price) || 0;
            const discountPercent = Number(item.discount_perventage) || 0;
            const originalPrice =
              discountPercent > 0
                ? currentPrice / (1 - discountPercent / 100)
                : 0;
            return (
              <Link
                key={item.id}
                to={`/products/${item.slug}`}
                className="relative flex flex-col bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                {discountPercent > 0 && (
                  <div className="absolute top-0 left-0 bg-red-600 text-white font-bold text-[11px] px-2 py-1 rounded-tl-2xl rounded-br-xl z-10">
                    Giảm {discountPercent}%
                  </div>
                )}
                <div className="relative aspect-square w-full mb-3 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center p-2">
                  <img
                    src={item.thumbnail}
                    alt={item.product_name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xs md:text-sm font-bold text-gray-800 line-clamp-2 min-h-[2.5rem] mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                  {item.product_name}
                </h3>

            
                <div className="mt-auto flex items-baseline gap-2 flex-wrap">
                  <span className="text-sm md:text-base font-bold text-red-600">
                    {formatPrice(currentPrice)}
                  </span>

                  {discountPercent > 0 && (
                    <span className="text-xs text-gray-400 line-through font-normal">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
