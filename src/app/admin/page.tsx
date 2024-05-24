
import { FaCaretDown } from "react-icons/fa";
import ColumnAdmin from "../components/column-admin";
import { ICourse } from "../types";
import { getCoursesDB } from "@/helpers/course.helpers";
import AdminCourses from "../components/dashboard-admin/admin-courses";

const adimDashborad = async () => {
  const courses:ICourse[] = await getCoursesDB()

  return (
    <div className="flex mx-[11.5rem] justify-center h-full">
      <div className="flex flex-grow-0">
        <ColumnAdmin />
      </div>
      <div className="ml-10 mt-10 w-full flex flex-col justify-start h-full mb-8">
       
        <div className="flex justify-evenly ">
          <button className="bg-yellowMain text-purpleMain h-10 w-52 ml-7 text-lg mt-5">
            <p>Categorias </p>
          </button>

          <button className="bg-yellowMain text-purpleMain h-10 w-52 ml-7 text-lg mt-5">
            <p>Alumnos inscriptos</p>
          </button>
        </div>

        <AdminCourses courses={courses}/>
      
    </div>
    </div>
  );
};

export default adimDashborad;
