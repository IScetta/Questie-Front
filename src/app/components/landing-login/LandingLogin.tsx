"use client";

import { useAuth } from "@/context/AuthContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import Login from "../auth/login";

const LandingLogin = () => {
  const { token } = useAuth();
  const { user } = useUser();

  return <>{token || user ? <></> : <Login />}</>;
};

export default LandingLogin;
