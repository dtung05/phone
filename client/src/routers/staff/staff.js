import Staff from "../../layouts/Staff";
import product from "./product";
import order from "./order";
import banner from "./banner";
import purchaseReceipt from "./purchaseReceipt";
import supplier from "./supplier";
import review from "./review";
import user from "./user";
import AuthLogin from "../middleware/AuthLogin";

const staff = {
  path: "/staff/",
  Component: AuthLogin,
  children: [
    {
      Component: Staff,
      children: [
        ...product,
        ...order,
        ...banner,
        ...purchaseReceipt,
        ...supplier,
        ...review,
        ...user,
      ],
    },
  ],
};
export default staff;
