"use client";
import { useEffect, useState } from "react";

// import { IContent } from "@/app/types";

import { title } from "process";
import { useAuth } from "@/context/AuthContext";
import { getLessonById } from "@/helpers/lesson.helper";
import Image from "next/image";

const Prueba03 = ({ params }: { params: { slug: string } }) => {
  const { token } = useAuth();
  const { slug } = params;
  const lessonid = slug
  const [hiddenButton, setHiddenButton] = useState(false);
  const [lesson, setLesson] = useState("");
  const [formTemp, setFormTemp] = useState({
    title: "",
    subtitle: "",
    text: "",
    image_url: "",
    video_url: "",
  });
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    text: "",
    image_url: "",
    video_url: "",
  });

  useEffect(() => {
    const idDeLesson = async () => {
      try {
        const response = await getLessonById(lessonid, token);
        setLesson(response.id);
      } catch (error) {
        console.error("Error fetching lesson:", error);
      }
    };

    idDeLesson();
  }, [lessonid, token]);

  const onChangeTitulo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormTemp((state) => ({
      ...state,
      type: "text",
      title: event.target.value,
    }));
  };

  const onChangeSubtitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormTemp((state) => ({
      ...state,
      type: "text",
      subtitle: event.target.value,
    }));
  };

  const onChangeTexto = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormTemp((state) => ({
      ...state,
      type: "text",
      text: event.target.value,
    }));
  };

  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormTemp((state) => ({
        ...state,
        image_url: URL.createObjectURL(file),
        type: "image",
      }));
    }
  };
 
  const onChangeVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormTemp((state) => ({
      ...state,
      video_url: event.target.value,
    }));
  };
  
  return (
    <div className="flex flex-row mx-[11.5rem]">
      <div className="flex flex-col gap-3">
        <form className="bg-purpleMainLight p-3">
          <div>
            <label className="">Titulo</label>
            <input
              className="block p-2.5 w-full text-base"
              onChange={onChangeTitulo}
              type="text"
              value={formTemp.title}
            />
          </div>
          <div>
            <label>Subtitle</label>
            <input
              className="block p-2.5 w-full text-base"
              onChange={onChangeSubtitle}
              type="text"
              value={formTemp.subtitle}
            />
          </div>
          <div>
            <label>Texto</label>
            <textarea
              onChange={onChangeTexto}
              value={formTemp.text}
              className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="aca va el texto"
            />
          </div>
          <div>
            <label>Image</label>
            <input onChange={onChangeImage} type="file" className="" />
          </div>
          <div>
            <label>Video</label>
            <input
              className="block p-2.5 w-full text-base"
              onChange={onChangeVideo}
              type="url"
              value={formTemp.video_url}
            />
          </div>
        </form>
      </div>
      <div className="w-full h-full flex flex-col">
        <div className="shadow-2xl p-5 my-5 mx-8 w-full h-full flex flex-col">
          <h2>Leccion:</h2>
          <div>
            <strong>Titulo:</strong> {formTemp.title}
          </div>
          <div>
            <strong>Subtitle:</strong> {formTemp.subtitle}
          </div>
          <div>
            <strong>Texto:</strong> {formTemp.text}
          </div>
          <div>
            <strong>Image:</strong>
            {form.image_url && (
              <Image width={1000} height={1000} src={form.image_url} alt="" style={{ width: "auto" }} />
            )}
          </div>
          <div>
            <strong>Video URL:</strong> {formTemp.video_url}
          </div>
        </div>
        <div className="flex flex-col justify-center place-items-center">
          <button
            className={`${
              hiddenButton ? "hidden" : " "
            } bg-purpleMainLight w-[100px]  focus:outline-none text-black  hover:bg-purpleMain hover:text-white focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900`}
            onClick={() => {
              setForm(formTemp);
            }}
          >
            Guardar Cambios
          </button>

          {/* <button
            className={`${
              hiddenButton ? "hidden" : " "
            } w-[100px] bg-yellowMain focus:outline-none text-black  hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900`}
            onClick={async () => {
              

   console.log(lessonid)
              const contents = [{ type: "text", content: { ...form } }];
              const submitL = await postLessonContent(
                lessonid,
                contents,
                token
              );
            }}
          >
            Enviar Contenido
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Prueba03;
