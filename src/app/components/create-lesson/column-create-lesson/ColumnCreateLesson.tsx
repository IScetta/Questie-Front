"use client"

import { FaImage } from "react-icons/fa"
import { IoCreate } from "react-icons/io5"
import { PiLinkFill, PiTextTFill, PiVideoFill } from "react-icons/pi"
import ButtonCreator from "../button-creator/ButtonCreator";
import LessonTextComponent from "../lesson-components/lesson-text-component";


const ColumnCreateCourse = ()=>{

  const handleClick = () => {
    // Crea un nuevo componente y lo agrega a la lista de componentes
    {<ButtonCreator component={<LessonTextComponent/>}/>}
  };

    return(
        
    <div className=" justify-center items-center grid grid-cols-1  ">
    <div className="h-full w-80 bg-purpleMainLight col-start-2 col-span-4 pl-10 pr-10">
      <div className="bg-whiteColumn  my-5 py-3 mt-10 flex flex-nowrap">
        <div ><IoCreate className="  w-12 h-12 ml-3 "/></div>

        <div className="flex flex-wrap">
          <p className="ml-3 ">Creador de Cursos</p>

          <p className="text-sm ml-3">opciones:</p>
        </div>
      </div>

      <button onClick={handleClick} className="flex flex-wrap bg-whiteColumn mb-4 mx-8 hover:bg-purpleMainLighter pl-5 pr-5 py-3">
        <PiTextTFill className="  w-8 h-8 ml-3 mr-2 "/>
        <p className="text-sm flex items-center"> Texto</p>
      </button>

      <div className="flex flex-wrap bg-whiteColumn mb-4 mx-8 hover:bg-purpleMainLighter pl-5 pr-5 py-3">
        <FaImage className="  w-8 h-8 ml-3 mr-2 "/>
        <p className="text-sm flex items-center"> Imagen</p>
      </div>

      <div className="flex flex-wrap bg-whiteColumn mb-4 mx-8 hover:bg-purpleMainLighter pl-5 pr-5 py-3">
        <PiVideoFill className="  w-8 h-8 ml-3 mr-2 "/>
        <p className="text-sm flex items-center"> Video</p>
      </div>


      <div className="flex flex-wrap bg-whiteColumn mb-4 mx-8 hover:bg-purpleMainLighter pl-5 pr-5 py-3">
        <PiLinkFill className="  w-8 h-8 ml-3 mr-2 "/>
        <p className="text-sm flex items-center"> Enlace</p>
      </div>


    </div>
  </div>

    )
}

export default ColumnCreateCourse