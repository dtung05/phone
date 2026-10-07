import React from "react";
import { Link } from "react-router-dom";
import {
  useGetProductsByBrandQuery,
  useGetProductsNewQuery,
} from "../../../store/api/product";
import { formatPrice } from "../../../utils/price";
import { getImageUrl } from "../../../utils/image";

export default function ProductRelated({ currentId, brandId, isSidebar = false }) {
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
    .slice(0, isSidebar ? 4 : 5);

  if (isLoading) {
    return isSidebar ? (
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2.5">
          Sản phẩm liên quan
        </h3>
        <p className="text-xs text-gray-400 py-3 text-center">Đang tải gợi ý...</p>
      </div>
    ) : (
      <div className="border border-gray-200/80 rounded-2xl bg-white p-4 sm:p-5 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2.5">
          Sản phẩm liên quan
        </h3>
        <p className="text-xs text-gray-400 py-3 text-center">Đang tải gợi ý...</p>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  const content = (
    <>
      <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
          <span className="w-1.5 h-3.5 bg-[#009b7a] rounded-full inline-block"></span>
          <span>Sản phẩm tương tự</span>
        </h3>
        {brandId && (
          <Link
            to={`/brands/${brandId}`}
            className="text-[11px] text-[#009b7a] hover:text-[#006b5a] font-medium"
          >
            Xem tất cả →
          </Link>
        )}
      </div>

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
              className="flex items-center gap-2.5 py-2.5 group hover:bg-[#eefbf6]/60 rounded-xl transition-colors px-2 -mx-1"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl border border-gray-100 bg-white p-1 flex items-center justify-center">
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
                <h4 className="text-xs font-semibold text-gray-800 truncate group-hover:text-[#009b7a] transition-colors">
                  {item.product_name}
                </h4>

                <div className="mt-0.5 flex items-baseline gap-1.5 flex-wrap">
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
                  <span className="inline-block mt-0.5 text-[10px] font-semibold text-[#006b5a] bg-[#d9f7eb] px-1.5 py-0.2 rounded">
                    -{discount}%
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );

  return isSidebar ? (
    <div className="space-y-3">{content}</div>
  ) : (
    <div className="border border-gray-200/80 rounded-2xl bg-white p-4 sm:p-5 shadow-2xs space-y-3">
      {content}
    </div>
  );
}
