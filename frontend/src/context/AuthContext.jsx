import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchCurrentUser() {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setLoading(false);
        return;
      }

      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setUser(response.data.data.user);
    } catch (error) {
      localStorage.removeItem("accessToken");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
