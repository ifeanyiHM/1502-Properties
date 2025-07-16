// components/AdminRoute.tsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../services/supabase";
import { Spinner } from "../Utilities/Spinner";

interface Props {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.user_metadata?.userType === "admin") {
        setIsAdmin(true);
      }
      setLoading(false);
    };

    checkAdmin();
  }, []);

  if (loading) return <Spinner />;

  if (!isAdmin) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default AdminRoute;
