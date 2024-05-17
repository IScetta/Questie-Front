"use client";

import { useAuth } from "@/context/AuthContext";
import Login from "../auth/login";

const LandingLogin = () => {
  const { token } = useAuth();

  return <>{token ? <></> : <Login />}</>;
};

export default LandingLogin;
