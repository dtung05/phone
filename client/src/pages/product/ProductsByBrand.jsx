import { useParams } from "react-router-dom";
import { useGetProductsByBrandQuery } from "../../store/api/product";
import Loading from "../../components/block/Loading";
import Error from "../../components/block/Error";
import ProductList from "../../components/product/ProductList";
import Pagination from "../../components/block/Pagination";
import { useState } from "react";
import NoResult from "../../components/block/NoResult";

const ProductsByBrand = () => {
  const { brand } = useParams();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetProductsByBrandQuery({
    brand,
    page,
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  const { data: products, current_page, last_page, total } = data ?? {};
  console.log(products);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <p>Hãng sản phẩm: </p>
      {total === 0 ? (
        <NoResult
          title="Hiện chưa có sản phẩm"
          content="Quay về trang chủ để tiếp tục mua sắm"
        />
      ) : (
        <>
          <ProductList products={products} />
          <Pagination
            currentPage={current_page}
            lastPage={last_page}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default ProductsByBrand;
