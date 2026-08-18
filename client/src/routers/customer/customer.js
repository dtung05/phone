import Index from "../../Index.jsx";
import Customer from "../../layouts/Customer.jsx";
import auth from "./auth.js";
import cart from "./cart.js";
import order from "./order.js";
import product from "./products.js";

const customer = {
  path: "/",
  Component: Customer,
  children: [
    {
      index: true,
      Component: Index,
    },
    ...auth,
    ...product,
    ...order,
    ...cart,
  ],
};
export default customer;
