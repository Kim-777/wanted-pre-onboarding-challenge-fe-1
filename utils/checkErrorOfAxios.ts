import { AxiosError } from "axios";

export const checkErrorOfAxios = (
  e: any
): e is AxiosError<{ details: string }> => {
  if ((e as any)?.response?.data.details) return true;
  return false;
};
