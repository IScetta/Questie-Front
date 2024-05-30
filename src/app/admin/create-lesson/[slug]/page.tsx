"use client";

import { Modal } from "@/app/components/modal/Modal";
import { ILesson } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { getLessonById } from "@/helpers/lesson.helper";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Swal from "sweetalert2";

interface IContent {
  id: string;
  lesson_id: string;
  type: string;
  content: any;
}

const initialState = {
  title: "",
  subtitle: "",
  text: "",
  image: "",
  video: "",
};

const CreateLesson = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { token } = useAuth();

  const [lesson, setLesson] = useState<ILesson | null>(null);
  const [addContentModal, setAddContentModal] = useState(false);
  const [type, setType] = useState<string>("");
  const [contents, setContents] = useState<React.ReactNode[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState<any>(initialState);
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const getLesson = async () => {
      setLoading(true);
      try {
        const lessonById = await getLessonById(slug, token);
        setLesson(lessonById);
        setError(null);
      } catch (error) {
        console.error("Error fetching lesson:", error);
        setError("Failed to fetch lesson.");
      } finally {
        setLoading(false);
      }
    };

    if (slug && token) getLesson();
  }, [slug, token]);

  useEffect(() => {
    if (lesson && lesson.contents.length > 0) {
      const formattedContents: React.ReactNode[] = lesson.contents.map(
        (content: IContent) => renderContent(content)
      );
      setContents(formattedContents);
    }
  }, [lesson]);

  const renderContent = (content: IContent): React.ReactNode => {
    switch (content.type) {
      case "title":
        return (
          <div key={content.id} id={content.id}>
            <p className="text-2xl font-semibold">{content.content.title}</p>
          </div>
        );
      case "subtitle":
        return (
          <div key={content.id} id={content.id}>
            <p className="text-xl font-semibold">{content.content.subtitle}</p>
          </div>
        );
      case "text":
        return (
          <div key={content.id} id={content.id}>
            <p className="text-lg">{content.content.text}</p>
          </div>
        );
      case "image":
        return (
          <Image
            key={content.id}
            id={content.id}
            src={content.content.image}
            alt="image"
            width={1000}
            height={1000}
          />
        );
      case "video":
        return (
          <video
            key={content.id}
            id={content.id}
            src={content.content.video}
            className="rounded-md"
            controls
          />
        );
      default:
        return null;
    }
  };

  const handleModalSubmit = async () => {
    setAddContentModal(false);

    if (lesson && selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const responseImg = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}uploadfile`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const imageUrl = responseImg.data.url;

        const response: AxiosResponse<IContent> = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}contents`,
          {
            lesson_id: lesson.id,
            contents: {
              type,
              content: {
                [type]: imageUrl,
              },
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedLesson = {
          ...lesson,
          contents: [...lesson.contents, response.data],
        };

        setLesson(updatedLesson);
        setContents(
          updatedLesson.contents.map((content) => renderContent(content))
        );
        setSelectedFile(null);
      } catch (error: any) {
        Swal.fire({
          title: "Oops...",
          text: error.response.data.message,
          icon: "error",
        });
      }
    } else if (lesson && (input.title || input.subtitle || input.text)) {
      try {
        const content =
          input.title ||
          input.subtitle ||
          input.text ||
          input.image ||
          input.video;

        const response: AxiosResponse<IContent> = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}contents`,
          {
            lesson_id: lesson.id,
            contents: {
              type,
              content: {
                [type]: content,
              },
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const updatedLesson = {
          ...lesson,
          contents: [...lesson.contents, response.data],
        };
        setLesson(updatedLesson);
        setContents(
          updatedLesson.contents.map((content) => renderContent(content))
        );
      } catch (error: any) {
        Swal.fire({
          title: "Oops...",
          text: error.response.data.message,
          icon: "error",
        });
      }
    }
  };

  const clearInput = () => {
    setInput(initialState);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name, files } = event.target as HTMLInputElement;
    if (name === "image" || name === "video") {
      setSelectedFile(files?.[0] || null);
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const deleteContent = async (contentId: string) => {
    if (!lesson) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}contents/${contentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedContents = lesson.contents.filter(
        (content: IContent) => content.id !== contentId
      );

      setLesson({
        ...lesson,
        contents: updatedContents,
      });

      setContents(updatedContents.map((content) => renderContent(content)));
    } catch (error: any) {
      console.error("Error deleting content:", error);
      Swal.fire({
        title: "Oops...",
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-3/4 mx-auto">
      <div className="flex justify-start items-center w-full h-[100px] rounded-lg">
        <button
          className="font-bold text-purpleMain py-2 px-4 bg-yellowMain rounded-lg hover:bg-yellowMainLight"
          onClick={() => router.back()}
        >{`< Volver`}</button>
      </div>

      <button
        onClick={() => setAddContentModal(true)}
        className="my-24 rounded-full bg-yellowMain text-purpleMain h-10 w-10 flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg"
      >
        <FaPlus />
      </button>

      <div className="flex flex-col space-y-4 w-full mb-8">
        {contents.length > 0 ? (
          contents.map((content: React.ReactNode, index: number) => (
            <div
              key={index}
              className="p-4 bg-gray-300 w-full rounded-lg flex justify-between items-center"
            >
              {content}
              <FaTrash
                className="cursor-pointer"
                onClick={() =>
                  deleteContent((lesson?.contents[index] as IContent).id)
                }
              />
            </div>
          ))
        ) : (
          <div className="flex flex-row w-full bg-blue-gray-50 mt-8 p-8 justify-between items-center rounded">
            <p>No hay contenido</p>
          </div>
        )}
      </div>

      {addContentModal && (
        <Modal openModal={addContentModal} setOpenModal={setAddContentModal}>
          <div className="flex flex-col justify-center items-center">
            <form className="flex flex-col justify-center items-center w-full space-y-4">
              <select
                className="w-full h-12 mt-1 px-4 py-2 bg-gray-200 rounded-lg placeholder:text-white placeholder:text-opacity-70 focus:outline-none text-sm md:text-base"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  clearInput();
                }}
              >
                <option value="" disabled>
                  Seleccione un tipo de contenido
                </option>
                <option value="title">Título</option>
                <option value="subtitle">Subtitulo</option>
                <option value="text">Texto</option>
                <option value="image">Imagen</option>
                <option value="video">Video</option>
              </select>
              {type === "title" && (
                <input
                  onChange={handleChange}
                  name="title"
                  placeholder="Ingresa el título"
                  className="text-gray-800 border border-gray-300 w-full h-12 mt-1 px-4 py-2 bg-gray-200 rounded-lg placeholder:text-gray-500 placeholder:text-opacity-70 focus:outline-none text-sm md:text-base"
                />
              )}
              {type === "subtitle" && (
                <input
                  onChange={handleChange}
                  name="subtitle"
                  placeholder="Ingresa el subtitulo"
                  className="text-gray-800 border border-gray-300 w-full h-12 mt-1 px-4 py-2 bg-gray-200 rounded-lg placeholder:text-gray-500 placeholder:text-opacity-70 focus:outline-none text-sm md:text-base"
                />
              )}
              {type === "text" && (
                <textarea
                  onChange={handleChange}
                  name="text"
                  className="text-gray-800 border border-gray-300 w-full h-32 mt-1 px-4 py-2 bg-gray-200 rounded-lg placeholder:text-gray-500 placeholder:text-opacity-70 focus:outline-none text-sm md:text-base"
                />
              )}
              {type === "image" && (
                <input
                  onChange={handleChange}
                  name="image"
                  type="file"
                  placeholder="Ingresa el enlace a la imagen"
                  className="text-gray-800 border border-gray-300 w-full h-12 mt-1 px-4 py-2 bg-gray-200 rounded-lg placeholder:text-gray-500 placeholder:text-opacity-70 focus:outline-none text-sm md:text-base"
                />
              )}
              {type === "video" && (
                <input
                  onChange={handleChange}
                  name="video"
                  type="file"
                  placeholder="Ingresa el enlace al video"
                  className="text-gray-800 border border-gray-300 w-full h-12 mt-1 px-4 py-2 bg-gray-200 rounded-lg placeholder:text-gray-500 placeholder:text-opacity-70 focus:outline-none text-sm md:text-base"
                />
              )}
              <button
                type="button"
                onClick={handleModalSubmit}
                className="rounded-md bg-yellowMain text-purpleMain flex items-center justify-center py-2 px-4 hover:shadow-lg"
              >
                Crear
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CreateLesson;
