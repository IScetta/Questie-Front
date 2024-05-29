"use client";

import { useState } from "react";
import CreateModuleForm from "../../create-module-form";
import { ICourse } from "@/app/types";

const CreateModuleButton = ({ course }: { course: ICourse }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="flex items-center justify-center ">

        <button
          onClick={handleShowAlert}
          className="flex w-fit p-2 m-2 rounded-md border-2 border-purpleMain bg-yellowMain hover:bg-yellowMainLight text-[20px] "
        >
          Crear Nuevo Modulo
        </button>

      {showAlert ? (
        <div className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex z-10 justify-center items-center">
          <div className=" bg-white p-10 rounded-xl w-[25%] border-2 border-purpleMain">
          <h2 className="text-[23px] mb-5 leading-6 ">Crear Nuevo Modulo</h2>
          <CreateModuleForm courseId={course.id} onClose={handleCloseAlert}/>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreateModuleButton;
