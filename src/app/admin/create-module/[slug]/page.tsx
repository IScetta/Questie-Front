import CreateCourseColumn from "@/app/components/create-course/create-course-column";
import CreateLessonModule from "@/app/components/create-course/create-lesson-module/CreateLessonModule";
import CreateLessonButton from "@/app/components/create-course/create-lesson-module/order-lesson/create-lesson-button";
import CreateModuleButton from "@/app/components/create-course/create-module/create-module-button";
import { ICourse } from "@/app/types";
import { getCourseByIdDB } from "@/helpers/course.helpers";

const CreateCourse = async ({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> => {
  const { slug } = params;
  const course: ICourse = await getCourseByIdDB(slug);
  const moduleId = "0990512f-8c98-45b6-90b8-ef7e559cfcdf"

  return (
    <div className="flex mx-[11.5rem] justify-center h-full">
      <div className="flex flex-grow-0">
        <CreateCourseColumn />
      </div>
      <div className="ml-10 mt-10 w-full flex flex-col justify-start h-full mb-8">
        <h1 className="text-[24px] m-4 p-2 bg-purpleMainLighter rounded-xl">
          Crear Modulos para el curso: {course.title}
        </h1>
        <div className="flex flex-col ">

          <CreateModuleButton course={course}/>
          {/* <div className=" w-[50%] m-6 p-4 bg-white rounded-xl border-2 shadow-[0_5px_15px_0px_#00000042]">
          <h2 className="text-[23px] mb-5 leading-6 ">Crear Nuevo Modulo</h2>
            <CreateModuleForm courseId={course.id}/>
          </div> */}

          <div className="w-full m-6 p-4 bg-white rounded-xl border-2 shadow-[0_5px_15px_0px_#00000042]">
            <h2 className="text-[22px] leading-6 ">Este curso incluye:</h2>
            {course.modules.map((module, index: number) => (
              <div
                className="flex flex-col bg-purpleMainLighter rounded-xl border-2 border-purpleMain m-2 p-2"
                key={index}
              >
                <div className="flex flex-row justify-between">
                  <div>
                    <h4 className="text-[16px]">Modulo:</h4>
                    <h3 className="mb-2 p-2 text-[20px]">{module.title}</h3>
                  </div>
                  <div className="flex flex-row items-center">
                    <CreateLessonButton moduleId={module.id}/>
                    <button className=" mx-2 p-2 border-2 rounded-md border-gray-600 bg-blue-gray-200 hover:bg-blue-gray-100">
                      Editar Modulo
                    </button>
                  </div>
                </div>
                <div>
                  <CreateLessonModule id={module.id} content={module.lessons} />
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
    </div>
  );
};

export default CreateCourse;
