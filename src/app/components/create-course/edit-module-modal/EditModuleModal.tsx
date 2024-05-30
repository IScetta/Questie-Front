"use client";

import { useState } from "react";
import { ICourse, IModule } from "@/app/types";
import EditModuleForm from "../edit-module-form";

const EditModuleModal = ({ module }: { module: IModule }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleShow = () => {
    setShowAlert(true);
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <div className="flex items-center justify-center ">
      <button onClick={handleShow} className="mx-2 p-2 border-2 rounded-md border-gray-600 bg-blue-gray-200 hover:bg-blue-gray-100">
        Editar Modulo
      </button>

      {showAlert ? (
        <div className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex z-10 justify-center items-center">
          <div className=" bg-white p-10 rounded-xl w-[25%] border-2 border-purpleMain">
            <h2 className="flex justify-center text-[23px] mb-5 leading-6 ">Editar Modulo</h2>
            <EditModuleForm module={module} onClose={handleClose}/>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EditModuleModal;
