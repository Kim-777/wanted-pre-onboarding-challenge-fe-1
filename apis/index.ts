import axios from "axios";

export const restApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_REST_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setTokenToAxiosHeader = (token: string) => {
  restApi.defaults.headers.common.authorization = token;
  return;
};

export const deleteTokenAtAxiosHeader = () => {
  delete restApi.defaults.headers.common.authorization;
};
