import ProductSaleList from "../../pages/customer/product/ProductSaleList";
import ProductDetail from "../../pages/customer/product/ProductDetail";
import ProductSearch from "../../pages/customer/product/ProductSearch";
import ProductsByBrand from "../../pages/customer/product/ProductsByBrand";

const product = [
  {
    path: "products/sale",
    Component: ProductSaleList,
  },
  {
    path: "products/:slug",
    Component: ProductDetail,
  },
  {
    path: "products",
    Component: ProductSearch,
  },
  {
    path: "brands/:brand/products",
    Component: ProductsByBrand,
  },
];
export default product;
