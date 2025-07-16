import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === adminPassword) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!authenticated) {
    return (
      <div className="admin-container">
        <div className="admin-login">
          <h2>Enter Admin Password</h2>
          <form onSubmit={handleLogin}>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              <span onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>

            <button type="submit">Enter</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-container">
        <h1>Admin Panel</h1>

        <div className="tab-buttons">
          <NavLink
            to="approveproperty"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Approve Properties
          </NavLink>
          <NavLink
            to="deleteproperty"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Delete Properties
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminPage;
