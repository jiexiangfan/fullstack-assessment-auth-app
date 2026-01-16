import React, { createContext, useEffect, useMemo, useState } from "react";
import type { User } from "../api/types";
import { apiMe } from "../api/me";

type AuthState = {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  setSession: (token: string) => void;
  clearSession: () => void;
  refreshMe: () => Promise<void>;
};

export const AuthContext = createContext<AuthState | null>(null);

const STORAGE_KEY = "auth_token";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEY)
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(!!token);
  const [error, setError] = useState<string | null>(null);

  async function refreshMe() {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const me = await apiMe(token);
      setUser(me);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to load profile";
      setError(msg);
      clearSession();
    } finally {
      setLoading(false);
    }
  }

  function setSession(newToken: string) {
    localStorage.setItem(STORAGE_KEY, newToken);
    setToken(newToken);
  }

  function clearSession() {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUser(null);
  }

  useEffect(() => {
    if (token) void refreshMe();
  }, [token]);

  const value = useMemo<AuthState>(
    () => ({
      token,
      user,
      loading,
      error,
      setSession,
      clearSession,
      refreshMe,
    }),
    [token, user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
