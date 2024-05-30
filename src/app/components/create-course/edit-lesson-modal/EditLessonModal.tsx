"use client";

import { useState } from "react";
import { ICourse, IModule } from "@/app/types";
import EditModuleForm from "../edit-module-form";
import { FaEdit } from "react-icons/fa";
import EditLessonForm from "../edit-lesson-form";

const EditLesson = ({ lesson_id }: { lesson_id: string }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleShow = () => {
    setShowAlert(true);
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <div className="flex items-center justify-center ">
      <button onClick={handleShow} className="p-2 m-4  w-fit text-[18px]  bg-white rounded-lg hover:bg-yellowMain">
        <FaEdit />
      </button>

      {showAlert ? (
        <div className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex z-10 justify-center items-center">
          <div className=" bg-white p-10 rounded-xl w-[25%] border-2 border-purpleMain">
            <h2 className="flex justify-center text-[23px] mb-5 leading-6 ">Editar Leccion</h2>
            <EditLessonForm lesson_id={lesson_id} onClose={handleClose} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EditLesson;
