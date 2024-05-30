"use client";

import { ICreateLesson, ILesson } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { getLessonById, putLessonById } from "@/helpers/lesson.helper";
import { useCallback, useEffect, useState } from "react";

const CreateLessonForm = ({
  lesson_id,
  onClose,
}: //   fetchCourses
{
  lesson_id: string;
  onClose: () => void;
  //   fetchCourses:() => void
}): JSX.Element => {
  const [lessonData, setLessonData] = useState<ILesson | null>(null);
  const { token } = useAuth();

  const fetchLesson = useCallback(async () => {
    try {
      const response = await getLessonById(lesson_id, token!);
      setLessonData(response);
    } catch (error) {
      console.error("Error fetching module:", error);
    }
  }, [lesson_id, token]);

  useEffect(() => {
    fetchLesson();
  }, [fetchLesson]);

  useEffect(() => {
    if (lessonData) {
      setInput({
        title: lessonData.title,
        xp: lessonData.xp,
        coins: lessonData.coins,
      });
    }
  }, [lessonData]);

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
      // console.log(input.coins)

      const response = await putLessonById(
        input.title,
        input.xp,
        input.coins,
        lessonData?.id!,
        token!
      );
      if (!response) throw new Error("Error al intentar crear leccion");
      // fetchCourses
      onClose;
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

export default CreateLessonForm;
