import { DatoNuevoCurso } from "@/helpers/categoriesPreLoad";
import Image from "next/image";



const HeaderCourse = ({course}:any) => {
  
  return (
    <div className="">
      <div className="flex flex-row bg-gray-900 ">
        <div className="flex flex-col m-4 text-white">
          <h1 className="text-5xl m-4 backdrop-blur-sm">
            {course.infoGenral.title}
          </h1>
          <p className="text-lg ml-6">
            {course.infoGenral.descriptionTitle}
          </p>
          <button className="bg-yellowMain text-purpleMain text-base font-semibold cursor-pointer px-4 py-2 rounded-lg">
            Iniciar Curso
          </button>
        </div>
        <div className="flex justify-center items-center p-4">
          <Image
            className=" rounded-2xl border-2 border-yellowMain"
            src={course.infoGenral.imageCurse}
            alt="video"
            width={400}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderCourse;
