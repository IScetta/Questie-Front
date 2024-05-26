"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { IPayload, IStats, IUser } from "@/app/types";
import { GiTwoCoins } from "react-icons/gi";
import { getUserById } from "@/helpers/user.helper";
import { useUserContext } from "@/context/UserContext";

const adminOptions = ["Perfil", "Crear Curso", "Cerrar Sesión"];
const userOptions = ["Perfil", "Facturas", "Cerrar Sesión"];

const ProfileButton: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { userStats, fetchUserStats } = useUserContext();

  const [isOpen, setIsOpen] = useState(false);
  const [profileOptions, setProfileOptions] = useState(userOptions);
  const [payloadParsed, setPayloadParse] = useState<IPayload>({
    id: "",
    email: "",
    isAdmin: "",
    sub: "",
    iat: 0,
    exp: 0,
  });

  const { token, setToken, payload } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const payloadParse = async () => {
      if (payload === Object(payload)) {
        setPayloadParse(payload);
      } else {
        setPayloadParse(JSON.parse(payload));
      }
    };
    payloadParse();
  }, [payload, token]);

  useEffect(() => {
    token || user ? setProfileOptions(userOptions) : setProfileOptions([]);
  }, [token, user]);

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
          <div className="absolute w-44 top-14 flex items-center justify-center bg-tertiary text-tertiary shadow-xl rounded-lg bg-purpleMainLight">
            <div className="bg-text rounded-lg p-2">
              <ul className="space-y-2 text-center">
                {(token || user ? userOptions : [])?.map((option) => (
                  <li
                    key={option}
                    onClick={
                      option === "Cerrar Sesión" ? handleLogout : toggleMenu
                    }
                    className="py-2 px-6 hover:bg-tertiary text-textColor hover:bg-purpleMainLighter hover:cursor-pointer transition-colors duration-200"
                  >
                    <Link
                      href={
                        option === "Perfil"
                          ? `/profile/${payloadParsed?.id}`
                          : option === "Facturas"
                          ? "/invoices"
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
