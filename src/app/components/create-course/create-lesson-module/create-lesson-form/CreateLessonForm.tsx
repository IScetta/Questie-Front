"use client";

import { ICreateLesson } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { postCreateLesson } from "@/helpers/createLesson";
import { useState } from "react";

const CreateLessonForm = ({
  module_id,
  order,
  onClose,
}: {
  module_id: string;
  order: number;
  onClose: any;
}): JSX.Element => {
  const initialState: ICreateLesson = {
    title: "",
    xp: 0,
    coins: 0,
  };
  const [input, setInput] = useState<ICreateLesson>(initialState);
  const [errors, setErrors] = useState({
    title: "",
    xp: "",
    coins: "",
  });

  const {token} = useAuth()

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
      console.log(input.coins)
      
      const response = await postCreateLesson(
        input.title,
        order,
        input.coins,
        input.xp,
        module_id,
        token!
      );
      if (!response) throw new Error("Error al intentar crear leccion");
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
          htmlFor={"title"}
        >
          {"Titulo de la Lección:"}
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={input["title"]}
          placeholder="Ingresa el Titulo de la Lección"
          onChange={handleChange}
          className="w-full h-12 mt-1 px-4 py-2 bg-purpleMainLighter rounded-lg placeholder:text-gray-700 placeholder:text-opacity-60 focus:outline-none text-sm md:text-base"
        />
        <div className="my-1 w-auto h-4 bg-purpleMainLighter"></div>
      </div>

      <div className="flex flex-col items-start justify-center w-full h-auto mb-2">
        <label className="font-medium text-base md:text-[22px] " htmlFor={"xp"}>
          {"Experiencia de la Lección:"}
        </label>
        <input
          type="number"
          id="xp"
          name="xp"
          value={input["xp"]}
          placeholder="Experiencia"
          onChange={handleChange}
          className="w-full h-12 mt-1 px-4 py-2 bg-purpleMainLighter rounded-lg placeholder:text-gray-700 placeholder:text-opacity-60 focus:outline-none text-sm md:text-base"
        />
        <div className="my-1 w-auto h-4 bg-purpleMainLighter"></div>
      </div>

      <div className="flex flex-col items-start justify-center w-full h-auto mb-2">
        <label
          className="font-medium text-base md:text-[22px] "
          htmlFor={"coins"}
        >
          {"Puntos de la Lección:"}
        </label>
        <input
          type="number"
          id="coins"
          name="coins"
          value={input["coins"]}
          placeholder="Puntos de la Lección"
          onChange={handleChange}
          className="w-full h-12 mt-1 px-4 py-2 bg-purpleMainLighter rounded-lg placeholder:text-gray-700 placeholder:text-opacity-60 focus:outline-none text-sm md:text-base"
        />
        <div className="my-1 w-auto h-4 bg-purpleMainLighter"></div>
      </div>

      <div className="flex flex-row justify-center">
        <button className=" items-center bg-yellowMain border-2 hover:bg-yellowMainLight rounded-md border-purpleMain text-purpleMain h-10 mx-7 p-2 text-lg mt-5">
          Crear
        </button>
        <button
          onClick={onClose}
          className=" items-center border-2 border-black bg-gray-500 hover:bg-gray-400 mx-7 p-2 h-10 text-lg text-white mt-5 rounded-md"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default CreateLessonForm;
