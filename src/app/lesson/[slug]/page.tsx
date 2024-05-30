// components/lesson/Lesson.tsx
"use client";

import ColumnLesson from "../../components/column-lesson";
import { getLessonById, getLessons } from "@/helpers/lesson.helper";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { ILesson } from "@/app/types";
import Link from "next/link";
import {
  ContentTitle,
  ContentSubTitle,
  ContentText,
  ContentImage,
  ContentVideo,
} from "@/app/components/content-lesson";
import NextLessonButton from "../NextLessonButon";

const Lesson: React.FC<{ params: { slug: string } }> = ({
  params,
}: {
  params: { slug: string };
}): JSX.Element => {
  const initialLessonState: ILesson = {
    id: "",
    title: "",
    order: 0,
    xp: 0,
    coins: 0,
    slug: "",
    created_at: "",
    updated_at: "",
    deleted_at: null,
    module: {
      id: "",
      course: {
        id: "",
      },
    },
    contents: [],
  };

  const [lesson, setLesson] = useState<ILesson>(initialLessonState);
  const [allLessons, setAllLessons] = useState<ILesson[]>([initialLessonState]);
  const [moduleId, setModuleId] = useState<string>("");

  const { slug } = params;
  const { token } = useAuth();

  useEffect(() => {
    const getLesson = async () => {
      try {
        const lessonById = await getLessonById(slug, token);
        setLesson(lessonById);
        setModuleId(lessonById.module.id);

        if (lessonById.module.id) {
          const getAllLessons = await getLessons(token);
          const filteredLessons = getAllLessons?.filter(
            (lesson: ILesson) => lesson?.module?.id === lessonById?.module?.id
          );
          setAllLessons(filteredLessons);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    if (token && slug) getLesson();
  }, [slug, token]);

  const getPreviousLessonById = (
    allLessons: ILesson[],
    currentLessonId: string
  ) => {
    const currentIndex = allLessons.findIndex(
      (lesson) => lesson.id === currentLessonId
    );
    if (currentIndex > 0) {
      return allLessons[currentIndex - 1].id;
    } else {
      return `/module/${moduleId}`;
    }
  };

  const getNextLessonById = (
    allLessons: ILesson[],
    currentLessonId: string
  ) => {
    const currentIndex = allLessons.findIndex(
      (lesson) => lesson.id === currentLessonId
    );
    if (currentIndex < allLessons.length - 1) {
      return allLessons[currentIndex + 1].id;
    } else {
      return `/module/${moduleId}`;
    }
  };

  return token ? (
    <div className="flex mx-[11.5rem] justify-center">
      <div className="flex flex-grow-0">
        <ColumnLesson moduleId={moduleId} allLessons={allLessons} />
      </div>

      <div className="ml-10 w-full flex flex-col justify-center items-center">
        <Link
          href={getPreviousLessonById(allLessons, lesson.id)}
          className="bg-yellowMain my-10 px-4 py-2 rounded-lg"
        >
          <p className="text-purpleMain text-lg font-normal">
            {lesson.order - 1 >= allLessons.length
              ? "Volver al Módulo"
              : "Anterior Lección"}
          </p>
        </Link>

        <div className="flex flex-col justify-center items-center w-full h-auto mt-8 mb-2 text-center">
          <h1 className="text-5xl font-bold underline underline-offset-1">
            {lesson.title}
          </h1>
        </div>

        {lesson.contents.map((content: any, index: number) => (
          <div
            key={index}
            className="flex justify-center items-center w-full h-auto"
          >
            {content.type === "title" && (
              <ContentTitle title={content.content.title} />
            )}
            {content.type === "subtitle" && (
              <ContentSubTitle subtitle={content.content.subtitle} />
            )}
            {content.type === "text" && (
              <ContentText text={content.content.text} />
            )}
            {content.type === "image" && (
              <ContentImage
                image={content.content.image}
                description={content.content.description}
              />
            )}
            {content.type === "video" && (
              <ContentVideo
                video={content.content.video}
                description={content.content.description}
              />
            )}
          </div>
        ))}
        <NextLessonButton
          allLessons={allLessons}
          lesson={lesson}
          getNextLessonById={getNextLessonById}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center">
      <h1>Debe registrarse e iniciar sesion para ver las lecciones</h1>
      <div className="flex flex-row justify-center items-center mt-2 gap-2">
        <Link
          href="/sign-up"
          className="bg-yellowMain hover:bg-yellowMainLight px-4 py-2 rounded-lg font-semibold text-purpleMain"
        >
          Registrarse
        </Link>
        <Link
          href="/sign-in"
          className="bg-yellowMain hover:bg-yellowMainLight px-4 py-2 rounded-lg font-semibold text-purpleMain"
        >
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default Lesson;
