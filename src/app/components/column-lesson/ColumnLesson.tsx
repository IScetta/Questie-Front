import { getModuleById } from "@/helpers/module.helper";
import Link from "next/link";

const ColumnLesson = async ({ moduleid }: { moduleid: string }) => {
  const moduleById = await getModuleById(moduleid);
  let numberLesson = 1;

  return (
    <div className="justify-center items-center grid grid-cols-1">
      <div className="h-full w-80 bg-purpleMainLight col-start-2 col-span-4 px-7">
        <div className="bg-whiteColumn my-5 py-3 mt-10 flex flex-nowrap w-full h-[4.5rem] content-center">
          <div className="bg-image w-12 h-12 rounded-full ml-3"></div>
          <div className="flex flex-col ml-3 justify-center">
            <p className="font-bold text-base">{moduleById.title}</p>
            <p className="text-xs font-light">
              Lecciones {moduleById.lessons.length} - Skills 42
            </p>
          </div>
        </div>
        {moduleById.lessons.length > 0 ? (
          moduleById.lessons.map((lesson: any, index: any) => (
            <Link href={`/lesson/${lesson.id}`} key={index}>
              <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer">
                <p className="text-xs font-light">Módulo {numberLesson++}</p>
                <p className="text-base font-semibold">{lesson.title}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer">
            <p>No hay módulos</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColumnLesson;
