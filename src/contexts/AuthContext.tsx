import React, { createContext, useContext, useState, ReactNode } from "react";

type Role = "student" | "enterprise" | null;

interface AuthState {
  isAuthenticated: boolean;
  email: string;
  role: Role;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>(null);

  const determineRole = (email: string): Role => {
    if (email.toLowerCase() === "etudiant@gmail.com") return "student";
    return "enterprise";
  };

  const login = (email: string, _password: string) => {
    setEmail(email);
    setRole(determineRole(email));
    setIsAuthenticated(true);
  };

  const signup = (email: string, _password: string, _name: string) => {
    setEmail(email);
    setRole(determineRole(email));
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setEmail("");
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, role, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
