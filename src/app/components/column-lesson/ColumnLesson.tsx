"use client";

import { ICourse, ILesson, IModule, IPayload, IProgress } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { getCourseByIdDB } from "@/helpers/course.helpers";
import { getLessonsFinishedByUser } from "@/helpers/lesson.helper";
import { getModuleById } from "@/helpers/module.helper";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ColumnLesson: React.FC<{
  moduleId: string;
  allLessons: ILesson[];
}> = ({
  moduleId,
  allLessons,
}: {
  moduleId: string;
  allLessons: ILesson[];
}): JSX.Element => {
  const [moduleById, setModuleById] = useState<IModule>();
  const [courseById, setCourseById] = useState<ICourse>();
  const [finishedLessons, setFinishedLessons] = useState<string[] | null>(null);
  const { payload } = useAuth();

  useEffect(() => {
    const getModuleAndCourse = async () => {
      try {
        const moduleData = await getModuleById(moduleId);
        setModuleById(moduleData);

        if (moduleData?.course?.id) {
          const courseData = await getCourseByIdDB(moduleData.course.id);
          setCourseById(courseData);
        }

        const parsedPayload: IPayload | undefined =
          typeof payload === "string" ? JSON.parse(payload) : payload;

        if (!parsedPayload) {
          console.log("El payload está indefinido.");
          return;
        }

        const finishedLessonsResponse = await getLessonsFinishedByUser(
          parsedPayload.id
        );

        if (finishedLessonsResponse) {
          const mapFinishLesson: string[] = finishedLessonsResponse.map(
            (progress: IProgress) => progress.lessonId
          );
          setFinishedLessons(mapFinishLesson);
        }
      } catch (error) {
        console.error("Error al obtener el módulo o curso:", error);
      }
    };
    if (!finishedLessons) getModuleAndCourse();
  }, [moduleId, payload, finishedLessons]);

  let numberLesson = 1;

  return (
    <div className="justify-center items-center grid grid-cols-1">
      <div className="h-full w-80 bg-purpleMainLight col-start-2 col-span-4 px-7">
        <Link href={`/module/${moduleById?.id}`}>
          <div className="bg-purpleMain hover:bg-yellowMain my-5 py-3 mt-10 flex flex-nowrap w-full h-[4.5rem] content-center text-white hover:text-purpleMain transition-colors duration-200 rounded-lg">
            <div className="bg-image w-12 h-12 rounded-full ml-2">
              <Image
                src={courseById?.image || "/"}
                alt={moduleById?.title || ""}
                width={1000}
                height={1000}
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="flex flex-col ml-2 justify-center w-[12.5rem]">
              <p className="font-bold text-base line-clamp-1">
                {moduleById?.title}
              </p>
              <p className="text-xs font-light">
                Lecciones: {moduleById?.lessons?.length || 0} - Experiencia:{" "}
                {allLessons.reduce((acc, lesson) => acc + lesson.xp, 0)}
              </p>
            </div>
          </div>
        </Link>

        {moduleById?.lessons?.length && moduleById?.lessons?.length > 0 ? (
          moduleById?.lessons?.map((lesson: any, index: any) => (
            <Link href={`/lesson/${lesson.id}`} key={index}>
              <div
                className={`mb-4 pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer transition-colors duration-200 rounded-lg ${
                  finishedLessons && finishedLessons.includes(lesson.id)
                    ? "bg-yellowMain text-purpleMain"
                    : "bg-purpleMainMedium  hover:bg-yellowMain text-white  hover:text-purpleMain"
                }`}
              >
                <p className="text-xs font-light">Lección {numberLesson++}</p>
                <p className="text-base font-semibold line-clamp-1">
                  {lesson.title}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="bg-purpleMainMedium mb-4 hover:bg-yellowMain pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer text-white hover:text-purpleMain transition-colors duration-200">
            <p>No hay lecciones</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColumnLesson;
