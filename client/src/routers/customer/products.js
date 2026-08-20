import ProductSearch from "../../pages/product/ProductSearch";
import ProductDetail from "../../pages/product/ProductDetail";

const product = [
  {
    path: "product/:slug",
    Component: ProductDetail,
  },
  {
    path: "products",
    Component: ProductSearch,
  },
];
export default product;
