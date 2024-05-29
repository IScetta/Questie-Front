"use client";

import { ICourse, ILesson, IModule } from "@/app/types";
import { getCourseByIdDB } from "@/helpers/course.helpers";
import { getModuleById } from "@/helpers/module.helper";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ColumnLesson: React.FC<{
  moduleid: string;
  allLessons: ILesson[];
}> = ({
  moduleid,
  allLessons,
}: {
  moduleid: string;
  allLessons: ILesson[];
}): JSX.Element => {
  const [moduleById, setModuleById] = useState<IModule>();
  const [courseById, setCourseById] = useState<ICourse>();

  useEffect(() => {
    const getModule = async () => {
      const getOneModuleById = await getModuleById(moduleid);
      setModuleById(getOneModuleById);
      if (moduleById?.course?.id) {
        const courseById = await getCourseByIdDB(moduleById?.course?.id);
        setCourseById(courseById);
      }
    };
    getModule();
  }, [moduleById, moduleid]);

  const totalXP = allLessons.reduce((acc: number, lesson: ILesson) => {
    return acc + lesson.xp;
  }, 0);
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
                Lecciones: {moduleById?.lessons?.length} - Experiencia:{" "}
                {totalXP}
              </p>
            </div>
          </div>
        </Link>

        {moduleById?.lessons?.length && moduleById?.lessons?.length > 0 ? (
          moduleById?.lessons?.map((lesson: any, index: any) => (
            <Link href={`/lesson/${lesson.id}`} key={index}>
              <div className="bg-purpleMainMedium mb-4 hover:bg-yellowMain pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer text-white hover:text-purpleMain transition-colors duration-200 rounded-lg">
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
