import api, { setAuthToken } from "../../api/axios";

export const register = (payload: any) => api.post("/auth/register", payload);
export const login = async (payload: any) => {
  const res = await api.post("/auth/login", payload);
  if (res.data.token) setAuthToken(res.data.token);
  return res;
};
export const logout = () => {
  setAuthToken(undefined);
};
