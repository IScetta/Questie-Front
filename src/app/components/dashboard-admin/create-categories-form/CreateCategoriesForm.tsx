"use client";

import { IModule } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { postCategoryBD } from "@/helpers/categories.helper";
import { useEffect, useState, useCallback } from "react";

const CreateCategorieForm = ({
  onClose,
}: {
  onClose: () => void;
}): JSX.Element => {
  const { token } = useAuth();
  const [moduleData, setModuleData] = useState<IModule | null>(null);

  const [input, setInput] = useState({
    name: "",
  });

  const [errors, setErrors] = useState({
    name: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await postCategoryBD(input.name, token!);

      if (!response) throw new Error("Error al intentar actualizar modulo");

      onClose();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-start justify-center w-full h-auto mb-2">
        <label className="font-medium text-base md:text-[22px]" htmlFor="title">
          {"Nombre de la categoria:"}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={input.name}
          placeholder="Ingresa el Titulo de Modulo"
          onChange={handleChange}
          className="w-full h-12 mt-1 px-4 py-2 bg-purpleMainLighter rounded-lg placeholder:text-gray-700 placeholder:text-opacity-60 focus:outline-none text-sm md:text-base"
        />
        <div className="my-1 w-auto h-4 bg-purpleMainLighter"></div>
      </div>
      <div className="flex flex-row justify-center">
        <button
          type="submit"
          className="items-center bg-yellowMain border-2 hover:bg-yellowMainLight border-purpleMain text-purpleMain h-fit mx-7 px-4 py-2 text-lg mt-5"
        >
          Guardar
        </button>
        <button
          onClick={onClose}
          className="items-center border-2 border-black bg-gray-500 hover:bg-gray-400 mx-7 px-4 py-2 h-fit text-lg text-white mt-5"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default CreateCategorieForm;
