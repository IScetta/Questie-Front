"use client";

import ColumnProfile from "@/app/components/column-profile";
import { IUser } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { getUserById } from "@/helpers/user.helper";
import Link from "next/link";
import { useEffect, useState } from "react";

const Profile = ({ params }: { params: { slug: string } }): JSX.Element => {
  const { slug } = params;
  const { token } = useAuth();

  const [user, setUser] = useState<IUser>({
    id: "",
    username: "",
    password: "",
    email: "",
    profile_pic: "",
    firstName: "",
    lastName: "",
    birthdate: "",
    role: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(slug, token);
        setUser(user);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchUser();
  }, [token, slug]);

  return token ? (
    <div className="flex mx-[11.5rem] justify-center h-full">
      <div>
        <ColumnProfile userInfo={user} />
      </div>
      <div className="ml-10 mt-10 w-full flex flex-col justify-start h-full">
        <h1 className="text-4xl mt-18 font-bold">Continuar con los cursos</h1>
        <div className="flex flex-row w-full bg-blue-gray-50 mt-8 p-8 justify-between items-center rounded">
          <p className="text-xl font-semibold text-start">
            Introducción a la Programación en Python
          </p>
          <Link
            href={`/`}
            className="bg-yellowMain text-purpleMain rounded-md px-4 py-2 text-xl text-end font-semibold"
          >
            Continuar
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center">
      <h1>Debe registrarse e iniciar sesion para ver su perfil</h1>
      <div className="flex flex-row justify-center items-center mt-2 gap-2">
        <Link
          href="/sign-up"
          className="bg-yellowMain hover:bg-yellowMainLight px-4 py-2 rounded font-semibold text-purpleMain"
        >
          Registrarse
        </Link>
        <Link
          href="/sign-in"
          className="bg-yellowMain hover:bg-yellowMainLight px-4 py-2 rounded font-semibold text-purpleMain"
        >
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default Profile;
