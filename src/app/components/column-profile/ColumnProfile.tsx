"use client";

import { IUser } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const ColumnProfile = ({ userInfo }: { userInfo: IUser }) => {
  const { payload } = useAuth();
  const payloadParse = JSON.parse(payload);

  // console.log(payloadParse);

  return (
    <div className="h-full w-80 bg-purpleMainLight p-7 flex flex-col justify-start items-center">
      <div className="bg-image rounded-full h-52 w-52 my-6 content-center justify-items-center">
        {userInfo.profile_pic && (
          <Image
            src={userInfo.profile_pic}
            alt="profile"
            width={1000}
            height={1000}
            className="rounded-full"
          />
        )}
      </div>
      <button className="bg-yellowMain text-purpleMain h-10 w-52 text-lg font-semibold">
        Editar Perfil
      </button>
      <div className="text-lg text-center my-5">
        <p className="text-2xl font-semibold mb-4">
          {userInfo.firstName} {userInfo.lastName}
        </p>
        <div className="flex flex-col text-center gap-2">
          <p>Puntos Totales: {}</p>
          <p>Cursos finalizados: {}</p>
          <p>Cursos pendientes: {}</p>
          <p>Experiencia: {}</p>
        </div>
      </div>
    </div>
  );
};

export default ColumnProfile;
