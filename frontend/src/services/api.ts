// import axios from "axios";

// const defaultApiBaseUrl =
//   typeof window !== "undefined"
//     ? `${window.location.protocol}//${window.location.hostname}:8000`
//     : "http://localhost:8000";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || defaultApiBaseUrl,
//   withCredentials: true,
// });

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
