import { FaCaretDown } from "react-icons/fa";
import ColumnAdmin from "../components/column-admin";

const adimDashborad = () => {
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

        <div className="w-full bg-blue-gray-50 mt-8 text-start p-8">
          <p className="text-xl font-semibold">Titulo del curso</p>

          <div className="flex flex-grow justify-between">
            <p className="text-sm mt-2">Cantidad de alumnos:</p>
            <button className="bg-yellowMain text-purpleMain h-10 w-44 ml-7 text-lg">
              edit curso
            </button>
          </div>
        </div>
        <div className="w-full bg-blue-gray-50 mt-8 text-start p-8">
          <p className="text-xl font-semibold">Titulo del curso</p>
          <div className="flex flex-grow justify-between">
            <p className="text-sm mt-2">Cantidad de alumnos:</p>
            <button className="bg-yellowMain text-purpleMain h-10 w-44 ml-7 text-lg">
              edit curso
            </button>
          </div>
        </div>
        <div className="w-full bg-blue-gray-50 mt-8 text-start p-8">
          <p className="text-xl font-semibold">Titulo del curso</p>
          <div className="flex flex-grow justify-between">
            <p className="text-sm mt-2">Cantidad de alumnos:</p>
            <button className="bg-yellowMain text-purpleMain h-10 w-44 ml-7 text-lg">
              edit curso
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default adimDashborad;
