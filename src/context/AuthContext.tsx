"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

interface IAuthContext {
  token: string | null;
  setToken: (token: string | null) => void;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext>({
  token: null,
  setToken: () => {},
});

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const getTokenFromCookies = () => {
    return Cookies.get("token") || null;
  };

  useEffect(() => {
    const token = getTokenFromCookies();
    if (token) {
      setToken(token);
    }
  }, []);

  const setTokenInCookies = (token: string | null) => {
    if (token) {
      Cookies.set("token", token, {
        secure: true,
        sameSite: "strict",
        expires: 1 / 12, // Elimina el token dentro de 2 horas
      });
    } else {
      Cookies.remove("token");
    }
  };

  useEffect(() => {
    setTokenInCookies(token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

//! FUNCIONES AUXILIARES (USAR SOLO SI ES NECESARIO)
// useEffect(() => {
//   const token = Cookies.get("token");
//   if (token) {
//     setToken(token);
//   }
// }, []);

// useEffect(() => {
//   if (token) {
//     Cookies.set("token", token, {
//       secure: true,
//       sameSite: "strict",
//       expires: 1 / 12,
//     });
//   } else {
//     Cookies.remove("token");
//   }
// }, [token]);
