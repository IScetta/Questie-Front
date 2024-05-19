"use client";

import { GoArrowUp } from "react-icons/go";
import ColumnLesson from "../../components/column-lesson";
import { getLessonById } from "@/helpers/lesson.helper";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { ILesson } from "@/app/types";
import Link from "next/link";

const Lesson = ({ params }: { params: { slug: string } }) => {
  const [lesson, setLesson] = useState<ILesson>({
    id: "",
    title: "",
    order: 0,
    xp: 0,
    coins: 0,
    slug: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
    module: {
      id: "",
      course: {
        id: "",
      },
    },
    contents: [""],
  });
  const { slug } = params;
  const { token } = useAuth();

  useEffect(() => {
    const getLesson = async () => {
      try {
        const lessonById = await getLessonById(slug, token);
        setLesson(lessonById);
      } catch (error: any) {
        console.log(error);
      }
    };
    getLesson();
  }, [slug, token]);

  const moduleId = lesson.module.id;
  console.log(lesson);

  return token ? (
    <div className="flex mx-[11.5rem] justify-center">
      <div className="flex flex-grow-0">
        <ColumnLesson moduleid={moduleId} />
      </div>
      <div className="ml-10 w-full flex flex-col justify-center items-center">
        <button className="bg-yellowMain rounded-full w-12 h-12 mt-8 mb-6 hover:w-18 h-18 flex justify-center items-center sticky top-6">
          <GoArrowUp className="w-8 h-8" />
        </button>

        <h1 className="text-5xl mt-18 ">{lesson.title}</h1>

        {/* <div>
      lessonId.content.map((conten, index) =>(
        <div key{}>{content}</div>
      ))
      </div> */}

        <button className="bg-yellowMain  text-lg w-25 h-15 mt-8 mb-8 pl-4 pr-4">
          Siguiente Lección
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center">
      <h1>Debe registrarse e iniciar sesion para ver las lecciones</h1>
      <div className="flex flex-row justify-center items-center mt-2 gap-2">
        <Link
          href="/sign-up"
          className="bg-yellowMain hover:bg-yellowMainLight px-4 py-2 rounded font-semibold text-purpleMain"
        >
          Registrarse
        </Link>
        <Link
          href="/sign-in"
          className="bg-yellowMain hover:bg-yellowMainLight px-4 py-2 rounded font-semibold text-purpleMain"
        >
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default Lesson;
