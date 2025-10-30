import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Admin from "./pages/Admin/Admin.jsx";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";
import environment from "./utils/useApiUrl.js";

function App() {
  useEffect(() => {
    console.log(
      `devMode:${environment.isDevMode},API_URL:${environment.API_URL}`
    );
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/product"
          element={<Product />}
        />
        <Route element={<PrivateRoute />}>
          <Route
            path="/admin"
            element={<Admin />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
