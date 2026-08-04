import { useParams } from "react-router-dom";
import { useProductDetailQuery } from "../../store/api/product";
import { useGetReviewsQuery } from "../../store/api/reviewApi";
import { useState } from "react";
import ProductImages from "../../components/product/ProductImage";
import ProductInfo from "../../components/product/ProductInfo";
import ProductSpecification from "../../components/product/ProductSpecifications";
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
    error: reviewError,
  } = useGetReviewsQuery({ slug, page });

  if (productLoading) return <div>...Loading</div>;
  const { product_variants, specifications, thumbnail, images } = product || {};

  const { data: reviews, current_page, last_page } = reviewResponse || {};

  return (
    <div className="pr-30  pl-30 ">
      <div className="flex gap-2">
        <ProductImages images={images} thumbnail={thumbnail} />
        <ProductInfo data={product} />
      </div>
      <div className="flex gap-2">
        <ProductSpecification specifications={specifications} />
      </div>
      <div>
        {reviewLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <ProductReviews reviews={reviews} data={product} />
            <Pagination
              currentPage={current_page}
              lastPage={last_page}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
