import Index from "../../Index.jsx";
import Customer from "../../layouts/Customer.jsx";
import auth from "./auth.js";

const customer = {
  path: "/",
  Component: Customer,
  children: [
    {
      index: true,
      Component: Index,
    },
    ...auth,
  ],
};
export default customer;
