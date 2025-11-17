import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import { logoutUser } from "../services/authService";

function Navbar() {
  const { isLoggedIn, checkAuth, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = () => {
    logoutUser(); // Clear token from localStorage
    logout(); // Clear Zustand state
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Link
          to="/"
          className="btn btn-ghost text-xl"
        >
          <img
            src="/miten-logo.svg"
            alt="Miten Logo"
            className="w-15"
          />
        </Link>
      </div>
      <div className="navbar-end">
        {/* small screen */}
        <div>
          <div className="drawer drawer-end lg:hidden">
            <input
              id="my-drawer-4"
              type="checkbox"
              className="drawer-toggle"
            />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer-4"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/product">Product</Link>
                </li>
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
                {isLoggedIn ? (
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link to="/login">
                        <div className="flex gap-2">
                          <LogIn className="h-5 w-5" />
                          <span>LogIn</span>
                        </div>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        {/* big screen */}
        <ul className="menu menu-horizontal px-1 hidden lg:flex">
          <li>
            <Link
              to="/"
              className="btn btn-ghost"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/product"
              className="btn btn-ghost"
            >
              Product
            </Link>
          </li>

          <li>
            <Link
              to="/admin"
              className="btn btn-ghost"
            >
              Admin
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button
                onClick={handleLogout}
                className="btn btn-ghost"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <button className="btn btn-ghost">
                  <Link to="/login">
                    <div
                      className="tooltip tooltip-bottom flex gap-2"
                      data-tip="Iniciar sesión"
                    >
                      <LogIn className="h-5 w-5" />
                      <span>LogIn</span>
                    </div>
                  </Link>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
