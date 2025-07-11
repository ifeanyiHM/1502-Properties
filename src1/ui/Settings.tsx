import { useEffect, useState } from "react";
import useProperty from "../context/useProperty";
import { updateCurrentUser } from "../services/apiAuth";
import supabase from "../services/supabase";

const Settings = () => {
  const [fullName, setFullName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string | undefined>("");
  const [avatar, setAvatar] = useState<File | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { refreshUser, setRefreshUser } = useProperty();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const name = user.user_metadata?.fullName || "user";
        const email = user.email;
        setFullName(name);
        setUserEmail(email);
      }
    };

    getUser();
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName) return;

    try {
      await updateCurrentUser({ fullName, profilePhoto: avatar });
      alert("User profile updated successfully!");
      setRefreshUser(!refreshUser);
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Something went wrong while updating your profile.");
      }
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword) return;

    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await updateCurrentUser({ password: newPassword });
      alert("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Something went wrong while updating your password.");
      }
    }
  };

  return (
    <div className="settings-page">
      <h2>Update your account</h2>

      <form onSubmit={handleUpdateUser} className="card">
        <h3>Update user data</h3>

        <label>Email address</label>
        <input type="email" value={userEmail} readOnly />

        <label>Full name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label>Avatar image</label>
        <input type="file" accept="image/*" onChange={handleAvatarChange} />

        <div className="actions">
          <button type="button" className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Update account
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
          <button type="submit" className="btn-primary">
            Update password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
