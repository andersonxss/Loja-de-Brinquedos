import { useCallback } from "react";

export function useAuth() {
  const getToken = useCallback(() => {
    return localStorage.getItem("token");
  }, []);

  const getUser = useCallback(() => {
    const token = getToken();
    if (!token) return null;
    const user = JSON.parse(atob(token.split(".")[1]));
    return user;
  }, [getToken]);

  const isAuthenticated = !!getToken();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }, []);

  return { getToken, isAuthenticated, logout, getUser };
}
