import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../context/useAuth";
import { updateCurrentUser } from "../services/apiAuth";
import supabase from "../services/supabase";
import { SpinnerMini } from "../Utilities/Spinner";

const Settings = () => {
  const [fullName, setFullName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string | undefined>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [userType, setUserType] = useState<"agent" | "client" | "admin">(
    "client"
  );

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const { refreshUser, setRefreshUser } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const name = user.user_metadata?.fullName || "user";
        const email = user.email;
        const type = user.user_metadata?.userType || "client";
        setFullName(name);
        setUserEmail(email);
        setUserType(type); // set current type
      }
    };

    getUser();
  }, [refreshUser]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName) return;

    try {
      setLoading(true);
      await updateCurrentUser({ fullName, profilePhoto: avatar, userType });
      toast.success("User profile updated successfully!");
      setRefreshUser(!refreshUser);
    } catch (err) {
      toast.success(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword) return;
    if (newPassword.length < 8)
      return toast.success("Password must be at least 8 characters");
    if (newPassword !== confirmPassword)
      return toast.success("Passwords do not match");

    try {
      setLoadingPassword(true);
      await updateCurrentUser({ password: newPassword });
      toast.success("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.success(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <>
      {" "}
      <ToastContainer />
      <div className="settings-page">
        <h2>Update your account</h2>

        <div className="settings-container">
          <form onSubmit={handleUpdateUser} className="card">
            <h3>Update user data</h3>

            <label>Email address</label>
            <input className="email" type="email" value={userEmail} readOnly />

            <label>Full name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            {userType !== "admin" && (
              <>
                {" "}
                <label>User Type</label>
                <div
                  style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
                >
                  <label>
                    <input
                      type="radio"
                      value="client"
                      checked={userType === "client"}
                      onChange={() => setUserType("client")}
                    />
                    Client
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="agent"
                      checked={userType === "agent"}
                      onChange={() => setUserType("agent")}
                    />
                    Agent
                  </label>
                </div>
              </>
            )}

            <label>Avatar image</label>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />

            <div className="actions">
              {/* <button type="button" className="btn-secondary">
            Cancel
          </button> */}
              {/* <button type="submit" className="btn-primary" disabled={loading}>
                Update account
              </button> */}
              <button type="submit" className="btn-primary" disabled={loading}>
                Update account
                {loading && (
                  <span className="loading">
                    <SpinnerMini />
                  </span>
                )}
              </button>
            </div>
          </form>
          <form onSubmit={handleUpdatePassword} className="card">
            <h3>Update password</h3>

            <label>New password (min 8 chars)</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label>Confirm password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="actions">
              <button
                type="submit"
                className="btn-primary"
                disabled={loadingPassword}
              >
                Update account
                {loadingPassword && (
                  <span className="loading">
                    <SpinnerMini />
                  </span>
                )}
              </button>
            </div>
          </form>{" "}
        </div>
      </div>
    </>
  );
};

export default Settings;
