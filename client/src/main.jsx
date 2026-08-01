import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";

import Index from "./Index.jsx";
import Customer from "./layouts/Customer";
import { Register } from "./pages/auth/register.jsx";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { Login } from "./pages/auth/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Customer,
    children: [
      {
        index: true,
        Component: Index,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
