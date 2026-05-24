"use client";

import {
  createContext, useContext, useEffect, useState,
  useCallback, ReactNode,
} from "react";
import { setTokenRefresher, type UserRead, ApiError } from "@/lib/api";

// ─── Context types ─────────────────────────────────────────────────────────

interface AuthState {
  user:          UserRead | null;
  accessToken:   string | null;
  isLoading:     boolean;
  login:         (email: string, password: string) => Promise<string>;
  signup:        (name: string, email: string, phone: string, password: string) => Promise<string>;
  logout:        () => void;
  refreshAccess: () => Promise<string | null>;
}

const AuthContext = createContext<AuthState | null>(null);

// ─── Provider ──────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,        setUser]        = useState<UserRead | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading,   setIsLoading]   = useState(true);

  const refreshAccess = useCallback(async (): Promise<string | null> => {
    const res = await fetch("/api/auth/refresh");
    if (!res.ok) {
      setUser(null);
      setAccessToken(null);
      return null;
    }
    const data = await res.json();
    setAccessToken(data.access_token);
    if (data.user) setUser(data.user);
    return data.access_token;
  }, []);

  // Register the global 401 refresh interceptor
  useEffect(() => {
    setTokenRefresher(refreshAccess);
    return () => setTokenRefresher(null);
  }, [refreshAccess]);

  // Restore session on mount via HttpOnly cookie refresh
  useEffect(() => {
    refreshAccess().finally(() => setIsLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = useCallback(async (email: string, password: string): Promise<string> => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new ApiError(res.status, err?.detail ?? res.statusText);
    }
    const data = await res.json();
    setAccessToken(data.access_token);
    if (data.user) setUser(data.user);
    return data.access_token;
  }, []);

  const signup = useCallback(async (
    name: string, email: string, phone: string, password: string,
  ): Promise<string> => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new ApiError(res.status, err?.detail ?? res.statusText);
    }
    const data = await res.json();
    setAccessToken(data.access_token);
    if (data.user) setUser(data.user);
    return data.access_token;
  }, []);

  const logout = useCallback(() => {
    const token = accessToken;
    setUser(null);
    setAccessToken(null);
    fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token: token }),
    }).catch(() => {});
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ user, accessToken, isLoading, login, signup, logout, refreshAccess }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

export { ApiError };
