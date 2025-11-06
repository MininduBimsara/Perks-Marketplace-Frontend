"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

type LoginCredentials = { email: string; password: string; rememberMe?: boolean };

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  error: string | null;
  // return true on success, false on failure
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // initialize from localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      // simple presence indicates logged in; in real app call /auth/me to validate
      setIsAuthenticated(true);
      try {
        const raw = localStorage.getItem("user");
        setUser(raw ? JSON.parse(raw) : null);
      } catch (e) {
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async ({ email, password }: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      // Attempt real API via Next rewrite (/api -> backend). This keeps auth and data calls on the same origin/backend.
      // Configure next.config.mjs NEXT_PUBLIC_API_BASE_URL to your backend origin.
      const res = await fetch(`https://perks-marketplace-backend.vercel.app/api/v1/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok && data.data.token) {
          // write token to both keys to keep compatibility with existing services
          localStorage.setItem("auth_token", data.data.token);
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("auth_user", JSON.stringify(data.user || { email }));
          // also write a generic user key for other code that may read it
          localStorage.setItem("user", JSON.stringify(data.user || { email }));
          setUser(data.user || { email });
          setIsAuthenticated(true);
          setIsLoading(false);
          return true;
        }
        throw new Error(data?.message || "Login failed");
      
      // Fallback mock: accept admin@example.com / password when API is unavailable
      if (email === "admin@example.com" && password === "password") {
        const mockToken = "mock-token";
        localStorage.setItem("auth_token", mockToken);
        localStorage.setItem("token", mockToken);
        localStorage.setItem("auth_user", JSON.stringify({ email }));
        localStorage.setItem("user", JSON.stringify({ email }));
        setUser({ email });
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err: any) {
      setError(err?.message || "Login error");
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("token");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, error, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
