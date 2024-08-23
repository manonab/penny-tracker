import { useApiQuery } from "../utils/api";

export const useGetBalanceDetails= (user_id: number | undefined) => {
  const {
    data: getBalanceDatas,
    isError: isError,
    isLoading: isLoading,
  } = useApiQuery({
    key: "get_balance",
    url: `account/balance/${user_id}`,
    config: {
      enabled: !!user_id,
    },
  });
  return { getBalanceDatas, isError, isLoading };
};