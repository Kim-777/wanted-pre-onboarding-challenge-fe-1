export const TOKEN_KEY = "TOKEN";

export const setTokenToLocalStorage = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getTokenAtLocalStorage = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeTokenAtLocalStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
};
