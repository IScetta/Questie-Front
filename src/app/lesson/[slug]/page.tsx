"use client";

import { GoArrowUp } from "react-icons/go";
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

const Lesson: React.FC<{ params: { slug: string } }> = ({
  params,
}: {
  params: { slug: string };
}): JSX.Element => {
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
  const [allLessons, setAllLessons] = useState<ILesson[]>([]);

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

  useEffect(() => {
    const getLesson = async () => {
      try {
        const getAllLessons = await getLessons(token);
        const filteredLessons = getAllLessons.filter(
          (lessons) => lessons.module.id === moduleId
        );
        setAllLessons(filteredLessons);
      } catch (error) {
        console.log(error);
      }
    };
    getLesson();
  }, [token, moduleId]);

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
        <ColumnLesson moduleid={moduleId} />
      </div>

      <div className="ml-10 w-full flex flex-col justify-center items-center">
        <Link
          href={getPreviousLessonById(allLessons, lesson.id)}
          className="bg-yellowMain rounded-full w-12 h-12 p-2 mt-8 mb-6 flex justify-center items-center sticky top-6"
        >
          <GoArrowUp className="w-8 h-8 text-purpleMain" />
        </Link>

        <div className="flex flex-col justify-center items-center w-full h-auto mt-8 mb-2 text-center">
          <h1 className="text-5xl font-bold underline underline-offset-1">
            {lesson.title}
          </h1>
        </div>

        {lesson.contents.map((content:any, index: number) => (
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
                image={content.content.image_url}
                description={content.content.description}
              />
            )}
            {content.type === "video" && (
              <ContentVideo
                video={content.content.video_url}
                description={content.content.description}
              />
            )}
          </div>
        ))}

        <Link
          href={getNextLessonById(allLessons, lesson.id)}
          className="bg-yellowMain my-10 px-4 py-2 rounded-lg"
        >
          <p className="text-purpleMain text-lg font-normal">
            {lesson.order + 1 <= allLessons.length
              ? "Siguiente Lección"
              : "Finalizar"}
          </p>
        </Link>
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
