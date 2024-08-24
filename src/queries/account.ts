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

export const useGetBalanceGeneral= (user_id: number | undefined) => {
  const {
    data: getBalanceGeneralDatas,
    isError: isError,
    isLoading: isLoading,
  } = useApiQuery({
    key: "get_general_balance",
    url: `account/general-balance`,
    config: {
      enabled: !!user_id,
    },
  });
  return { getBalanceGeneralDatas, isError, isLoading };
};