import { useState } from "react";
import Loading from "./components/block/Loading";
import Advertising from "./components/product/Advertising";
import FlashSale from "./components/product/FlaseSale";
import ProductList from "./components/product/ProductList";

import { useGetBannersQuery } from "./store/api/bannerApi";
import {
  useGetProductsNewQuery,
  useGetProductsSaleQuery,
} from "./store/api/product";
import Pagination from "./components/block/Pagination";

function App() {
  const {
    data: banners,
    isLoading: bannerLoading,
    error: bannerError,
  } = useGetBannersQuery();
  const {
    data: productsSale,
    isLoading: saleLoading,
    error: saleError,
  } = useGetProductsSaleQuery(); const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetProductsNewQuery({page});
  const { data: productsNew, current_page, last_page, total } = data ?? {};
 
  if (saleLoading || bannerLoading || isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Advertising banners={banners} />
      <FlashSale products={productsSale} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductList products={productsNew} />
        <Pagination
          currentPage={current_page}
          lastPage={last_page}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}

export default App;
