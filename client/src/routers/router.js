import { createBrowserRouter } from "react-router";
import customer from "./customer/customer";
import E404 from "../components/common/errors/404";
import staff from "./staff/staff";

import { Register } from "../pages/customer/auth/Register.jsx";
import { Login } from "../pages/customer/auth/Login.jsx";
const router = createBrowserRouter([
  customer,
  
  staff,
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/login",
    Component: Login,
  },//Ném tất cả url kh tồn tại sang *
  {
    path: "*",
    Component: E404,
  },
]);
export default router;
