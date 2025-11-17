import { useState } from "react";
import { registerUser, loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const registerResult = await registerUser(email, password);
      if (registerResult.success) {
        setMessage(registerResult.message);
        setEmail("");
        setPassword("");
        // Auto-login after successful registration
        const loginResult = await loginUser(email, password);
        if (loginResult.success) {
          console.log("Auto-login successful:", loginResult.data);
          navigate("/admin"); // Redirect to admin page
        } else {
          console.error("Auto-login failed:", loginResult.message);
          setMessage("自动登录失败！");
        }
      } else {
        setMessage(registerResult.message);
      }
    } catch (error) {
      setMessage("注册失败！" + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Join us to explore a world of amazing products and services. Create
            your account today!
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
                  "Register"
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

export default Register;
