// components/Login.tsx
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { handleGoogleLogin, login } from "../services/apiAuth";
import { SpinnerMini } from "../Utilities/Spinner";
// import login from "../../services/apiAuth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const user = await login({ email, password });
      if (user) {
        navigate("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <Link to="/">
          <img
            src="/website_logo.svg"
            alt="company's logo"
            title="1502 Property Logo"
            loading="lazy"
            // width="112"
            // height="45.28"
          />
        </Link>
      </div>
      <div className="fixed">
        <div className="login-card">
          <h2 className="login-title">Log in</h2>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="Email"
              />
            </div>

            <div className="form-group">
              <div className="password">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  placeholder="Password"
                />
                <span onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              Login{" "}
              {loading && (
                <span className="loading">
                  <SpinnerMini />
                </span>
              )}
            </button>

            {errorMsg && (
              <p style={{ color: "red", marginTop: 0 }}>{errorMsg}</p>
            )}
          </form>
          <div className="or">
            <hr />
            <span>or</span>
            <hr />
          </div>
          <button className="google-btn" onClick={handleGoogleLogin}>
            <FcGoogle className="google-icon" />
            <span>Continue with Google</span>
          </button>

          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>{" "}
      </div>
    </div>
  );
};

export default Login;
