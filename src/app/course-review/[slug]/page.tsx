import { IoNewspaper } from "react-icons/io5";
import { MdArticle } from "react-icons/md";
import { FaCoins } from "react-icons/fa6";
import { IoIosPhonePortrait } from "react-icons/io";
import { AiFillSafetyCertificate } from "react-icons/ai";
import ColumnModule from "../../components/column-module";
import { DatoNuevoCurso } from "@/helpers/categoriesPreLoad";
import { getCourseByIdDB, getCoursesDB } from "@/helpers/course.helpers";
import HeaderCourse from "@/app/components/course/header-course";
import ModuleCourseCard from "@/app/components/course/module-course-card";
import { ICourse } from "@/app/types";
import Slider from "@/app/components/slider";

const CurseReview = async ({ params }: { params: any }) => {
  const { slug } = params;
  const courses: ICourse[] = await getCoursesDB();
  const course: ICourse = await getCourseByIdDB(slug);
  const curso = DatoNuevoCurso;

  return (
    <div className="flex flex-row md:mx-[11.5rem] ">
      <div className="md:flex md:flex-grow-0">
        <ColumnModule courseid={slug} />
      </div>
      <div className=" pb-4 justify-center">
        <HeaderCourse course={course} />
        <div className="flex flex-col md:flex-row w-full h-auto ">
          <div className=" w-4/5 md:w-[50%] m-6 p-4 bg-white rounded-xl border-2 shadow-[0_5px_15px_0px_#00000042]">
            <h2 className="text-[19px] md:text-[22px] leading-6 p-2 ">
              Descripcion
            </h2>
            <p>{course.description}</p>
          </div>

          <div className="w-4/5 md:w-[50%] m-6 p-4 bg-white rounded-xl border-2 shadow-[0_5px_15px_0px_#00000042]">
            <h2 className="text-[22px] leading-6 ">Este curso incluye:</h2>
            <h3 className="p-2 flex items-center">
              <IoNewspaper className="w-10 h-10 text-purpleMain p-2" />{" "}
              {curso[0].infoGenral.task} Tareas
            </h3>
            <h3 className="p-2 flex items-center">
              <MdArticle className="w-10 h-10 text-purpleMain p-2" />{" "}
              {curso[0].infoGenral.article} artículos
            </h3>
            <h3 className="p-2 flex items-center">
              <FaCoins className="w-10 h-10 text-purpleMain p-2" />{" "}
              {curso[0].infoGenral.coins} puntos
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
          <ModuleCourseCard course={course} />
        </div>

        <div className="flex  flex-col  m-6 py-2 w-auto h-auto ">
          <h2 className="text-[20px] rounded-lg p-4 my-2 bg-purpleMainLighter">
            Cursos relacionados
          </h2>
          <div className="flex justify-between w-full">
            <Slider
              data={courses}
              cardButtonLink="/course-review"
              cardButtonLabel="Ver Curso"
              elementsPerSlide={3}
            />
          </div>
        </div>

        <div className="flex  flex-col   m-6 py-2 w-auto h-auto">
          <h2 className="text-[20px] rounded-lg p-4 my-2 bg-purpleMainLighter">
            Cursos valorados
          </h2>
          <div className="flex flex-wrap justify-between  ">
            <Slider
              data={courses}
              cardButtonLink="/course-review"
              cardButtonLabel="Ver Curso"
              elementsPerSlide={3}
            />
          </div>
        </div>

        {/* <FeaturedCarousel/> */}
      </div>
    </div>
  );
};

export default CurseReview;
