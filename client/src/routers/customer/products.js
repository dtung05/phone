import ProductSearch from "../../pages/product/ProductSearch";
import ProductDetail from "../../pages/product/ProductDetail";
import ProductsByBrand from "../../pages/product/ProductsByBrand";

const product = [
  {
    path: "product/:slug",
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
