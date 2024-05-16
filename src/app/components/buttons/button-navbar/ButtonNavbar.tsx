"use client";

import { useAuth } from "@/context/AuthContext";
import ProfileButton from "./profile-button";
import ToggleButton from "./toggle-button";

const ButtonNavbar: React.FC = (): JSX.Element => {
  const { token } = useAuth();

  return <>{token ? <ProfileButton /> : <ToggleButton />}</>;
};

export default ButtonNavbar;
