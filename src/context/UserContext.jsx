import { createContext, useCallback, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  const login = async (email, password) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      setToken(data.token);
      setEmail(data.email);
    }

    return data;
  };

  const register = async (email, password) => {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      setToken(data.token);
      setEmail(data.email);
    }

    return data;
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
  };

  const getProfile = useCallback(async () => {
    const response = await fetch("http://localhost:5000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.email) {
      setEmail(data.email);
    }

    return data;
  }, [token]);

  return (
    <UserContext.Provider
      value={{ token, email, login, register, logout, getProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
