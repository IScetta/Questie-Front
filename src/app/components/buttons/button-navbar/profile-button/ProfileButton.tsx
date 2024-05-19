"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { IPayload } from "@/app/types";

const adminOptions = ["Perfil", "Crear Curso", "Cerrar Sesión"];
const userOptions = ["Perfil", "Cerrar Sesión"];

const ProfileButton: React.FC = (): JSX.Element => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [profileOptions, setProfileOptions] = useState(userOptions);
  const [payloadParse, setPayloadParse] = useState<IPayload>({
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
  }, [payload]);

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
    <div className="relative flex flex-col items-center justify-center">
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
                      option === "Perfil" ? `/profile/${payloadParse?.id}` : "/"
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
  );
};

export default ProfileButton;
