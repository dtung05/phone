import { useState } from "react";
import Loading from "./components/common/feedback/Loading";
import Advertising from "./components/customer/product/Advertising";
import FlashSale from "./components/customer/product/FlaseSale";
import ProductList from "./components/customer/product/ProductList";

import { useGetBannersQuery } from "./store/api/bannerApi";
import {
  useGetProductsNewQuery,
  useGetProductsSaleQuery,
} from "./store/api/product";
import Pagination from "./components/common/pagination/Pagination";

function App() {
  const { data: banners, isLoading: bannerLoading } = useGetBannersQuery();
  const { data: productsSale, isLoading: saleLoading } =
    useGetProductsSaleQuery();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetProductsNewQuery({ page });
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
