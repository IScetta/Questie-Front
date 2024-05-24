import { ICourse } from "@/app/types";
import Link from "next/link";

const AdminCourses = ({ courses }: { courses: ICourse[] }) => {
  return (
    <div>
      {courses.map((course:ICourse,index:number) => (
        <div key={index} className="w-full bg-blue-gray-50 mt-8 text-start p-8">
          <p className="text-xl font-semibold">{course.title}</p>

          <div className="flex flex-grow justify-between">
            <p className="text-sm mt-2">Cantidad de alumnos:</p>
            <Link href={`/admin/create-module/${course.id}`} className="flex justify-center items-center bg-yellowMain text-purpleMain h-10 w-44 ml-7 text-lg">
              Editar Curso
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminCourses;
