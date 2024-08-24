import { ExpensesArraySchema, ExpensesArrayType } from "../types/expenses";
import { useApiQuery } from "../utils/api";

export const useGetPersonnalExpenses = (user_id: number | undefined) => {
  const {
    data: expensesData,
    isError,
    isLoading,
  } = useApiQuery({
    key: "get_expenses",
    url: `/expenses/user/${user_id}`,
    config: {
      enabled: !!user_id,
    },
  });

  let expenseDetails: ExpensesArrayType | undefined = undefined;

  if (expensesData) {
    const result = ExpensesArraySchema.safeParse(expensesData);
    if (result.success) {
      expenseDetails = result.data;
    } else {
      console.error("Zod validation failed:", result.error);
    }
  }

  return { expenseDetails, isError, isLoading };
};