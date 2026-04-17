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
  withCredentials: true,
});

export default api;