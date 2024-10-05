// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import api from "../api/api";
import {jwtDecode} from 'jwt-decode';  // Corrected import
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from local storage if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
    setLoading(false);
  }, []);

  // Login user
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:7890/api/users/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  // Register user
  const register = async (username, email, password) => {
    try {
      const response = await axios.post("http://localhost:7890/api/users/register", {
        username,
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
