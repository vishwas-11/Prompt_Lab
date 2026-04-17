import api from "./api";

export const AUTH_TOKEN_EVENT = "auth-token-changed";
const SESSION_CACHE_TTL_MS = 5000;

type SessionResponse = {
  authenticated: boolean;
  user_id: string;
};

type SessionCacheEntry = {
  expiresAt: number;
  value: SessionResponse;
};

let sessionCache: SessionCacheEntry | null = null;
let inFlightSessionRequest: Promise<SessionResponse> | null = null;

const notifyAuthChange = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_TOKEN_EVENT));
  }
};

const invalidateSessionCache = () => {
  sessionCache = null;
  inFlightSessionRequest = null;
};

export const login = async (email: string, password: string) => {
  await api.post("/auth/login", { email, password });
  invalidateSessionCache();
  notifyAuthChange();
};

export const register = async (email: string, password: string) => {
  await api.post("/auth/register", { email, password });
  invalidateSessionCache();
  notifyAuthChange();
};

export const logout = async () => {
  await api.post("/auth/logout");
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
      throw error;
    })
    .finally(() => {
      inFlightSessionRequest = null;
    });

  return inFlightSessionRequest;
};
