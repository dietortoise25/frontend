import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import router from "./router/index.jsx";
import { RouterProvider } from "react-router-dom";
import useAuthStore from "./store/authStore.js";
import ToastContainer from "./components/Toast/ToastContainer.jsx";

// Call checkAuth on application startup
useAuthStore.getState().checkAuth();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>
);
