
import { Register } from "../../pages/auth/register.jsx";
import { Login } from "../../pages/auth/Login.jsx";

const authRouter = [
     {
      path: "/register",
      Component: Register,
    },
    {
      path: "/login",
      Component: Login,
    },
]

export default authRouter;