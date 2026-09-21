import ProductSaleList from "../../pages/product/ProductSaleList";
import ProductDetail from "../../pages/product/ProductDetail";
import ProductSearch from "../../pages/product/ProductSearch";
import ProductsByBrand from "../../pages/product/ProductsByBrand";

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
