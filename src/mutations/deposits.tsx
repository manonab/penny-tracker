import { useState } from "react";
import { useApiMutation } from "../utils/api";
import { useToast } from "../components/toast";
import { useQueryClient } from "@tanstack/react-query";



export const useAddDepositMutation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const openToast = useToast();
  const queryClient = useQueryClient();

  const mutation = useApiMutation("deposits", {
    method: "POST",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get_general_balance'] });
      queryClient.invalidateQueries({ queryKey: ['get_balance'] });
      setLoading(false);
      openToast({
        type: "success",
        title: "Dépôt ajouté",
        description: "Votre dépôt a été ajouté avec succès.",
      });
    },
    onError: (error: unknown) => {
      setLoading(false);
      console.error("Error adding deposit:", error);

      openToast({
        type: "error",
        title: "Échec de l'ajout de dépôt",
        description: "Une erreur est survenue lors de l'ajout du dépôt. Veuillez réessayer.",
      });
    },
  });

  return {
    addDeposit: mutation,
    isLoading: loading,
  };
};
