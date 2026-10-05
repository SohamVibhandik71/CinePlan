import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// =====================================================
// SAFE STORAGE HELPERS
// =====================================================

const getStoredItem = (key) => {
  const localValue = localStorage.getItem(key);

  if (localValue && localValue !== "undefined") {
    return localValue;
  }

  const sessionValue = sessionStorage.getItem(key);

  if (sessionValue && sessionValue !== "undefined") {
    return sessionValue;
  }

  return null;
};

const getStoredUser = () => {
  const storedUser = getStoredItem("user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Invalid stored user data:", error);

    // Remove corrupted data
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    return null;
  }
};

// =====================================================
// AUTH PROVIDER
// =====================================================

export const AuthProvider = ({ children }) => {
  // ================= USER =================

  const [user, setUser] = useState(() => {
    return getStoredUser();
  });

  // ================= TOKEN =================

  const [token, setToken] = useState(() => {
    return getStoredItem("token");
  });

  // =====================================================
  // LOGIN
  // =====================================================

  const login = (userData, authToken, rememberMe = false) => {
    setUser(userData || null);
    setToken(authToken || null);

    // Clear previous authentication data first
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");

    if (!authToken) {
      console.error("No authentication token received.");
      return;
    }

    const storage = rememberMe ? localStorage : sessionStorage;

    // Store token
    storage.setItem("token", authToken);

    // Only store user if it actually exists
    if (userData) {
      storage.setItem("user", JSON.stringify(userData));
    }
  };

  // =====================================================
  // SIGNUP
  // =====================================================

  const signup = (userData, authToken, rememberMe = true) => {
    login(userData, authToken, rememberMe);
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  // =====================================================
  // AUTH STATUS
  // =====================================================

  const isAuthenticated = !!token;

  // =====================================================
  // CONTEXT
  // =====================================================

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =====================================================
// CUSTOM HOOK
// =====================================================

export const useAuth = () => {
  return useContext(AuthContext);
};
