"use client";

import ColumnAdmin from "@/app/components/column-admin";
import CreateLessonModule from "@/app/components/create-course/create-lesson-module/CreateLessonModule";
import CreateLessonButton from "@/app/components/create-course/create-lesson-module/order-lesson/create-lesson-button";
import CreateModuleButton from "@/app/components/create-course/create-module/create-module-button";
import { ICourse, IPayload } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { getCourseByIdDB } from "@/helpers/course.helpers";
import Link from "next/link";
import { useEffect, useState } from "react";

const CreateCourse: React.FC<{ params: { slug: string } }> = ({ params }) => {
  const { token, payload } = useAuth();
  const { slug } = params;

  const [course, setCourse] = useState<ICourse | null>(null);
  const [payloadParsed, setPayloadParsed] = useState<IPayload | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const course: ICourse = await getCourseByIdDB(slug);
        setCourse(course);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    fetchCourse();
  }, [slug]);

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

  return (
    <div className="flex mx-[11.5rem] justify-center h-full">
      <div className="flex flex-grow-0">
        <ColumnAdmin />
      </div>
      <div className="ml-10 mt-10 w-full flex flex-col justify-start h-full mb-8">
        <h1 className="text-[24px] m-4 p-2 bg-purpleMainLighter rounded-xl">
          Crear Modulos para el curso: {course?.title}
        </h1>
        <div className="flex flex-col">
          <CreateModuleButton course={course!} />
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
                    <CreateLessonButton
                      order_n={module.lessons.length}
                      moduleId={module.id}
                    />
                    <button className="mx-2 p-2 border-2 rounded-md border-gray-600 bg-blue-gray-200 hover:bg-blue-gray-100">
                      Editar Modulo
                    </button>
                  </div>
                </div>
                <CreateLessonModule id={module.id} content={module.lessons} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
