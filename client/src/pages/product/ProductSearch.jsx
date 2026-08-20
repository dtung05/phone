import { useState } from "react";
import { useProductSearchQuery } from "../../store/api/product";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/block/Loading";
import Pagination from "../../components/block/Pagination";

import Error from "../../components/block/Error";
import NoResult from "../../components/block/NoResult";
import HeaderSearch from "../../components/product/HeaderSearch";
import ProductList from "../../components/product/ProductList";

const ProductSearch = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("search");
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useProductSearchQuery({
    name,
    page,
  });
  const { data: products = [], current_page, last_page, total } = data ?? {};

  if (isLoading) return <Loading />;

  if (error) {
    return <Error />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <HeaderSearch name={name} total={total} />
      {total === 0 ? (
        <NoResult title="Không tìm thấy sản phẩm " />
      ) : (
        <>
          <ProductList products={products} />
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={current_page}
              lastPage={last_page}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductSearch;
