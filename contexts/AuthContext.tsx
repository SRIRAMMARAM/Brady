"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { auth, ApiError, setTokenRefresher, type UserRead } from "@/lib/api";

// ─── Token storage helpers (localStorage) ────────────────────────────────

const KEYS = {
  access:  "brady_access_token",
  refresh: "brady_refresh_token",
};

function loadToken(key: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
}

function saveTokens(access: string, refresh: string) {
  localStorage.setItem(KEYS.access,  access);
  localStorage.setItem(KEYS.refresh, refresh);
}

function clearTokens() {
  localStorage.removeItem(KEYS.access);
  localStorage.removeItem(KEYS.refresh);
}

// ─── Context types ────────────────────────────────────────────────────────

interface AuthState {
  user:         UserRead | null;
  accessToken:  string | null;
  isLoading:    boolean;
  login:        (email: string, password: string) => Promise<void>;
  signup:       (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout:       () => void;
  refreshAccess: () => Promise<string | null>;
}

const AuthContext = createContext<AuthState | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,        setUser]        = useState<UserRead | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading,   setIsLoading]   = useState(true);

  // Register the global 401 refresh interceptor
  useEffect(() => {
    setTokenRefresher(async () => {
      const refresh = loadToken(KEYS.refresh);
      if (!refresh) return null;
      try {
        const res = await auth.refresh(refresh);
        localStorage.setItem(KEYS.access, res.access_token);
        setAccessToken(res.access_token);
        return res.access_token;
      } catch {
        clearTokens();
        setUser(null);
        setAccessToken(null);
        return null;
      }
    });
    return () => setTokenRefresher(null);
  }, []);

  // Restore session on mount
  useEffect(() => {
    const stored = loadToken(KEYS.access);
    if (!stored) { setIsLoading(false); return; }

    auth.me(stored)
      .then((u) => { setUser(u); setAccessToken(stored); })
      .catch(() => {
        // Try refresh
        const refresh = loadToken(KEYS.refresh);
        if (!refresh) { clearTokens(); return; }
        return auth.refresh(refresh)
          .then((res) => {
            const newAccess = res.access_token;
            localStorage.setItem(KEYS.access, newAccess);
            setAccessToken(newAccess);
            return auth.me(newAccess);
          })
          .then((u) => setUser(u))
          .catch(() => clearTokens());
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await auth.login({ email, password });
    saveTokens(res.access_token, res.refresh_token);
    setAccessToken(res.access_token);
    const me = await auth.me(res.access_token);
    setUser(me);
  }, []);

  const signup = useCallback(async (name: string, email: string, phone: string, password: string) => {
    const res = await auth.signup({ name, email, phone, password });
    saveTokens(res.access_token, res.refresh_token);
    setAccessToken(res.access_token);
    const me = await auth.me(res.access_token);
    setUser(me);
  }, []);

  const logout = useCallback(() => {
    const token = loadToken(KEYS.access);
    if (token) auth.logout(token).catch(() => { /* best-effort */ });
    clearTokens();
    setUser(null);
    setAccessToken(null);
  }, []);

  const refreshAccess = useCallback(async (): Promise<string | null> => {
    const refresh = loadToken(KEYS.refresh);
    if (!refresh) return null;
    try {
      const res = await auth.refresh(refresh);
      localStorage.setItem(KEYS.access, res.access_token);
      setAccessToken(res.access_token);
      return res.access_token;
    } catch {
      logout();
      return null;
    }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, accessToken, isLoading, login, signup, logout, refreshAccess }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

// Re-export ApiError for convenience in consuming components
export { ApiError };
