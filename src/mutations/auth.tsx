import localforage from "localforage";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import { AuthType } from "../types/auth";
import { useApiMutation } from "../utils/api";
import { useToast } from "../components/toast";
import { useAuth } from "../utils/context/auth-context";

export const useAuthMutation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const openToast = useToast();
  const { setUser } = useAuth();
  const redirect = useNavigate();

  const mutation = useApiMutation("auth/login", {
    onSuccess: (data: AuthType) => {
      setUser(data)
      localforage.setItem("user", data);
      setLoading(false);
      redirect("/home");
    },
    onError: (error: unknown) => {
      setLoading(false);
            console.error("Error during authentication:", error);

      openToast({
        type: "error",
        title: "Connexion échouée",
        description: "Veuillez vérifier vos identifiants et réessayer.",
      });
    },
  });

  return {
    authMutate: mutation.mutate,
    authLoading: loading,
    setAuthLoading: setLoading,
  };
};
