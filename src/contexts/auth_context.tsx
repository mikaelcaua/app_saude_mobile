import React, { createContext, useContext, useEffect, useState } from "react";
import AuthContextInterface from "../types/auth_context_interface";
import UserInterface from "../types/user_interface";
import { AuthService } from "../services/auth_service";

const AuthContext = createContext<AuthContextInterface | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const authService = new AuthService();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    const userData = await authService.login(email, password);
    setUser(userData);
    setLoading(false);
  }

  function logout() {
    setUser(authService.logout());
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
