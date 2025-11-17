import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import router from "./router/index";
import { RouterProvider } from "react-router-dom";
import authStore from "./store/authStore";
import ToastContainer from "./components/Toast/ToastContainer";

// Call checkAuth on application startup
authStore.getState().checkAuth();

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>
);
}
