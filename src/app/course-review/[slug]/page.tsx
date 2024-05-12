import { IoNewspaper } from "react-icons/io5";
import { MdArticle } from "react-icons/md";
import { FaCoins } from "react-icons/fa6";
import { IoIosPhonePortrait } from "react-icons/io";
import { AiFillSafetyCertificate } from "react-icons/ai";

import ColumnCurso from "../../components/column-course";
import Image from "next/image";

import FeaturedCard from "../../components/featured/featured-card";

import { curso } from "@/helpers/categoriesPreLoad";
import { getCourseDB } from "@/helpers/course.helpers";
import HeaderCourse from "@/app/components/course/header-course";
import ModuleCourseCard from "@/app/components/course/module-course-card";

 const secciones = [
  { titulo: "titulo", modulo: "Titulo de la leccion" },
  { titulo: "titulo", modulo: "Titulo de la leccion" },
  { titulo: "titulo", modulo: "Titulo de la leccion" },
  { titulo: "titulo", modulo: "Titulo de la leccion" },
];


const CurseReview = async ({params}:{params: any}) => {
  const {slug} = params;
  const courses = await getCourseDB()
  // console.log(courses)
  const id = slug;
  
  return (
    <div className="flex flex-row mx-[11.5rem] ">
      <div className="flex flex-grow-0">
        <ColumnCurso />
      </div>
      <div className="pb-4">
        <HeaderCourse />
        <div className="flex flex-row w-full h-auto ">
          <div className=" w-[50%] m-6 p-4 bg-white rounded-xl border-2 shadow-[0_5px_15px_0px_#00000042]">
            <h2 className="text-[22px] leading-6 p-2 ">Descripcion</h2>
            <p>
              {curso[0].infoGenral.descriptionText}
            </p>
          </div>

          <div className="w-[50%] m-6 p-4 bg-white rounded-xl border-2 shadow-[0_5px_15px_0px_#00000042]">
            <h2 className="text-[22px] leading-6 ">Este curso incluye:</h2>
            <h3 className="p-2 flex items-center">
              <IoNewspaper className="w-10 h-10 text-purpleMain p-2" /> {curso[id].infoGenral.task} Tareas
            </h3>
            <h3 className="p-2 flex items-center">
              <MdArticle className="w-10 h-10 text-purpleMain p-2" /> {curso[id].infoGenral.article} artículos
            </h3>
            <h3 className="p-2 flex items-center">
              <FaCoins className="w-10 h-10 text-purpleMain p-2" /> {curso[id].infoGenral.coins} puntos
            </h3>
            <h3 className="p-2 flex items-center">
              <IoIosPhonePortrait className="w-10 h-10 text-purpleMain p-2" />{" "}
              Acceso en dispositivos móviles
            </h3>
            <h3 className="p-2 flex items-center">
              <AiFillSafetyCertificate className="w-10 h-10 text-purpleMain p-2" />{" "}
              Certificado de finalización
            </h3>
          </div>
        </div>



        <div className="m-6 py-4 rounded-xl  shadow-[0_5px_15px_0px_#00000042]">
          <ModuleCourseCard curso={curso} id={id}/>
        </div>



        <div className="flex  flex-col  m-6 py-2 w-auto h-[370px] ">
          <h2 className="text-[20px] rounded-lg p-4 my-2 bg-purpleMainLighter">
            Cursos relacionados
          </h2>
          <div className="flex flex-wrap justify-between  ">
            <FeaturedCard />
            <FeaturedCard />
            <FeaturedCard />
          </div>
        </div>

        <div className="flex  flex-col   m-6 py-2 w-auto h-[370px] ">
          <h2 className="text-[20px] rounded-lg p-4 my-2 bg-purpleMainLighter">
            Cursos valorados
          </h2>
          <div className="flex flex-wrap justify-between  ">
            <FeaturedCard />
            <FeaturedCard />
            <FeaturedCard />
          </div>
        </div>

        {/* <FeaturedCarousel/> */}
      </div>
    </div>
  );
};

export default CurseReview;
