import { course } from "@/app/types";
import { DatoNuevoCurso } from "@/helpers/categoriesPreLoad";
import Image from "next/image";
import Link from "next/link";



const HeaderCourse = ({course}:any) => {
  
  return (
    <div className="">
      <div className="flex flex-row bg-gray-900  justify-center">
        <div className="flex flex-col m-4 text-white">
          <h1 className="text-5xl m-4 backdrop-blur-sm">
            {course.title}
          </h1>
          <p className="text-lg my-2 ml-6">
            {course.headline}
          </p>
          <Link  href={`/module/${course.modules[0].id}`} className="flex justify-center bg-yellowMain text-purpleMain text-base font-semibold cursor-pointer px-4 py-2 rounded-lg">
            Iniciar Curso
          </Link>
        </div>
        <div className="flex justify-center items-center p-4">
          <Image
            className=" rounded-2xl border-2 border-yellowMain "
            src={course.image}
            alt="video"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderCourse;
