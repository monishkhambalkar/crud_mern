import axios from "axios";

//const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL as string) || (process.env.REACT_APP_API_URL ?? "http://localhost:4000/api");

const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";


const instance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export function setAuthToken(token?: string | null) {
  if (token) instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete instance.defaults.headers.common["Authorization"];
}

export default instance;
