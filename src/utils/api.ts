import { useMutation, useQuery, useQueryClient, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import localforage from "localforage";

import { useAuth } from "./context/auth-context";
import { AuthType } from "../types/auth";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

interface IUseApiQuery {
  key: string;
  url: string;
  config?: {
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
    refetchOnMount?: boolean;
    retry?: boolean | number | ((failureCount: number, error: AxiosError) => boolean);
  };
}

apiClient.interceptors.request.use(
  async (config) => {
    const user = await localforage.getItem<AuthType>("user");
    const baseURL_from_local = await localforage.getItem<string>("baseURL");
    const queryParameters = new URLSearchParams(location.search);
    const baseURL = queryParameters.get("baseURL");
    if (user) {
      const token = user.access_token;
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (baseURL && baseURL?.match(import.meta.env.VITE_API_URL_REGEX)) {
      config.baseURL = baseURL;
    }
    if (baseURL_from_local) {
      config.baseURL = baseURL_from_local;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const useApiQuery = ({ key, url, config = {} }: IUseApiQuery): UseQueryResult<any, unknown> => {
  const { logout } = useAuth();
  return useQuery({
    queryKey: [key, url],
    queryFn: async () => {
      apiClient.interceptors.response.use(
        (response) => {
          return response;
        },
        (error: AxiosError) => {
          if (error.response?.status === 401) {
            logout();
          }

          return Promise.reject(error);
        }
      );
      const response: AxiosResponse<any> = await apiClient.get(url);
      if (response.status === 401) logout();
      if (response.status !== 200) throw new Error("Error fetching data");
      return response.data;
    },
    ...config,
  });
};

export const useApiMutation = (
  url: string,
  config = {},
  keys?: string[],
  method: "POST" | "PUT" | "DELETE" = "POST"
): UseMutationResult<any, unknown, any, unknown> => {
  const queryClient = useQueryClient();
  let response: AxiosResponse<any>;
  return useMutation({
    mutationFn: async (data: unknown) => {
      if (method === "POST") {
        response = await apiClient.post(url, data);
      } else if (method === "PUT") {
        response = await apiClient.put(url, data);
      } else if (method === "DELETE") {
        response = await apiClient.delete(url);
      }
      if (response.status !== 200 && response.status !== 201) throw new Error("Error creating data");
      return response.data;
    },
    onSuccess: () => {
      if (keys) {
        queryClient.invalidateQueries({ queryKey: keys });
      }    
    },
    ...config,
  });
};
