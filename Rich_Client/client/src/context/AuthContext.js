import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          console.log("Verifying token...");
          const response = await fetch("http://localhost:4567/auth/verify", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          console.log("Token verification response:", data);

          if (response.ok && data.user) {
            console.log("Token valid, setting user:", data.user);
            setUser(data.user);
          } else {
            console.log("Token invalid or missing user data:", data);
            localStorage.removeItem("token");
            setUser(null);
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  const login = async (token, userData) => {
    console.log("Login called with:", { token, userData });

    // Validate both token and user data
    if (!token) {
      console.error("Missing token");
      return;
    }

    if (!userData || !userData.id || !userData.email) {
      console.error("Invalid user data", userData);
      return;
    }

    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
