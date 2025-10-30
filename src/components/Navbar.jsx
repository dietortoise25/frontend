import { Link, useNavigate } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
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
        <ul className="menu menu-horizontal px-1">
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
                      data-tip="登录"
                    >
                      <LogIn className="h-5 w-5" />
                      <span>LogIn</span>
                    </div>
                  </Link>
                </button>
              </li>
              {/* <li>
                <Link to="/register">
                  <div
                    className="tooltip tooltip-bottom"
                    data-tip="注册"
                  >
                    <UserPlus className="h-5 w-5" />
                  </div>
                </Link>
              </li> */}
            </>
          )}
          <li>
            <Link
              to="/admin"
              className="btn btn-ghost"
            >
              产品管理后台
            </Link>
          </li>
        </ul>
        {/* <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;
