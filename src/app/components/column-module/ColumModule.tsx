import Link from "next/link";
import modulePreLoad from "@/helpers/modulePreLoad.json";
import { course } from "@/app/types";

const ColumnModule = ({course}: any) => {
  // console.log(course.title)
  // const number = id;
  let numberModule = 1;
  const modules = modulePreLoad.map((module) => module);
  
  return (
    <div className=" justify-center items-center grid grid-cols-1  ">
      <div className="h-full w-80 bg-purpleMainLight col-start-2 col-span-4 px-7">
        <div className="bg-whiteColumn my-5 py-3 mt-10 flex flex-nowrap w-full h-[4.5rem] content-center">
          <div className=" bg-image w-12 h-12 rounded-full ml-3 "></div>
          <div className="flex flex-col ml-3 justify-center">
            <p className="font-bold text-base">{course.title}</p>
            <p className="text-xs font-light">
              Modulos {course.modules.length} - Skills 42
            </p>
          </div>
        </div>

        {modules &&
          course.modules.map((module:any, index:any) => (
            <Link href={`/module/${module.id}`} key={index}>
              <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer">
                <p className="text-xs font-light">Módulo {numberModule++}</p>
                <p className="text-base font-semibold">{module.title}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ColumnModule;
