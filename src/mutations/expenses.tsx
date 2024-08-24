import { useState } from "react";
import { apiClient, useApiMutation } from "../utils/api";
import { useToast } from "../components/toast";
import { MutationFunction, useMutation, useQueryClient } from "@tanstack/react-query";


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
export const useDeleteExpenseMutation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const openToast = useToast();
  const queryClient = useQueryClient();

  const deleteMutation: MutationFunction<unknown, { expense_id: number }> = async ({ expense_id }) => {
    const response = await apiClient.delete(`expenses/${expense_id}`,);
    return response.data;
  };

  const { mutateAsync } = useMutation({ mutationFn: deleteMutation });

  const updateExpenses = async(
    expense_id: number,
  ) => {
    try{
       setLoading(true);
            await mutateAsync({expense_id });
            queryClient.invalidateQueries({ queryKey: ['get_expenses'] });
            queryClient.invalidateQueries({ queryKey: ['get_balance'] });
            queryClient.invalidateQueries({ queryKey: ['get_general_balance'] });
            openToast({
              type: "success",
              title: "Dépense supprimée",
              description: "Votre dépense a été supprimée avec succès.",
            });
          }
    catch {
        setLoading(false);
        openToast({
        type: "error",
        title: "Échec lors de la suppression",
        description: "Une erreur est survenue lors de la suppression de la dépense. Veuillez réessayer.",
      });
    }
  }

  return {
    updateExpenses,
    isLoading: loading,
  };
};
