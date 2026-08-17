import Checkout from "../../pages/order/Checkout";
import myOrders from "../../pages/order/myOrders";
import AuthLogin from "../middleware/AuthLogin";

const order = [
  {
    Component: AuthLogin,
    children: [
      {
        path: "checkout",
        Component: Checkout,
      },
      {
        path: "orders",
        Component: myOrders,
      },
    ],
  },
];
export default order;
