"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import Link from "next/link";

const adminOptions = ["Perfil", "Crear Curso", "Cerrar Sesión"];
const userOptions = ["Perfil", "Cerrar Sesión"];

const ProfileButton = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOptions, setProfileOptions] = useState(userOptions);

  const { token, setToken } = useAuth();

  useEffect(() => {
    token ? setProfileOptions(userOptions) : setProfileOptions([]);
  }, [token]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    toggleMenu();
    Cookies.remove("token");
    setToken(null);
    router.refresh();
    router.push("/");
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <button onClick={toggleMenu}>
        <FaUserCircle className="w-12 h-12 text-yellowMain" />
      </button>
      {isOpen && (
        <div className="absolute w-44 top-14 flex items-center justify-center bg-tertiary text-tertiary shadow-xl rounded-lg bg-purpleMainLight">
          <div className="bg-text rounded-lg p-2">
            <ul className="space-y-2 text-center">
              {(token ? userOptions : [])?.map((option) => (
                <li
                  key={option}
                  onClick={
                    option === "Cerrar Sesión" ? handleLogout : toggleMenu
                  }
                  className="py-2 px-6 hover:bg-tertiary text-textColor hover:bg-purpleMainLighter hover:cursor-pointer transition-colors duration-200"
                >
                  <Link href={option === "Perfil" ? "/profile" : "/"}>
                    {option}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
