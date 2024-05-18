"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface IAuthContext {
  token: string | null;
  payload: any | null; // Nuevo campo para almacenar el payload
  setToken: (token: string | null, payload: any | null) => void; // Actualizado para aceptar payload
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({
  token: null,
  payload: null, // Inicializado a null
  setToken: () => {},
});

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [payload, setPayload] = useState<any | null>(null); // Estado para almacenar el payload

  const getTokenFromCookies = () => {
    const token = Cookies.get("token");
    const payload = Cookies.get("payload"); // Obtener el payload de las cookies
    return { token, payload };
  };

  const setTokenInCookies = (token: string | null, payload: any | null) => {
    if (token) {
      Cookies.set("token", token, {
        secure: true,
        sameSite: "strict",
        expires: 1 / 12, // Elimina el token dentro de 2 horas
      });

      if (payload) {
        //Validate payload is an object
        if (typeof payload !== "object") {
          Cookies.set("payload", payload, {
            secure: true,
            sameSite: "strict",
            expires: 1 / 12, // También guarda el payload
          });
        } else {
          Cookies.set("payload", JSON.stringify(payload), {
            secure: true,
            sameSite: "strict",
            expires: 1 / 12, // También guarda el payload
          });
        }
      }
    } else {
      Cookies.remove("token");
      Cookies.remove("payload"); // Elimina el payload si el token se elimina
    }
  };

  const setToken = (token: string | null, payload: any | null) => {
    setTokenState(token);
    setPayload(payload); // Actualizar el estado del payload
  };

  useEffect(() => {
    const { token, payload } = getTokenFromCookies();
    if (token && payload) {
      setToken(token, payload); // Establecer el token y el payload desde las cookies
    }
  }, []);

  useEffect(() => {
    setTokenInCookies(token, payload); // Actualizar las cookies cuando cambia el token o el payload
  }, [token, payload]);

  return (
    <AuthContext.Provider value={{ token, payload, setToken }}>
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
