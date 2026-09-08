import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router/dom";
import router from "./routers/router.js";
import "./index.css";
import AuthInitializer from "./components/auth/login/AuthInitializer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
