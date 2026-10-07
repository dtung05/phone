import { useParams, Link } from "react-router-dom";
import { useState } from "react";

import { useProductDetailQuery } from "../../../store/api/product";
import { useGetReviewsQuery } from "../../../store/api/reviewApi";

import ProductImages from "../../../components/customer/product/ProductImage";
import ProductInfo from "../../../components/customer/product/ProductInfo";
import ProductSpecification from "../../../components/customer/product/ProductSpecifications";
import ProductVideo from "../../../components/customer/product/ProductVideo";
import ProductRelated from "../../../components/customer/product/ProductRelated";
import ProductReviews from "../../../components/customer/product/ProductReviews";

export default function ProductDetail() {
  const { slug } = useParams();
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useProductDetailQuery(slug);

  if (productLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
        Đang tải thông tin sản phẩm...
      </div>
    );
  }

  if (productError || !product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-base font-bold text-gray-800">
          Không tìm thấy thông tin sản phẩm
        </h2>
        <Link
          to="/products"
          className="inline-block mt-3 text-xs text-blue-600 hover:underline"
        >
          Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  const { specifications, thumbnail, images, product_name, review_video } =
    product || {};

  return (
    <div className="bg-[#f8faf9] min-h-screen py-5">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6 space-y-4">
        <nav
          aria-label="Breadcrumb"
          className="text-xs text-gray-500 flex items-center gap-1.5 flex-wrap"
        >
          <Link to="/" className="hover:text-[#009b7a] transition-colors">
            Trang chủ
          </Link>
          <span className="text-gray-300">/</span>
          <Link
            to="/products"
            className="hover:text-[#009b7a] transition-colors"
          >
            Điện thoại
          </Link>
          {product?.brand?.name && (
            <>
              <span className="text-gray-300">/</span>
              <Link
                to={`/brands/${product.brand.id}`}
                className="hover:text-[#009b7a] transition-colors"
              >
                {product.brand.name}
              </Link>
            </>
          )}
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-semibold truncate max-w-xs sm:max-w-md">
            {product_name}
          </span>
        </nav>
        {/* // thông tin sản phẩm */}
        <div className="border border-gray-200/80 rounded-2xl bg-white p-4 sm:p-6 lg:p-7 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
            <div className="md:col-span-1 lg:col-span-4">
              <ProductImages images={images} thumbnail={thumbnail} />
            </div>

            <div className="md:col-span-1 lg:col-span-5">
              <ProductInfo data={product} />
            </div>

            <div className="md:col-span-2 lg:col-span-3 lg:border-l lg:border-gray-100 lg:pl-6 pt-4 lg:pt-0 border-t md:border-t-0 md:pt-4 border-gray-100">
              <ProductRelated
                currentId={product?.id}
                brandId={product?.brand_id}
                isSidebar
              />
            </div>
          </div>
        </div>
        {/* Phần 2 video + thông số đánh giá */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-8 space-y-5">
            {review_video ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                <ProductVideo videoUrl={review_video} />
                {specifications && (
                  <ProductSpecification specifications={specifications} />
                )}
              </div>
            ) : (
              specifications && (
                <ProductSpecification specifications={specifications} />
              )
            )}

            <ProductReviews slug={slug} data={product} />
          </div>

          <div className="lg:col-span-4 sticky top-20 space-y-4">
            <div className="border border-gray-200/80 rounded-2xl bg-white p-5 shadow-2xs space-y-3.5">
              <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2.5 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-[#009b7a]"
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
                <span>Chính sách mua hàng</span>
              </h3>
              <ul className="text-xs text-gray-600 space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#d9f7eb] text-[#006b5a] flex items-center justify-center shrink-0 text-[10px] font-bold">
                    ✓
                  </span>
                  <span>Hàng chính hãng 100%, nguyên seal mới xuất xưởng</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#d9f7eb] text-[#006b5a] flex items-center justify-center shrink-0 text-[10px] font-bold">
                    ✓
                  </span>
                  <span>
                    Bảo hành chính hãng 12 tháng tại trung tâm ủy quyền
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#d9f7eb] text-[#006b5a] flex items-center justify-center shrink-0 text-[10px] font-bold">
                    ✓
                  </span>
                  <span>1 đổi 1 trong 30 ngày nếu có lỗi từ nhà sản xuất</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#d9f7eb] text-[#006b5a] flex items-center justify-center shrink-0 text-[10px] font-bold">
                    ✓
                  </span>
                  <span>
                    Giao hàng tận nơi miễn phí toàn quốc, kiểm tra trước khi
                    nhận
                  </span>
                </li>
              </ul>
            </div>

            <div className="border border-gray-200/80 rounded-2xl bg-white p-5 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2.5 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-[#009b7a]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>Hỗ trợ & tư vấn mua hàng</span>
              </h3>
              <div className="text-xs space-y-2 text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Tư vấn mua hàng (Miễn phí):</span>
                  <a
                    href="tel:18006018"
                    className="font-bold text-[#009b7a] hover:underline"
                  >
                    086.252.7719
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Kỹ thuật & bảo hành:</span>
                  <a
                    href="tel:18006019"
                    className="font-bold text-gray-800 hover:text-[#009b7a]"
                  >
                    086.252.7719
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Giờ phục vụ:</span>
                  <span className="font-medium text-gray-700">
                    08:00 - 21:30 hàng ngày
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
