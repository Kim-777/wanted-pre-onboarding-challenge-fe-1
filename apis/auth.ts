import { restApi } from "apis";
import { AuthUserReturn, UserInput } from "types/user";

export const signUp = async (requestBody: UserInput) => {
  const { data } = await restApi.post<AuthUserReturn>(
    "/users/create",
    requestBody
  );

  return data;
};

export const login = async (requestBody: UserInput) => {
  const { data } = await restApi.post<AuthUserReturn>(
    "/users/login",
    requestBody
  );
  return data;
};
