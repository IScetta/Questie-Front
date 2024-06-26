import Link from "next/link";


const CreateCourseColumn = ()=>{
    return(
        <div className="justify-center items-center grid grid-cols-1">
        <div className="h-full w-80 bg-purpleMainLight col-start-2 col-span-4 px-7 ">
          <div className="bg-image rounded-full h-52 w-52 ml-7 mt-6 mb-6"></div>
          <button className="bg-yellowMain text-purpleMain h-10 w-52 ml-7 text-lg mt-5">
          <Link href={"/admin/create-course"}>Agregar Curso</Link>   
          </button>
         
         
          <div className="text-lg text-center space-y-4 my-5">
            
            <p>Nombre y apellido</p>
            <p>Cursos Totales: 3</p>
            <p>Alumnos</p>
         
          
  
          </div>
        </div>
      </div>
    )
}


export default CreateCourseColumn;