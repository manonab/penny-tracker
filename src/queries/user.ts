import { useApiQuery } from "../utils/api";

export const useSearchUsers= (user_id: number | undefined) => {
  const {
    data: users,
    isError: isError,
    isLoading: isLoading,
  } = useApiQuery({
    key: 'get_available_users',
    url: `users`,
    config: {
      enabled: !!user_id,
    },
  });
  console.log(users)
  return { users, isError, isLoading };
};