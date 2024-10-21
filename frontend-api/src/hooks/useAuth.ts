import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("accessToken")
  );

  const checkAuthentication = () => {
    setIsAuthenticated(!!localStorage.getItem("accessToken"));
  };

  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    checkAuthentication();
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    checkAuthentication();
  };

  useEffect(() => {
    checkAuthentication();

    const handleStorageChange = () => {
      checkAuthentication();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { isAuthenticated, login, logout };
};

export default useAuth;
