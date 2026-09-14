import Staff from "../../layouts/Staff";
import product from "./product";
import order from "./order";
import AuthLogin from "../middleware/AuthLogin";

const staff = {
  path: "/staff/",
  Component: AuthLogin,
  children: [
    {
      Component: Staff,
      children: [...product, ...order],
    },
  ],
};
export default staff;
