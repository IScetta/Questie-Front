"use client";

import { ICreateLessonModule, ILesson, ILessonOrder } from "@/app/types";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCallback, useEffect, useState } from "react";
import {
  FaCaretDown,
  FaCaretUp,
  FaCheckCircle,
  FaTimesCircle,
  FaTrashAlt,
} from "react-icons/fa";
import ListLesson from "./order-lesson/list-lesson/ListLesson";
import { deleteLessonBD } from "@/helpers/createLesson";
import { useAuth } from "@/context/AuthContext";
import EditLessonModal from "../edit-lesson-modal";
import { getLessons, putLessonOrder } from "@/helpers/lesson.helper";
import Swal from "sweetalert2";
import Link from "next/link";

const CreateLessonModule = ({
  id,
  content,
  fetchCourses,
}: {
  content: any;
  id: string;
  fetchCourses: any;
}) => {
  const { token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [lessonOrder, setLessonOrder] = useState<ILesson[]>(content);
  const [allLessons, setAllLessons] = useState<ILesson[]>([]);
  const [lessons, setLessons] = useState<ILesson[]>([]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    const oldIndex = lessonOrder.findIndex((lesson) => lesson.id === active.id);
    const newIndex = lessonOrder.findIndex((lesson) => lesson.id === over.id);

    const newOrder = arrayMove(lessonOrder, oldIndex, newIndex);
    setLessonOrder(newOrder);
  };

  const fetchLessons = useCallback(async () => {
    try {
      const response: ILesson[] = await getLessons(token!);
      setAllLessons(response);
      if (!response) throw new Error("Error al intentar traer las lecciones");
    } catch (error: any) {
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  useEffect(() => {
    const actLesson = allLessons.filter((lesson) =>
      content.some((item: any) => item.id === lesson.id)
    );
    setLessons(actLesson);
  }, [allLessons, content]);

  const deleteLesson = async (lesson_id: string) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, eliminarlo!",
      });

      if (result.isConfirmed) {
        const response = await deleteLessonBD(lesson_id, token!);
        Swal.fire({
          title: "¡Eliminado!",
          text: "La leccion ha sido eliminada.",
          icon: "success",
        });
        fetchCourses();
        window.location.reload();
        if (!response) throw new Error("Error al eliminar la lección");
      }
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  const ordenLesson = async () => {
    const listLesson: ILessonOrder[] = [];
    const newOrderLesson = lessonOrder.map((lessonOrden, index) => {
      listLesson.push({
        id: lessonOrden.id,
        updateLessonDto: {
          order: index,
        },
      });
    });

    try {
      const response = await putLessonOrder(listLesson, token!);
      if (!response) throw new Error("Error al actualizar la lección");
      setIsOrder(!isOrder);
    } catch (error) {
      console.error("Error update lesson:", error);
    }
  };

  const statusLesson = async (id: string, status: string) => {
    let listLesson: ILessonOrder[] = [];
    if (status === "pending") {
      listLesson = [
        {
          id: id,
          updateLessonDto: {
            status: "complete",
          },
        },
      ];
    } else if (status === "complete") {
      listLesson = [
        {
          id: id,
          updateLessonDto: {
            status: "pending",
          },
        },
      ];
    }

    try {
      const response = await putLessonOrder(listLesson, token!);
      if (!response) throw new Error("Error al actualizar la lección");
      window.location.reload();
    } catch (error) {
      console.error("Error update lesson:", error);
    }
  };

  return (
    <div>
      <button
        className="flex flex-row items-center m-2 p-2 bg-purpleMain text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        Lecciones{" "}
        {isOpen ? (
          <FaCaretUp className="text-white w-4 h-auto cursor-pointer" />
        ) : (
          <FaCaretDown className="text-white w-4 h-auto cursor-pointer" />
        )}
      </button>

      {isOpen && (
        <div>
          {content.length ? (
            <div>
              {isOrder ? (
                <button
                  className={`flex flex-row items-center m-2 p-2 ${
                    isOrder ? "bg-light-green-600" : "bg-gray-400"
                  } text-white`}
                  onClick={ordenLesson}
                >
                  Guardar
                </button>
              ) : (
                <button
                  className={`flex flex-row items-center m-2 p-2 ${
                    isOrder ? "bg-light-green-600" : "bg-gray-400"
                  } text-white`}
                  onClick={() => setIsOrder(!isOrder)}
                >
                  Ordenar
                </button>
              )}

              {isOrder ? (
                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={lessonOrder}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="flex flex-col">
                      {lessonOrder.map((lesson) => (
                        <ListLesson key={lesson.id} lesson={lesson} />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              ) : (
                <div>
                  {lessonOrder.map((lesson, index) => (
                    <div
                      className="flex flex-row m-4 justify-between items-center bg-purpleMainLight rounded-lg"
                      key={index}
                    >
                      <h4 className="p-4 m-2 text-[18px]">{lesson.title}</h4>
                      <div className="flex flex-row">
                        <div className="flex flex-row justify-center items-center">
                          <div className="flex-row m-2 relative group inline-block">
                            <button
                              onClick={() => deleteLesson(lesson.id)}
                              className="p-1 m-2 w-fit hover:text-red-500 hover:bg-gray-700 rounded-lg"
                            >
                              <FaTrashAlt className="text-[25px]" />
                            </button>
                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 px-2 py-1 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                              Eliminar Lección
                            </div>
                          </div>
                          <div className="flex-row m-2 relative group inline-block">
                            <EditLessonModal lesson_id={lesson.id} />
                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 px-2 py-1 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                              Editar Información
                            </div>
                          </div>
                          {lesson.status === "complete" ? (
                            <div className="flex-row m-2 relative group inline-block">
                              <button
                                onClick={() =>
                                  statusLesson(lesson.id, lesson.status)
                                }
                                className="p-2 m-4 w-fit bg-light-green-500 rounded-lg"
                              >
                                <FaCheckCircle className="text-[20px]" />
                              </button>
                              <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 px-2 py-1 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                Finalizado
                              </div>
                            </div>
                          ) : (
                            <div className="flex-row m-2 relative group inline-block">
                              <button
                                onClick={() =>
                                  statusLesson(lesson.id, lesson.status)
                                }
                                className="p-2 m-4 w-fit bg-red-500 rounded-lg"
                              >
                                <FaTimesCircle className="text-[20px]" />
                              </button>
                              <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 px-2 py-1 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                En Proceso
                              </div>
                            </div>
                          )}
                        </div>
                        <Link
                          href={`/admin/create-lesson/${lesson.id}`}
                          className="p-2 m-4 w-fit text-[18px] bg-yellowMain rounded-lg"
                        >
                          Editar contenido
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <h4 className="p-2 m-2 text-[16px] bg-purpleMainLight rounded-lg">
              No se encuentran lecciones para este módulo
            </h4>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateLessonModule;