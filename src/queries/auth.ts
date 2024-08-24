import { UserSchema, UserType } from "../types/user";
import { useApiQuery } from "../utils/api";

export const useGetUser= (user_id: number | undefined) => {
  const {
    data: userDatas,
    isError: isError,
    isLoading: isLoading,
  } = useApiQuery({
    key: "get_user",
    url: `users/${user_id}`,
    config: {
      enabled: !!user_id,
    },
  });

  let userDetails: UserType | undefined = undefined;

  if (userDatas) {
    const result = UserSchema.safeParse(userDatas);
    if (result.success) {
      userDetails = result.data;
    } else {
      console.error("Zod validation failed:", result.error);
    }
  }

  return { userDetails, isError, isLoading };
};