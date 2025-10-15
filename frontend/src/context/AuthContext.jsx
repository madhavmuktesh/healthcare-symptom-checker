import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import the decoder

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);

  // Effect to decode token when the app loads or token changes
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        const decodedUser = jwtDecode(storedToken);
        setUser(decodedUser);
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Invalid token:", error);
      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
    }
  }, []);

  const login = (newToken) => {
    try {
      localStorage.setItem('authToken', newToken);
      const decodedUser = jwtDecode(newToken);
      setUser(decodedUser);
      setToken(newToken);
    } catch (error) {
      console.error("Failed to decode new token:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = !!token;

  // Provide the user object in the context's value
  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};