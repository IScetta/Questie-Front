"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import ProfileButton from "./profile-button";
import ToggleButton from "./toggle-button";
import { useUser } from "@auth0/nextjs-auth0/client";
import saveUserDB from "@/helpers/saveUserDB.helper";
import { useUserContext } from "@/context/UserContext";
import router from "next/router";

const ButtonNavbar: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { token } = useAuth();
  const { setToken } = useAuth();

  useEffect(() => {
    const loadUser = async () => {
      if (user) {
        try {
          const res = await saveUserDB(user);
          if (
            res &&
            (res.status === 200 || res.data.message === "Login successful")
          ) {
            const token = res.data.token; // Reemplaza esto con tu token JWT

            // Dividir el token en sus partes (encabezado, carga útil y firma)
            const parts = token.split(".");
            const payload = JSON.parse(atob(parts[1]));
            res.data.payload = payload;

            setToken(res.data.token, res.data.payload);
            router.push("/");
            return;
          } else {
            throw new Error("Failed to login");
          }
        } catch (error) {
          console.error("Error saving user:", error);
        }
      } else {
        setLoading(false);
      }
    };
    loadUser();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{token || user ? <ProfileButton /> : <ToggleButton />}</>;
};

export default ButtonNavbar;
