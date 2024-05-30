"use client";

import { useEffect, useState } from "react";
import CreateLessonForm from "../../create-lesson-form";

const CreateLessonButton = ({
  moduleId,
  order_n,
  fetchCourse,
}: {
  moduleId: string;
  order_n: number;
  fetchCourse: () => void;
}) => {
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
        className=" mx-2 p-2 border-2 rounded-md border-purpleMain bg-yellowMain hover:bg-yellowMainLight"
      >
        Crear leccion
      </button>

      {showAlert ? (
        <div className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex z-10 justify-center items-center">
          <div className=" bg-white p-10 rounded-xl w-[25%] border-2 border-purpleMain">
            <h2 className="flex justify-center text-[23px] mb-5 leading-6 ">Crear Nueva Leccion</h2>
            <CreateLessonForm
              module_id={moduleId}
              order={order_n}
              onClose={handleCloseAlert}
              fetchCourse={fetchCourse}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreateLessonButton;
