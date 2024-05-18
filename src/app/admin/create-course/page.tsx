import CreateCourseColumn from "@/app/components/create-course/create-course-column";
import CreateCourseColumnModule from "@/app/components/create-course/create-course-column-module";
import CreateCourseForm from "@/app/components/create-course/create-course-form";


const CreateCourse: React.FC = () => {
    return (
        <div className="flex mx-[11.5rem] justify-center h-full">
      <div className="flex flex-grow-0">
        <CreateCourseColumn />
      </div>
      <div className="ml-10 mt-10 w-full flex flex-col justify-start h-full mb-8">
        <h1 className="text-[24px] m-4 p-2 bg-purpleMainLighter rounded-xl">Create Course</h1>
        <div className="flex flex-row w-full h-auto ">
          <div className=" w-[50%] m-6 p-4 bg-white rounded-xl border-2 shadow-[0_5px_15px_0px_#00000042]">
            <h2 className="text-[22px] leading-6 p-2 ">Descripcion</h2>
            <CreateCourseForm/>
          </div>

          <div className="w-[50%] m-6 p-4 bg-white rounded-xl border-2 shadow-[0_5px_15px_0px_#00000042]">
            <h2 className="text-[22px] leading-6 ">Este curso incluye:</h2>
            <CreateCourseColumnModule/>
          </div>

        </div>

      </div>
        </div>
    );
};

export default CreateCourse;