import { formatPrice } from "../../utils/price";

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
      {products.map((product) => {
        const hasDiscount = product.discount_perventage > 0;
        const finalPrice = hasDiscount
          ? product.min_price -
            (product.min_price * product.discount_perventage) / 100
          : product.min_price;

        return (
          <div
            key={product.slug}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
              <img
                src={product.thumbnail}
                alt={product.product_name}
                className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
              {hasDiscount && (
                <span className="absolute top-3 left-3 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                  -{product.discount_perventage}%
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between p-4">
              <h2 className="line-clamp-1 text-sm font-medium leading-snug text-gray-800 transition-colors group-hover:text-blue-600">
                {product.product_name}
              </h2>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-base font-bold text-red-600 sm:text-lg">
                  {formatPrice(finalPrice)}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-gray-400 line-through">
                    {formatPrice(product.min_price)}
                  </span>
                )}
              </div>
              <div className="mt-4 border-t border-gray-100 pt-3">
                <ul className="space-y-2 text-xs font-medium text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 shrink-0 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Giao hàng miễn phí</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 shrink-0 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span>Bảo hành 6 tháng</span>
                  </li>
                </ul>
              </div>{" "}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
