"use client";

import { ICreateLessonModule, ILesson } from "@/app/types";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { FaCaretDown, FaCaretUp, FaCheckCircle, FaEdit, FaTimesCircle, FaTrashAlt } from "react-icons/fa";
import ListLesson from "./order-lesson/list-lesson/ListLesson";
import { deleteLessonBD } from "@/helpers/createLesson";
import { useAuth } from "@/context/AuthContext";
import EditLessonModal from "../edit-lesson-modal";


const CreateLessonModule = ({
  id,
  content,
  fetchCourses
}: {
  content: ICreateLessonModule[];
  id: string;
  fetchCourses:any
}) => {
  const {token} = useAuth()
  const [isOpen, setIsOpen] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [lesson, setLesson] = useState<ICreateLessonModule[]>(content);


  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    const oldIndex = lesson.findIndex((lesson) => lesson.id === active.id);
    const newIndex = lesson.findIndex((lesson) => lesson.id === over.id);

    const newOrder = arrayMove(lesson, oldIndex, newIndex);
    setLesson(newOrder);
  };

  const deleteLesson = async (lesson_id:string)=>{
      try {
       const response = await deleteLessonBD(lesson_id, token!);
       
       window.location.reload();
        // fetchCourse();
      } catch (error) {
        console.error("Error deleting module:", error);
      }
  }

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

      {isOpen ? (
        <div>
          {content.length ? (
            <div>
              {isOrder ? (
                <button
                  className="flex flex-row items-center m-2 p-2 bg-light-green-600 text-white"
                  onClick={() => setIsOrder(!isOrder)}
                >
                  Guardar
                </button>
              ) : (
                <button
                  className="flex flex-row items-center m-2 p-2 bg-gray-400 "
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
                    items={lesson}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className=" flex flex-col">
                      {lesson.map((lesson) => (
                        <ListLesson key={lesson.id} lesson={lesson} />
                      ))}
                    </div>
                  </SortableContext>
                  {/* <button onClick={mostrar} className="border-2 p-2 m-2 ">mostrar orden</button> */}
                </DndContext>
              ) : (
                <div>
                  {lesson.map((lesson, index) => (
                    <div
                      className=" flex flex-row m-4 justify-between items-center bg-purpleMainLight rounded-lg"
                      key={index}
                    >
                      <h4 className="p-4 m-2 text-[18px]  ">{lesson.title}</h4>
                      <div className=" flex flex-row">
                        <div className=" flex flex-row justify-center items-center">
                        <div className="flex-row m-2 relative group inline-block">
                      <button
                        onClick={() => deleteLesson(lesson.id)}
                        className="p-1 m-2 w-fit hover:text-red-500 hover:bg-gray-700 rounded-lg"
                      >
                        <FaTrashAlt className="text-[25px]" />
                      </button>
                      <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 px-2 py-1 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        Eliminar Leccion
                      </div>
                    </div>
                          <div className=" flex-row m-2 relative group inline-block">
                            <EditLessonModal lesson_id={lesson.id}/>
                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 px-2 py-1  bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                              Editar Informacion
                            </div>
                          </div>
                          {isReady ? (
                            <div className=" flex-row m-2 relative group inline-block">
                              <button onClick={() => setIsReady(!isReady)} className="p-2 m-4  w-fit  bg-light-green-500 rounded-lg">
                                <FaCheckCircle className="text-[20px]" />
                              </button>
                              <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 px-2 py-1  bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                Finalizado
                              </div>
                            </div>
                          ) : (
                            <div className=" flex-row m-2 relative group inline-block">
                              <button onClick={() => setIsReady(!isReady)} className="p-2 m-4  w-fit text-[20px]  bg-red-500 rounded-lg ">
                              <FaTimesCircle className="text-[20px]" />
                              </button>
                              <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 px-2 py-1  bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                En Proceso
                              </div>
                            </div>
                          )}
                        </div>
                        <button className="p-2 m-4  w-fit text-[18px] bg-yellowMain rounded-lg">
                          Editar contenido
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h4 className="p-2 m-2 text-[16px] bg-purpleMainLight rounded-lg">
                No se encuentran lecciones para este modulo
              </h4>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreateLessonModule;
