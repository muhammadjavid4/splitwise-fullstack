import axios from "axios";
import useUserStore from "../store/user.store";

const api = axios.create({
  baseURL: "https://splitwise-fullstack.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;

  // 🔐 JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // ❌ DO NOT ADD If-None-Match / If-Modified-Since
  // ❌ DO NOT FORCE CACHE HEADERS

  return config;
});

export default api;
