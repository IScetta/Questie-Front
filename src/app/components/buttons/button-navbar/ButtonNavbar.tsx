"use client";

import { useAuth } from "@/context/AuthContext";
import ProfileButton from "./profile-button";
import ToggleButton from "./toggle-button";
import { useUser } from "@auth0/nextjs-auth0/client";

const ButtonNavbar: React.FC = (): JSX.Element => {
  const { token } = useAuth();
  const { user } = useUser();

  return <>{token || user ? <ProfileButton /> : <ToggleButton />}</>;
};

export default ButtonNavbar;
