import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./utils/context/auth-context";
import "./index.css";
import { Auth } from "./routes/auth";
import { Layout } from "./layout";
import HomePage from "./routes/home";

const rootDiv = document.getElementById("root");
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        index: true,
        element: <Auth />,
      },
            {
        path: "/home",
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

createRoot(rootDiv as Element).render(<App />);
