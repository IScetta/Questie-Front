"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserById } from "@/helpers/user.helper";
import { IUser, IStats, IPayload } from "@/app/types";
import { useAuth } from "./AuthContext";

interface UserContextProps {
  userStats: IStats | undefined;
  setUserStats: React.Dispatch<React.SetStateAction<IStats | undefined>>;
  fetchUserStats: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface IUserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<IUserProviderProps> = ({ children }) => {
  const [userStats, setUserStats] = useState<IStats | undefined>({
    coins: 0,
    xp: 0,
    user: "",
  });

  const { token, payload } = useAuth();

  const fetchUserStats = async () => {
    if (payload) {
      let parsedPayload: IPayload | null;

      try {
        parsedPayload =
          typeof payload === "string" ? JSON.parse(payload) : payload;
      } catch (error) {
        console.error("Error parsing payload:", error);
        return;
      }

      if (parsedPayload === null) return;

      const user: IUser = await getUserById(parsedPayload.id, token);
      setUserStats(user.stats);
    }
  };

  useEffect(() => {
    fetchUserStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload, token]);

  return (
    <UserContext.Provider value={{ userStats, setUserStats, fetchUserStats }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
