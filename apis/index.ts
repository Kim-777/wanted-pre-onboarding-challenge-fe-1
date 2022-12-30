import axios from "axios";

export const restApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_REST_URL,
  timeout: 5000,
});
