// import api from "./api";

// export const AUTH_TOKEN_EVENT = "auth-token-changed";
// const AUTH_TOKEN_STORAGE_KEY = "auth_token";
// const SESSION_CACHE_TTL_MS = 5000;

// type SessionResponse = {
//   authenticated: boolean;
//   user_id: string;
// };

// type AuthResponse = {
//   authenticated: boolean;
//   token: string;
// };

// type SessionCacheEntry = {
//   expiresAt: number;
//   value: SessionResponse;
// };

// let sessionCache: SessionCacheEntry | null = null;
// let inFlightSessionRequest: Promise<SessionResponse> | null = null;

// const notifyAuthChange = () => {
//   if (typeof window !== "undefined") {
//     window.dispatchEvent(new Event(AUTH_TOKEN_EVENT));
//   }
// };

// const invalidateSessionCache = () => {
//   sessionCache = null;
//   inFlightSessionRequest = null;
// };

// const storeAuthToken = (token: string) => {
//   if (typeof window !== "undefined") {
//     window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
//   }
// };

// const clearAuthToken = () => {
//   if (typeof window !== "undefined") {
//     window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
//   }
// };

// export const login = async (email: string, password: string) => {
//   const response = await api.post<AuthResponse>("/auth/login", { email, password });
//   storeAuthToken(response.data.token);
//   invalidateSessionCache();
//   notifyAuthChange();
// };

// export const register = async (email: string, password: string) => {
//   const response = await api.post<AuthResponse>("/auth/register", { email, password });
//   storeAuthToken(response.data.token);
//   invalidateSessionCache();
//   notifyAuthChange();
// };

// export const logout = async () => {
//   try {
//     await api.post("/auth/logout");
//   } finally {
//     clearAuthToken();
//   }
//   invalidateSessionCache();
//   notifyAuthChange();
// };

// export const getSession = async ({
//   force = false,
// }: {
//   force?: boolean;
// } = {}) => {
//   const now = Date.now();

//   if (!force && sessionCache && sessionCache.expiresAt > now) {
//     return sessionCache.value;
//   }

//   if (!force && inFlightSessionRequest) {
//     return inFlightSessionRequest;
//   }

//   inFlightSessionRequest = api
//     .get<SessionResponse>("/auth/session")
//     .then((res) => {
//       sessionCache = {
//         value: res.data,
//         expiresAt: Date.now() + SESSION_CACHE_TTL_MS,
//       };
//       return res.data;
//     })
//     .catch((error) => {
//       sessionCache = null;
//       if (error?.response?.status === 401) {
//         clearAuthToken();
//       }
//       throw error;
//     })
//     .finally(() => {
//       inFlightSessionRequest = null;
//     });

//   return inFlightSessionRequest;
// };









import api from "./api";

export const AUTH_TOKEN_EVENT = "auth-token-changed";
const AUTH_TOKEN_STORAGE_KEY = "auth_token";
const SESSION_CACHE_TTL_MS = 5000;

type SessionResponse = {
  authenticated: boolean;
  user_id: string;
};

type AuthResponse = {
  authenticated: boolean;
  token: string;
};

type SessionCacheEntry = {
  expiresAt: number;
  value: SessionResponse;
};

let sessionCache: SessionCacheEntry | null = null;
let inFlightSessionRequest: Promise<SessionResponse> | null = null;

export const notifyAuthChange = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_TOKEN_EVENT));
  }
};

const invalidateSessionCache = () => {
  sessionCache = null;
  inFlightSessionRequest = null;
};

const storeAuthToken = (token: string) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  }
};

const clearAuthToken = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  }
};

export const login = async (email: string, password: string) => {
  const response = await api.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  storeAuthToken(response.data.token);
  invalidateSessionCache();
  notifyAuthChange();
};

export const register = async (email: string, password: string) => {
  const response = await api.post<AuthResponse>("/auth/register", {
    email,
    password,
  });
  storeAuthToken(response.data.token);
  invalidateSessionCache();
  notifyAuthChange();
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } finally {
    clearAuthToken();
  }
  invalidateSessionCache();
  notifyAuthChange();
};

export const getSession = async ({
  force = false,
}: {
  force?: boolean;
} = {}) => {
  const now = Date.now();

  if (!force && sessionCache && sessionCache.expiresAt > now) {
    return sessionCache.value;
  }

  if (!force && inFlightSessionRequest) {
    return inFlightSessionRequest;
  }

  inFlightSessionRequest = api
    .get<SessionResponse>("/auth/session")
    .then((res) => {
      sessionCache = {
        value: res.data,
        expiresAt: Date.now() + SESSION_CACHE_TTL_MS,
      };
      return res.data;
    })
    .catch((error) => {
      sessionCache = null;

      // Only clear token on explicit 401 — NOT on network errors,
      // timeouts, or 502s from Render cold starts
      const status = error?.response?.status;
      if (status === 401) {
        clearAuthToken();
        notifyAuthChange();
      }

      throw error;
    })
    .finally(() => {
      inFlightSessionRequest = null;
    });

  return inFlightSessionRequest;
};