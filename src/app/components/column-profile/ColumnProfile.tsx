"use client";

import { IEnrolment, IPayload, IProgress, IUser } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { useUserContext } from "@/context/UserContext";
import { getEnrolmentsByUser } from "@/helpers/enrolments.helper";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ProgressData {
  totalLessons: number;
  completedLessons: number;
  remainingLessons: number;
}

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
  const { token, payload } = useAuth();
  const { userStats } = useUserContext();
  const [payloadParsed, setPayloadParsed] = useState<IPayload | null>(null);
  const [finishedCourses, setFinishedCourses] = useState<number>(0);

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
    const fetchProgress = async () => {
      try {
        const userEnrolments: IEnrolment[] | null = await getEnrolmentsByUser(
          token!,
          payloadParsed?.id!
        );

        userEnrolments?.forEach(async (enrolments) => {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}progress/course/${
              enrolments.course
            }/user/${payloadParsed?.id!}`
          );

          if (response.status === 200) {
            const progress: ProgressData = response.data;
            if (progress.totalLessons > 0 && progress.remainingLessons === 0) {
              setFinishedCourses((prev) => prev + 1);
            }
          }
        });
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    if (payloadParsed) fetchProgress();
  }, [payloadParsed, token]);

  console.log(userInfo.profile_pic);

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
          <p>Cursos finalizados: {finishedCourses}</p>
          <p>Cursos pendientes: {userCourses.length - finishedCourses}</p>
          <p>Puntos Totales: {userStats?.coins || 0}</p>
          <p>Experiencia: {userStats?.xp || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default ColumnProfile;
