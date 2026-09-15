import { useParams, Link } from "react-router-dom";
import { useState } from "react";

import { useProductDetailQuery } from "../../store/api/product";
import { useGetReviewsQuery } from "../../store/api/reviewApi";

import ProductImages from "../../components/product/ProductImage";
import ProductInfo from "../../components/product/ProductInfo";
import ProductSpecification from "../../components/product/ProductSpecifications";
import ProductVideo from "../../components/product/ProductVideo";
import ProductRelated from "../../components/product/ProductRelated";
import ProductReviews from "../../components/product/ProductReviews";
import Pagination from "../../components/block/Pagination";

export default function ProductDetail() {
  const { slug } = useParams();
  const [page, setPage] = useState(1);
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useProductDetailQuery(slug);
  const {
    data: reviewResponse,
    isLoading: reviewLoading,
  } = useGetReviewsQuery({ slug, page });

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
  const { data: reviews, current_page, last_page } = reviewResponse || {};

  return (
    <div className="bg-gray-100/60 min-h-screen py-4">
      <div className="max-w-6xl mx-auto px-4 space-y-4">
        {/* BREADCRUMB */}
        <div className="text-xs text-gray-500 flex items-center gap-1.5">
          <Link to="/" className="hover:text-gray-900 transition">
            Trang chủ
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-gray-900 transition">
            Điện thoại
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate max-w-sm">
            {product_name}
          </span>
        </div>

        {/* PHẦN TRÊN: ẢNH + THÔNG TIN MUA HÀNG */}
        <div className="border border-gray-200 rounded-lg bg-white p-5 sm:p-6 shadow-2xs">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <ProductImages images={images} thumbnail={thumbnail} />
            <ProductInfo data={product} />
          </div>
        </div>

        {/* PHẦN DƯỚI: KHU VỰC THÔNG SỐ, VIDEO & SẢN PHẨM LIÊN QUAN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* CỘT 1 & 2 (8 CỘT BÊN TRÁI): VIDEO + THÔNG SỐ VÀ ĐÁNH GIÁ */}
          <div className="lg:col-span-8 space-y-4">
            {/* HÀNG CẠNH NHAU: VIDEO ĐÁNH GIÁ & THÔNG SỐ KỸ THUẬT */}
            {review_video ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
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

            {/* ĐÁNH GIÁ & BÌNH LUẬN CỦA KHÁCH HÀNG */}
            {reviewLoading ? (
              <div className="border border-gray-200 rounded-lg bg-white p-5 text-center text-xs text-gray-500">
                Đang tải đánh giá...
              </div>
            ) : (
              <>
                <ProductReviews
                  reviews={reviews || []}
                  total={reviewResponse?.total || 0}
                  data={product}
                />

                {last_page > 1 && (
                  <div className="flex justify-center pt-2">
                    <Pagination
                      currentPage={current_page}
                      lastPage={last_page}
                      onPageChange={setPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* CỘT THỨ 3 BÊN PHẢI (4 CỘT): SẢN PHẨM LIÊN QUAN */}
          <div className="lg:col-span-4 sticky top-4">
            <ProductRelated
              currentId={product?.id}
              brandId={product?.brand_id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
