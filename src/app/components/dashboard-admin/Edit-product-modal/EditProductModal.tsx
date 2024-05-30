"use client";

import { useState } from "react";
import { ICourse } from "@/app/types";
import CreateProductForm from "../Edit-product-form";
import {
  RiMoneyDollarCircleFill,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";

const EditProductModal = ({ course }: { course: ICourse }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="flex items-center justify-center ">
      {course.isProduct ? (
        <button
          onClick={handleShowAlert}
          className="p-1 m-4 w-fit bg-yellowMain rounded-lg"
        >
          <RiMoneyDollarCircleLine className="text-[30px]" />
        </button>
      ) : (
        <button
          onClick={handleShowAlert}
          className="p-1 m-2 w-fit text-[20px] bg-gray-400 rounded-lg"
        >
          <RiMoneyDollarCircleFill className="text-[30px]" />
        </button>
      )}

      {showAlert ? (
        <div className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex z-20 justify-center items-center">
          <div className=" bg-white p-10 rounded-xl w-[25%] border-2 border-purpleMain">
            {course.isProduct ? (
              <h2 className="text-[23px] mb-5 leading-6 ">Editar Producto</h2>
            ) : (
              <h2 className="text-[23px] mb-5 leading-6 ">Crear Producto</h2>
            )}
            <CreateProductForm course={course} onClose={handleCloseAlert} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EditProductModal;
