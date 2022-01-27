import React, { createContext, useEffect, useState } from "react";
import { getUserLocalStorage, LoginRequest, RegisterRequest, setUserLocalStorage } from "./util";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = getUserLocalStorage()

    if (user) {
      setUser(user)
    }
  }, [])

  async function authenticate(email, password) {
    try {
      const response = await LoginRequest(email, password);

      const payload = { token: response.token, email: email, name: response.user.name };

      setUser(payload);
      setUserLocalStorage(payload);

      return true
    } catch (error) {
      return false
    }
  }

  const setUserU = (payload) => {
    setUser(payload);
    setUserLocalStorage(payload);
  }

  async function registrate(name, email, password) {
    const response = await RegisterRequest(name, email, password)

    if (response && response.error)
      return response

    const payload = { token: response.token, email: email, name: response.user.name }

    setUser(payload)
    setUserLocalStorage(payload)

    return payload
  }

  async function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ ...user, setUserU, authenticate, registrate, logout }}>
      {children}
    </AuthContext.Provider>
  )
};