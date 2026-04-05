"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({ role: null, emailConfirmed: null });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [validatingAuth, setValidatingAuth] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setValidatingAuth(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/auth/status`,
          {
            credentials: "include",
          },
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const result = await response.json();
        const storedRole = window.localStorage.getItem("role");
        setUser(
          storedRole ? { ...result.user, role: storedRole } : result.user,
        );
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
        setUser({ role: null, emailConfirmed: null, accountStatus: null });
      } finally {
        setValidatingAuth(false);
      }
    }
    fetchData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        setIsLoggedIn,
        validatingAuth,
        setValidatingAuth,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
