"use client";


import { useState } from "react";

const CreateLessonForm = ({moduleId, onClose}:{moduleId:string,onClose:any}): JSX.Element => {
  const initialState= {
    title: "",
    exp: "",
    coins: "",
  };
  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState({
    title: "",
    exp: "",
    coins: "",
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
      const token_preload = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdjZWNhMDRlLTFlZDQtNDliNy04ZTAxLTY2ZTc5ZWNlYjIzOCIsImVtYWlsIjoiam9obkRvZUBnbWFpbC5jb20iLCJpc0FkbWluIjoiYWRtaW4iLCJzdWIiOiI3Y2VjYTA0ZS0xZWQ0LTQ5YjctOGUwMS02NmU3OWVjZWIyMzgiLCJpYXQiOjE3MTYzODgyOTcsImV4cCI6MTcxNjM5NTQ5N30.OuDzjcgS0cWXVgogDsG6P9KBVAmKz-EX2p7DLqcOrdc"
      console.log(input.title,input.coins,input.exp)
    //   const response = await postCreateModule(input.title,input.description,courseId, token_preload);

    //   if (!response) throw new Error("Error al intentar crear modulo");
      window.location.reload()
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
        <div className="my-1 w-auto h-4 bg-purpleMainLighter">
        </div>
      </div>


      <div className="flex flex-col items-start justify-center w-full h-auto mb-2">
        <label
          className="font-medium text-base md:text-[22px] "
          htmlFor={"exp"}
        >
          {"Experiencia de la Lección:"}
        </label>
        <input
          type="number"
          id="exp"
          name="exp"
          value={input["exp"]}
          placeholder="Experiencia"
          onChange={handleChange}
          className="w-full h-12 mt-1 px-4 py-2 bg-purpleMainLighter rounded-lg placeholder:text-gray-700 placeholder:text-opacity-60 focus:outline-none text-sm md:text-base"
        />
        <div className="my-1 w-auto h-4 bg-purpleMainLighter">
        </div>
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
        <div className="my-1 w-auto h-4 bg-purpleMainLighter">
        </div>
      </div>
      

      <div className="flex flex-row justify-center">
      <button 
        className=" items-center bg-yellowMain border-2 hover:bg-yellowMainLight rounded-md border-purpleMain text-purpleMain h-10 mx-7 p-2 text-lg mt-5">
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