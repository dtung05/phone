import React from "react";
import { Link } from "react-router-dom";
import {
  useGetProductsByBrandQuery,
  useGetProductsNewQuery,
} from "../../store/api/product";
import { formatPrice } from "../../utils/price";
import { getImageUrl } from "../../utils/image";

export default function ProductRelated({ currentId, brandId }) {
  // Ưu tiên lấy sản phẩm cùng thương hiệu
  const { data: brandResponse, isLoading: brandLoading } =
    useGetProductsByBrandQuery(
      { brand: brandId, page: 1 },
      { skip: !brandId }
    );

  // Dự phòng lấy sản phẩm mới nếu không có thương hiệu
  const { data: newResponse, isLoading: newLoading } = useGetProductsNewQuery(
    { page: 1 },
    { skip: Boolean(brandId) }
  );

  const rawList = brandId ? brandResponse?.data : newResponse?.data;
  const isLoading = brandId ? brandLoading : newLoading;

  const relatedProducts = (Array.isArray(rawList) ? rawList : [])
    .filter((item) => item.id !== currentId)
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="border border-gray-200 rounded-lg bg-white p-4 space-y-3">
        <h3 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2">
          Sản phẩm liên quan
        </h3>
        <p className="text-xs text-gray-400">Đang tải gợi ý...</p>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white p-4 space-y-3">
      <h3 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2">
        Sản phẩm liên quan
      </h3>

      <div className="divide-y divide-gray-100">
        {relatedProducts.map((item) => {
          const discount = Number(item.discount_perventage) || 0;
          const price = Number(item.min_price) || 0;
          const originalPrice =
            discount > 0 ? Math.round(price / (1 - discount / 100)) : price;

          return (
            <Link
              key={item.id}
              to={`/products/${item.slug}`}
              className="flex items-center gap-3 py-3 group hover:bg-gray-50/70 rounded transition-colors px-1"
            >
              <div className="w-14 h-14 shrink-0 rounded border border-gray-200 bg-white p-1 flex items-center justify-center">
                <img
                  src={getImageUrl(item.thumbnail)}
                  alt={item.product_name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/80x80?text=No+Img";
                  }}
                />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-semibold text-gray-800 truncate group-hover:text-red-600 transition-colors">
                  {item.product_name}
                </h4>

                <div className="mt-1 flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-red-600 font-mono">
                    {formatPrice(price)}
                  </span>
                  {discount > 0 && (
                    <span className="text-[10px] text-gray-400 line-through font-mono">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                </div>

                {discount > 0 && (
                  <span className="inline-block mt-0.5 text-[10px] font-semibold text-red-600 bg-red-50 px-1 rounded">
                    -{discount}%
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
