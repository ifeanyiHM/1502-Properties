import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabase";

const AuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        navigate("/"); // or any route
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  return null;
};

export default AuthRedirectHandler;
