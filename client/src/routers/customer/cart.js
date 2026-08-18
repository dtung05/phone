import MyCart from "../../pages/cart/MyCart";
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
