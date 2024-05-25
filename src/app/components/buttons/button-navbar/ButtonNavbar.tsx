"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import ProfileButton from "./profile-button";
import ToggleButton from "./toggle-button";
import { useUser } from "@auth0/nextjs-auth0/client";
import saveUserDB from "@/helpers/saveUserDB.helper";

const ButtonNavbar: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const { user: auth0User } = useUser();
  const { token } = useAuth();
  const { setToken } = useAuth();

  useEffect(() => {
    const loadUser = async () => {
      if (auth0User) {
        try {
          const res = await saveUserDB(auth0User);
          setLoading(false);
          setToken(res?.data.token, res?.data.userExists);
        } catch (error) {
          console.error("Error saving user:", error);
        }
      } else {
        setLoading(false);
      }
    };

    loadUser();
  }, [auth0User]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{token || auth0User ? <ProfileButton /> : <ToggleButton />}</>;
};

export default ButtonNavbar;
