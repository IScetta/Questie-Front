"use client";

import { GoArrowUp } from "react-icons/go";
import ColumnLesson from "../../components/column-lesson";
import { getLessonById, getLessons } from "@/helpers/lesson.helper";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { ILesson } from "@/app/types";
import Link from "next/link";
import ContentTitle from "@/app/components/content-lesson/content-title";
import ContentText from "@/app/components/content-lesson/content-text";
import ContentSubTitle from "@/app/components/content-lesson/content-subtitle";
import ContentImage from "@/app/components/content-lesson/content-image";
import ContentVideo from "@/app/components/content-lesson/content-video";

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
  const [allLessons, setAllLessons] = useState<ILesson[]>([
    {
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
    },
  ]);

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

  return token ? (
    <div className="flex mx-[11.5rem] justify-center">
      <div className="flex flex-grow-0">
        <ColumnLesson moduleid={moduleId} />
      </div>
      <div className="ml-10 w-full flex flex-col justify-center items-center">
        <Link
          href={
            lesson.order - 1 >= 1
              ? `/lesson/${
                  allLessons.find(
                    (lessons) => lessons.order === lesson.order - 1
                  )?.id
                }`
              : `/module/${moduleId}`
          }
          className="bg-yellowMain rounded-full w-12 h-12 p-2 mt-8 mb-6 flex justify-center items-center sticky top-6"
        >
          <GoArrowUp className="w-8 h-8 text-purpleMain" />
        </Link>

        <ContentTitle title={lesson.title} />
        <ContentText
          text={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
          }
        />
        <ContentSubTitle subtitle="Este es el primer subtitulo de la lección" />
        <ContentImage image="https://placehold.co/600x400.png" name={"image"} />
        <ContentSubTitle subtitle="Este es el segundo subtitulo de la lección" />
        <ContentVideo video="https://www.youtube.com/embed/9bZkp7q19f0" />
        <ContentSubTitle subtitle="Este es el tercer subtitulo de la lección" />
        <ContentText
          text={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
          }
        />

        <Link
          href={
            lesson.order + 1 <= allLessons.length
              ? `/lesson/${
                  allLessons.find(
                    (lessons) => lessons.order === lesson.order + 1
                  )?.id
                }`
              : `/module/${moduleId}`
          }
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
