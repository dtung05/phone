import Index from "../../Index.jsx";
import Customer from "../../layouts/Customer.jsx";
import cart from "./cart.js";
import order from "./order.js";
import product from "./products.js";
import profile from "./profile.js";

const customer = {
  path: "/",
  Component: Customer,
  children: [
    {
      index: true,
      Component: Index,
    },
    ...product,
    ...order,
    ...cart,
    ...profile,
  ],
};
export default customer;
