import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import supabase from "../services/supabase";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //   const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setError(null);
    // setMessage(null);

    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      toast.success("Password updated successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="reset-password-container">
        <div className="reset-card">
          <h2>Reset Your Password</h2>
          <p className="subtitle">
            Enter your new password below to regain access to your account.
          </p>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && (
            <p
              className="error"
              style={{
                //   color: "#dc2626",
                //   marginTop: "0.5rem",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {error}
            </p>
          )}

          {/* {message && <p className="success">{message}</p>} */}

          <button
            className="btn-reset"
            onClick={handleUpdatePassword}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
