"use client";

import { IPayload, IUser } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useEffect, useState } from "react";

const ColumnProfile = ({ userInfo }: { userInfo: IUser }): JSX.Element => {
  const { payload } = useAuth();

  const [payloadParse, setPayloadParse] = useState<IPayload>({
    id: "",
    email: "",
    isAdmin: "",
    sub: "",
    iat: 0,
    exp: 0,
  });

  useEffect(() => {
    const payloadParse = () => {
      if (payload === Object(payload)) {
        setPayloadParse(payload);
      } else {
        setPayloadParse(JSON.parse(payload));
      }
    };
    payloadParse();
  }, [payload]);

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
          <p>Puntos Totales: 0</p>
          <p>Cursos finalizados: 0</p>
          <p>Cursos pendientes: 0</p>
          <p>Experiencia: 0</p>
        </div>
      </div>
    </div>
  );
};

export default ColumnProfile;
