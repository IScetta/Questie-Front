"use client";

import { ICreateCourseErrorForm, ICreateCourseForm } from "@/app/types";
import { formCreateCourse } from "@/utils/formCreateCourse";
import { useState } from "react";

const CreateCourseForm: React.FC = (): JSX.Element => {
  const initialState: ICreateCourseForm = {
    title: "",
    headline: "",
    description: "",
    image: "",
    bg_image: "",
    categories: [],
  };
  const [input, setInput] = useState<ICreateCourseForm>(initialState);
  const [errors, setErrors] = useState<ICreateCourseErrorForm>({
    title: "",
    headline: "",
    description: "",
    image: "",
    bg_image: "",
    categories: [],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <form>
      {formCreateCourse.map(({ label, name, type, placeholder }) => (
        <div
          className="flex flex-col items-start justify-center w-full h-auto mb-2"
          key={name}
        >
          <label
            className="font-medium text-base md:text-[22px] "
            htmlFor={name}
          >
            {label}
          </label>
          <input
            type={type}
            id={name}
            name={name}
            // value={input[name]}
            placeholder={placeholder}
            onChange={handleChange}
            className="w-full h-12 mt-1 px-4 py-2 bg-purpleMainLighter rounded-lg placeholder:text-gray-700 placeholder:text-opacity-60 focus:outline-none text-sm md:text-base"
          />
          <div className="my-1 w-auto h-4 bg-purpleMainLighter">
            {/* <p className="text-red-600 text-xs">
                    {errors[name] && errors[name]}
                  </p> */}
          </div>
        </div>
      ))}

      <div className="flex flex-col mb-4 ">
        <label
          htmlFor="headline"
          className="font-medium text-base md:text-[22px] "
        >
          Encavezado:
        </label>
        <textarea
          id="headline"
          name="headline"
          value={input.headline}
          placeholder="Ingresa el encavezado"
          className=" border  h-32 w-full mt-1 px-4 py-2 bg-purpleMainLighter rounded-lg placeholder:text-gray-800 placeholder:text-opacity-60 focus:outline-none text-sm md:text-base"
        />
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
          placeholder="Ingresa la descripcion del curso"
          className=" border  h-32 w-full mt-1 px-4 py-2 bg-purpleMainLighter rounded-lg placeholder:text-gray-800 placeholder:text-opacity-60 focus:outline-none text-sm md:text-base"
        />
      </div>
      <div className="flex flex-row">
      <button className="bg-yellowMain border-2 hover:bg-yellowMainLight rounded-md border-purpleMain text-purpleMain h-10 w-52 mx-7 text-lg mt-5">Guardar</button>
      <button className=" bg-gray-300 border-2 hover:bg-gray-400 rounded-md border-purpleMain text-purpleMain h-10 w-52 mx-7 text-lg mt-5">Editar</button>
      </div>
    </form>
  );
};

export default CreateCourseForm;
