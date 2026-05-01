import { useState, useCallback } from "react";

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profileImageUrl?: string;
}

const AUTH_KEY = "pinkspace_user";

function getStoredUser(): User | null {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(getStoredUser);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const login = useCallback((userData: User) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem(AUTH_KEY);
      setUser(null);
      setIsLoggingOut(false);
    }, 500);
  }, []);

  return {
    user,
    isLoading: false,
    isAuthenticated: !!user,
    login,
    logout,
    isLoggingOut,
  };
}
