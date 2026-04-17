import api from "./api";

export const AUTH_TOKEN_EVENT = "auth-token-changed";

const storeToken = (token: string) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("token", token);
    window.dispatchEvent(new Event(AUTH_TOKEN_EVENT));
  }
};

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  storeToken(res.data.token);
  return res.data.token as string;
};

export const register = async (email: string, password: string) => {
  const res = await api.post("/auth/register", { email, password });
  storeToken(res.data.token);
  return res.data.token as string;
};

export const logout = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("token");
    window.dispatchEvent(new Event(AUTH_TOKEN_EVENT));
  }
};

export const getToken = () =>
  typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
