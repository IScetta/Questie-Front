"use client";

import { IEnrolment, IPayload, IUser } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { useUserContext } from "@/context/UserContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ColumnProfile: React.FC<{
  userInfo: IUser;
  userCourses: IEnrolment[];
}> = ({
  userInfo,
  userCourses,
}: {
  userInfo: IUser;
  userCourses: IEnrolment[];
}): JSX.Element => {
  const { payload } = useAuth();
  const { userStats } = useUserContext();

  const [payloadParsed, setPayloadParsed] = useState<IPayload | null>(null);

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
          <p>Cursos finalizados: ?</p>
          <p>Cursos pendientes: {userCourses.length}</p>
          <p>Puntos Totales: {userStats?.coins || 0}</p>
          <p>Experiencia: {userStats?.xp || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default ColumnProfile;
