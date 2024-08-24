import { useState } from "react";
import { useApiMutation } from "../utils/api";
import { useToast } from "../components/toast";
import { useQueryClient } from "@tanstack/react-query";


export const useAddExpenseMutation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const openToast = useToast();
  const queryClient = useQueryClient();

  const mutation = useApiMutation("expenses", {
    method: "POST",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get_expenses'] });
      queryClient.invalidateQueries({ queryKey: ['get_balance'] });
      queryClient.invalidateQueries({ queryKey: ['get_general_balance'] });

      setLoading(false);
      openToast({
        type: "success",
        title: "Dépense ajoutée",
        description: "Votre dépense a été ajoutée avec succès.",
      });
    },
    onError: (error: unknown) => {
      setLoading(false);
      console.error("Error adding expense:", error);

      openToast({
        type: "error",
        title: "Échec de l'ajout de dépense",
        description: "Une erreur est survenue lors de l'ajout de la dépense. Veuillez réessayer.",
      });
    },
  });


  return {
    addExpense: mutation,
    isLoading: loading,
  };
};
