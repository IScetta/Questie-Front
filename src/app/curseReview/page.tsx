import { IoNewspaper } from "react-icons/io5";
import { MdArticle } from "react-icons/md";
import { FaCoins } from "react-icons/fa6";
import { IoIosPhonePortrait } from "react-icons/io";
import { AiFillSafetyCertificate } from "react-icons/ai";

import FeaturedCarousel from "../components/featured/featured-carousel";
import HeaderCurse from "../components/curse/header-curse";
import ColumnCurso from "../components/columnCurso";
import Image from "next/image";
import ModuleCurseCard from "../components/curse/module-curse-card";
import FeaturedCard from "../components/featured/featured-card";

const secciones = [
  { titulo: "titulo", modulo: "Titulo de la leccion" },
  { titulo: "titulo", modulo: "Titulo de la leccion" },
  { titulo: "titulo", modulo: "Titulo de la leccion" },
  { titulo: "titulo", modulo: "Titulo de la leccion" },
];

const CurseReview = () => {
  return (
    <div className="flex flex-row justify-between  mx-[11.5rem] ">
      <div className="flex flex-grow-0">
        <ColumnCurso />
      </div>
      <div className="pb-4">
        <HeaderCurse />
        <div className="flex flex-row w-full h-auto ">
          <div className=" w-[50%] m-6 p-4 bg-white rounded-xl border-2 shadow-[0_5px_15px_0px_#00000042]">
            <h2 className="text-[22px] leading-6 p-2 ">Descripcion</h2>
            <p>
              Este curso es una especialización en la tecnología Java.
              Comenzaremos desde los Fundamentos de Java, y te llevaremos paso a
              paso hasta convertirte en un experto Java en tiempo record y así
              puedas crear aplicaciones Web y Empresariales, incluyendo temas y
              tecnologías como Fundamentos de Java, Programación Orientada a
              Objetos, Patrones de Diseño y Mejores prácticas Java, JDBC,
              Servlets y JSPs, Java Empresarial (Java EE),
            </p>
          </div>

          <div className="w-[50%] m-6 p-4 bg-white rounded-xl border-2 shadow-[0_5px_15px_0px_#00000042]">
            <h2 className="text-[22px] leading-6 ">Este curso incluye:</h2>
            <h3 className="p-2 flex items-center">
              <IoNewspaper className="w-10 h-10 text-purpleMain p-2" /> Tareas
            </h3>
            <h3 className="p-2 flex items-center">
              <MdArticle className="w-10 h-10 text-purpleMain p-2" /> 16
              artículos
            </h3>
            <h3 className="p-2 flex items-center">
              <FaCoins className="w-10 h-10 text-purpleMain p-2" /> 738 puntos
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
          <div className="m-6 p-4  bg-purpleMainLighter rounded-xl  shadow-[0_5px_15px_0px_#00000042]">
            <div className="flex items-center p-8 border-b-2  border-red-900">
              <Image
                className=" rounded-full"
                src="https://e7.pngegg.com/pngimages/73/928/png-clipart-web-development-logo-computer-programming-design-trademark-logo-thumbnail.png"
                alt="program"
                width={50}
                height={50}
              />
              <h2 className="text-[22px] leading-6 p-2 cursor-pointer">
                {secciones[0].titulo}
              </h2>
            </div>
            <div className="flex flex-wrap w-[80%]">
              {secciones.map((seccion, index) => (
                <h3 className="p-2 mx-8 text-[18px]" key={index}>
                  {" "}
                  {seccion.modulo}{" "}
                </h3>
              ))}
            </div>
          </div>
          <ModuleCurseCard items={secciones} />
        </div>

        <div className="flex  flex-col  m-6 py-2 w-auto h-[370px] ">
              <h2 className="text-[20px] rounded-lg p-4 my-2 bg-purpleMainLighter">Cursos relacionados</h2>
          <div className="flex flex-wrap justify-between  ">
            <FeaturedCard />
            <FeaturedCard />
            <FeaturedCard />
          </div>
        </div>

        <div className="flex  flex-col   m-6 py-2 w-auto h-[370px] ">
              <h2 className="text-[20px] rounded-lg p-4 my-2 bg-purpleMainLighter">Cursos valorados</h2>
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
