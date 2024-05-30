"use client";

import { useState } from "react";
import CreateCategorieForm from "../create-categories-form/CreateCategoriesForm";

const EditProductModal = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleShow = () => {
    setShowAlert(true);
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <div className="flex items-center justify-center ">
      <button
        onClick={handleShow}
        className="bg-yellowMain text-purpleMain mb-2 h-10 w-52 text-lg font-semibold"
      >
        Crear Categoria
      </button>

      {showAlert ? (
        <div className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex z-20 justify-center items-center">
          <div className=" bg-white p-10 rounded-xl w-[25%] border-2 border-purpleMain">
            <h2 className="flex justify-center text-[23px] mb-5 leading-6 ">
              Crear Categoria
            </h2>
            <CreateCategorieForm onClose={handleClose} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EditProductModal;
