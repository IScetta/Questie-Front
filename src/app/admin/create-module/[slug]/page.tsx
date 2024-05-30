"use client";

import ColumnAdmin from "@/app/components/column-admin";
import CreateLessonModule from "@/app/components/create-course/create-lesson-module/CreateLessonModule";
import CreateLessonButton from "@/app/components/create-course/create-lesson-module/order-lesson/create-lesson-button";
import CreateModuleButton from "@/app/components/create-course/create-module/create-module-button";
import EditModule from "@/app/components/create-course/edit-module-modal";
import { ICourse, IPayload } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { getCourseByIdDB } from "@/helpers/course.helpers";
import { deleteModuleBD } from "@/helpers/createModule.helper";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const CreateCourse: React.FC<{ params: { slug: string } }> = ({ params }) => {
  const { token, payload } = useAuth();
  const { slug } = params;

  const [course, setCourse] = useState<ICourse | null>(null);
  const [payloadParsed, setPayloadParsed] = useState<IPayload | null>(null);

  const fetchCourse = useCallback(async () => {
    try {
      const course: ICourse = await getCourseByIdDB(slug);
      setCourse(course);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  }, [slug]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  useEffect(() => {
    const parsePayload = () => {
      if (payload) {
        try {
          const parsedPayload =
            typeof payload === "string" ? JSON.parse(payload) : payload;
          setPayloadParsed(parsedPayload);
        } catch (error) {
          console.error("Error parsing payload:", error);
        }
      }
    };
    parsePayload();
  }, [payload]);

  const hasAccess =
    token &&
    (payloadParsed?.isAdmin === "admin" || payloadParsed?.role === "admin");

  if (!hasAccess) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl">
          No tiene las Credenciales para Acceder al sitio.
        </h1>
        <Link
          className="flex justify-center items-center bg-yellowMain rounded-md text-purpleMain h-10 w-52 ml-7 text-lg mt-5"
          href="/"
        >
          Volver
        </Link>
      </div>
    );
  }

  const deleteModule = async (module_id: string) => {
    try {
      await deleteModuleBD(module_id, token!);
      fetchCourse();
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  return (
    <div className="flex mx-[11.5rem] justify-center h-full">
      <div className="flex flex-grow-0">
        <ColumnAdmin />
      </div>
      <div className="ml-10 mt-10 w-full flex flex-col justify-start h-full mb-8">
        <h1 className="flex justify-center text-[24px] m-4 p-2 bg-purpleMainLighter rounded-xl">
          Editar Contenido para el curso: {course?.title}
        </h1>
        <div className="flex flex-col">
          <div className="flex flex-row justify-around">
            <CreateModuleButton course={course!} />

            <div className="flex-row m-2 relative group inline-block">
              <Link
                href={`/admin/edit-categories/${course?.id}`}
                className="flex w-fit p-2 m-2 rounded-md border-2 border-purpleMain bg-yellowMain hover:bg-yellowMainLight text-[20px] "
              >
                Editar Categorias
              </Link>
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 px-2 py-1 shadow-[0_5px_15px_0px_#00000042] bg-white text-xl rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <h3 className="border-b-2 border-gray-400 p-2 m-2">Categorias:</h3>{course?.categories.map((category,index)=>(
                  <div className="text-[18px] p-2 m-2" key={index}>{category.name}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full m-6 p-4 bg-white rounded-xl border-2 shadow-[0_5px_15px_0px_#00000042]">
            <h2 className="text-[22px] leading-6">Este curso incluye:</h2>
            {course?.modules.map((module, index) => (
              <div
                className="flex flex-col bg-purpleMainLighter rounded-xl border-2 border-purpleMain m-2 p-2"
                key={index}
              >
                <div className="flex flex-row justify-between">
                  <div>
                    <h4 className="text-[16px]">Modulo:</h4>
                    <h3 className="mb-2 p-2 text-[20px]">{module.title}</h3>
                  </div>
                  <div className="flex flex-row items-center">
                    <div className="flex-row m-2 relative group inline-block">
                      <button
                        onClick={() => deleteModule(module.id)}
                        className="p-1 m-4 w-fit hover:bg-red-500 rounded-lg"
                      >
                        <FaTrashAlt className="text-[30px]" />
                      </button>
                      <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 px-2 py-1 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        Eliminar Modulo
                      </div>
                    </div>

                    <CreateLessonButton
                      order_n={module.lessons.length}
                      moduleId={module.id}
                      fetchCourses={fetchCourse}
                    />

                    <EditModule module={module} />
                  </div>
                </div>
                <CreateLessonModule
                  id={module.id}
                  content={module.lessons}
                  fetchCourses={fetchCourse}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
