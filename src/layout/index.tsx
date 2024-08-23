import { Outlet } from "react-router-dom";
import { ToastProvider } from "../components/toast";
// import { useAuth } from "@/utils/context/auth-context";

export const Layout: React.FC = () => {
  // const { user } = useAuth();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const [previousLocation, setPreviousLocation] = useState<Location | null>(null);
  // const baseURL = new URLSearchParams(location.search).get("baseURL");

  // useEffect(() => {
  //   setPreviousLocation(location);
  // }, [location]);

  // useEffect(() => {
  //   const isPasswordResetRoute = location.pathname.startsWith("/setup-password/");
  //   const handleLoginRedirect = () => {
  //     const search = baseURL ? "?baseURL=" + baseURL : "";
  //     navigate({ pathname: "/login", search: search });
  //   };

  //   try {
  //     if (user) {
  //       if (location.pathname === "/roadmaps" || previousLocation === null) {
  //         return;
  //       } else if (previousLocation && !["/login", "/"].includes(previousLocation.pathname)) {
  //         navigate(previousLocation);
  //       } else {
  //         navigate("/roadmaps");
  //       }
  //     } else {
  //       if (!isPasswordResetRoute) {
  //         console.log("User pas authentifié, redirigé sur login");
  //         handleLoginRedirect();
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error during redirection:", error);
  //   }
  // }, [user, navigate, baseURL]);

  return (
    <ToastProvider>
      <Outlet />
    </ToastProvider>
  );
};
