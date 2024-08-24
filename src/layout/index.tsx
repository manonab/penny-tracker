import { Outlet, useNavigate } from "react-router-dom";
import { ToastProvider } from "../components/toast";
import { useAuth } from "../utils/context/auth-context";
import { useEffect } from "react";

export const Layout: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (user?.user_id) {
          navigate("/home");
      } else {
        navigate("/login")
      }
    } catch (error) {
      console.error("Error during redirection:", error);
    }
  }, [user, navigate]);

  return (
    <ToastProvider>
      <Outlet />
    </ToastProvider>
  );
};
