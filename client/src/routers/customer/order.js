import Checkout from "../../pages/customer/order/Checkout";
import myOrders from "../../pages/customer/order/MyOrders";
import PaymentResult from "../../pages/customer/order/PaymentResult";
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
