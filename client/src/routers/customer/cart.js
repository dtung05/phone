import MyCart from "../../pages/customer/cart/MyCart";
import AuthLogin from "../middleware/AuthLogin";

const cart = [
  {
    Component: AuthLogin,
    children: [
      {
        path: "carts",
        Component: MyCart,
      },
    ],
  },
];
export default cart;
