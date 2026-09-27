import Checkout from "../../pages/order/Checkout";
import myOrders from "../../pages/order/myOrders";
import PaymentResult from "../../pages/order/PaymentResult";
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
      {
        path: "/payment/result",
        Component: PaymentResult,
      },
    ],
  },
];
export default order;
