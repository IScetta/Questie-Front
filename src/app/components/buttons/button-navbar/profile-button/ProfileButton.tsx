"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import Link from "next/link";
import { IPayload } from "@/app/types";
import { GiTwoCoins } from "react-icons/gi";
import { useUserContext } from "@/context/UserContext";

const adminOptions = ["Perfil", "Crear Curso", "Cerrar Sesión"];
const userOptions = ["Perfil", "Facturas", "Cerrar Sesión"];

const ProfileButton: React.FC = (): JSX.Element => {
  const { token, setToken, payload } = useAuth();
  const { userStats, fetchUserStats } = useUserContext();

  const [payloadParsed, setPayloadParsed] = useState<IPayload | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [profileOptions, setProfileOptions] = useState(userOptions);

  const router = useRouter();

  useEffect(() => {
    const payloadParse = () => {
      if (payload) {
        if (typeof payload === "string") {
          try {
            const parsedPayload = JSON.parse(payload);
            setPayloadParsed(parsedPayload);
          } catch (error) {
            console.error("Error parsing payload:", error);
          }
        } else {
          setPayloadParsed(payload);
        }
      }
    };
    payloadParse();
  }, [payload]);

  useEffect(() => {
    if (
      (token && payloadParsed?.isAdmin === "user") ||
      payloadParsed?.role === "user"
    ) {
      setProfileOptions(userOptions);
    } else if (
      (token && payloadParsed?.isAdmin === "admin") ||
      payloadParsed?.role === "admin"
    ) {
      setProfileOptions(adminOptions);
    }
  }, [token, payloadParsed]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    toggleMenu();
    Cookies.remove("token");
    setToken(null, null);
    router.refresh();
    router.push("/");
    router.push("/api/auth/logout");
  };

  return (
    <div className="flex items-center justify-center space-x-6">
      <div className="text-yellowMain p-1 rounded-full relative select-none">
        <GiTwoCoins className="w-12 h-12" />
        <div className="absolute top-8 right-0 text-xs text-center w-5 h-5 flex items-center justify-center font-bold drop-shadow-[2px_2px_2px_rgba(0,0,0,1)]">
          <span className="bg-purpleMain p-1 rounded-full border border-yellowMain">
            {userStats ? userStats.coins : "?"}
          </span>
        </div>
      </div>
      <div className="relative flex items-center justify-center">
        <button onClick={toggleMenu}>
          <FaUserCircle className="w-12 h-12 text-yellowMain" />
        </button>
        {isOpen && (
          <div className="absolute w-44 top-[4.25rem] flex items-center justify-center bg-tertiary rounded-lg bg-purpleMainLight shadow-[0_5px_15px_0px_#00000042]">
            <div className="bg-text rounded-lg p-2">
              <ul className="space-y-2 text-center">
                {profileOptions?.map((option, index) => (
                  <li
                    key={index}
                    onClick={
                      option === "Cerrar Sesión" ? handleLogout : toggleMenu
                    }
                    className="py-2 px-6 hover:bg-tertiary text-textColor hover:bg-purpleMainLighter hover:cursor-pointer rounded-lg transition-colors duration-200"
                  >
                    <Link
                      href={
                        payloadParsed?.role === "user" ||
                        payloadParsed?.isAdmin === "user"
                          ? option === "Perfil"
                            ? `/profile/${payloadParsed?.id}`
                            : option === "Facturas"
                            ? "/invoices"
                            : "/"
                          : payloadParsed?.role === "admin" ||
                            payloadParsed?.isAdmin === "admin"
                          ? option === "Perfil"
                            ? `/admin`
                            : option === "Crear Curso"
                            ? "/admin/create-course"
                            : "/"
                          : "/"
                      }
                    >
                      {option}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileButton;
