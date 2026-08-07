import Checkout from "../../pages/order/Checkout";
import myOrders from "../../pages/order/myOrders";

const order = [
  {
    path: "checkout",
    Component: Checkout,
  },
  {
    path: "orders",
    Component: myOrders,
  },
];
export default order;
