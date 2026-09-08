import { createBrowserRouter } from "react-router";
import customer from "./customer/customer";
import E404  from "../components/errors/404";
import staff from "./staff/staff";
const router = createBrowserRouter([
  customer,
  //Ném tất cả url kh tồn tại sang *
  staff,
  {
    path: "*",
    Component: E404,
  },
]);
export default router;
