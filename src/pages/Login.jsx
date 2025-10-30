import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import useAuthStore from "../store/authStore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set isLoading to true when login request starts
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        console.log("Login successful:", result.data);
        login(null, result.data); // Store user and token in Zustand
        navigate("/admin");
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage("Login failed: " + error.message);
    } finally {
      setIsLoading(false); // Set isLoading to false when login request ends
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Welcome back! Please log in to access your account.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form
            className="card-body"
            onSubmit={handleSubmit}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
            {message && <p className="text-center mt-4">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
