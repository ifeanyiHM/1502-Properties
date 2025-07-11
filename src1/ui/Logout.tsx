import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/apiAuth";

function Logout() {
  const [loading, setLoading] = useState(false);
  //   const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLogout}>{loading ? "Logging out" : "Logout"}</button>
  );
}

export default Logout;
