import { getCourseByIdDB } from "@/helpers/course.helpers";
import Link from "next/link";
import styles from "./ColumnModule.module.css";
import ColumnModuleMobile from "./ColumnModuleMobile";
import { ICourse, ILesson, IModule } from "@/app/types";
import Image from "next/image";

const ColumnModule: React.FC<{ courseid: string }> = async ({
  courseid,
}: {
  courseid: string;
}): Promise<JSX.Element> => {
  let numberModule = 1;
  const course: ICourse = await getCourseByIdDB(courseid);

  const totalXP = course.modules.reduce((acc: number, module: IModule) => {
    const moduleXP = module.lessons.reduce(
      (lessonAcc: number, lesson: ILesson) => {
        return lessonAcc + lesson.xp;
      },
      0
    );
    return acc + moduleXP;
  }, 0);

  return (
    <div
      className={` justify-center items-center grid grid-cols-1 ${styles["ColumnModuleContainer"]}`}
    >
      <div
        className={`h-full w-80 bg-purpleMainLight col-start-2 col-span-4 px-7 ${styles["ColumnModule"]}`}
      >
        <Link href={`/course-review/${courseid}`}>
          <div
            className={`bg-purpleMain my-5 py-3 mt-10 flex flex-nowrap w-full h-[4.5rem] content-center rounded-lg hover:bg-yellowMain hover:text-purpleMain ${styles["CourseTitle"]}`}
          >
            <div className="bg-image w-12 h-12 rounded-full ml-2">
              <Image
                src={course.image}
                alt={course.title}
                width={1000}
                height={1000}
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="flex flex-col ml-2 justify-center w-[12.5rem]">
              <p className="font-bold text-base line-clamp-1">{course.title}</p>
              <p className="text-xs font-light">
                Modulos: {course.modules.length} - Experiencia: {totalXP}
              </p>
            </div>
          </div>
        </Link>

        {course.modules.length > 0 ? (
          course.modules.map((module: any, index: any) => (
            <Link href={`/module/${module.id}`} key={index}>
              <div
                className={`bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer rounded-lg ${styles["ModuleButton"]}`}
              >
                <p className="text-xs font-light">Módulo {numberModule++}</p>
                <p className="text-base font-semibold line-clamp-1">
                  {module.title}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer">
            <p>No hay módulos</p>
          </div>
        )}
      </div>
      <ColumnModuleMobile course={course} />
    </div>
  );
};

export default ColumnModule;
