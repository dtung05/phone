import Staff from "../../layouts/Staff";
import product from "./product";
import AuthLogin from "../middleware/AuthLogin";

const staff = {
  path: "/staff/",
  Component: AuthLogin,
  children: [
    {
      Component: Staff,
      children: [...product],
    },
  ],
};
export default staff;
