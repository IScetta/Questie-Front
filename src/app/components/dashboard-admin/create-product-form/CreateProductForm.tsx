"use client";

import { useAuth } from "@/context/AuthContext";
import { putProductCourse } from "@/helpers/createCourse.helper";
import { postProductByCourse } from "@/helpers/products.helper";

import { useState } from "react";

const CreateProductForm = ({
  courseId,
  onClose,
}: {
  courseId: string;
  onClose: any;
}): JSX.Element => {
  const {token} = useAuth()

  const initialState = {
    name: "",
    description: "",
    price: 0,
  };
  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // const resp = await putProductCourse(courseId,token!)
      const response = await postProductByCourse(
        input.name,
        input.description,
        input.price,
        courseId,
        token!
      );
      onClose()
      if (!response) throw new Error("Error al intentar crear producto");
      // if (!resp) throw new Error("Error al intentar actualizar curso");
      window.location.reload();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-start justify-center w-full h-auto mb-2">
        <label
          className="font-medium text-base md:text-[22px] "
          htmlFor={"name"}
        >
          {"Nombre del Producto:"}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={input["name"]}
          placeholder="Ingresa el Nambre del Producto"
          onChange={handleChange}
          className="w-full h-12 mt-1 px-4 py-2 bg-purpleMainLighter rounded-lg placeholder:text-gray-700 placeholder:text-opacity-60 focus:outline-none text-sm md:text-base"
        />
        <div className="my-1 w-auto h-4 bg-purpleMainLighter"></div>
      </div>

      <div className="flex flex-col mb-4 ">
        <label
          htmlFor="description"
          className="font-medium text-base md:text-[22px] "
        >
          Descripcion:
        </label>
        <textarea
          id="description"
          name="description"
          value={input.description}
          onChange={handleChange}
          placeholder="Ingresa la descripcion del Modulo"
          className=" border  h-32 w-full mt-1 px-4 py-2 bg-purpleMainLighter rounded-lg placeholder:text-gray-800 placeholder:text-opacity-60 focus:outline-none text-sm md:text-base"
        />
      </div>


      <div className="flex flex-col items-start justify-center w-full h-auto mb-2">
        <label
          className="font-medium text-base md:text-[22px] "
          htmlFor={"price"}
        >
          {"Valor del Producto en Qty:"}
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={input["price"]}
          placeholder=""
          onChange={handleChange}
          className="w-full h-12 mt-1 px-4 py-2 bg-purpleMainLighter rounded-lg placeholder:text-gray-700 placeholder:text-opacity-60 focus:outline-none text-sm md:text-base"
        />
        <div className="my-1 w-auto h-4 bg-purpleMainLighter"></div>
      </div>



      <div className="flex flex-row justify-center">
        <button type="submit"
        className=" items-center bg-yellowMain border-2 hover:bg-yellowMainLight  border-purpleMain text-purpleMain h-fit mx-7 p-4 text-lg mt-5">
          Crear
        </button>
        <button
          onClick={onClose}
          className=" items-center border-2 border-black bg-gray-500 hover:bg-gray-400 mx-7 p-4 h-fit text-lg text-white mt-5 "
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default CreateProductForm;
