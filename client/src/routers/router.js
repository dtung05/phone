import { createBrowserRouter } from "react-router";
import customer from "./customer/customer";
import E404 from "../components/errors/404";
import staff from "./staff/staff";

import { Register } from "../pages/auth/register.jsx";
import { Login } from "../pages/auth/Login.jsx";
const router = createBrowserRouter([
  customer,
  //Ném tất cả url kh tồn tại sang *
  staff,
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "*",
    Component: E404,
  },
]);
export default router;
