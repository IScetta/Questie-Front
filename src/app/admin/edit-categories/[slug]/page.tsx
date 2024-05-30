"use client";

import ColumnAdmin from "@/app/components/column-admin";
import EditCategoriesForm from "@/app/components/create-course/edit-categories-form";
import EditCourseForm from "@/app/components/dashboard-admin/edit-course/EditCourseForm";
import { ICourse, IPayload } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { getCourseByIdDB } from "@/helpers/course.helpers";
import Link from "next/link";
import { useEffect, useState } from "react";

const CreateCourse: React.FC<{ params: { slug: string } }> = ({
  params,
}): JSX.Element => {
  const [payloadParsed, setPayloadParsed] = useState<IPayload | null>(null);
  const [course, setCourse] = useState<ICourse | null>();
  const { token, payload } = useAuth();
  const { slug } = params;
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
    const payloadParse = () => {
      if (payload) {
        if (typeof payload === "string") {
          try {
            const parsedPayload = JSON.parse(payload);
            setPayloadParsed(parsedPayload);
          } catch (error) {
            console.error("Error parsing payload:", error);
          }
        } else {
          setPayloadParsed(payload);
        }
      }
    };
    payloadParse();
  }, [payload]);

  console.log(course);

  return (token && payloadParsed?.isAdmin === "admin" && course != null) ||
    payloadParsed?.role === "admin" ? (
    <div className="flex mx-[11.5rem] justify-center h-full">
      <div className="flex flex-grow-0">
        <ColumnAdmin />
      </div>
      <div className="mt-10 w-full flex flex-col justify-center h-full mb-8">
        <h1 className="text-[24px] m-4 p-2 bg-purpleMainLighter rounded-xl">
          Editar Categorias del Curso {course?.title}
        </h1>
        <div className=" flex flex-col w-[50%] ml-[25%] p-4 bg-white rounded-xl border-2 shadow-[0_5px_15px_0px_#00000042]">
          <EditCategoriesForm course={course!}/>
        </div>
      </div>
    </div>
  ) : (
    <div className=" flex flex-col justify-center items-center">
      <h1 className=" text-xl">
        {" "}
        No tiene las Credenciales para Acceder al sitio.
      </h1>
      <Link
        className="flex justify-center items-center bg-yellowMain rounded-md text-purpleMain h-10 w-52 ml-7 text-lg mt-5"
        href={"/"}
      >
        Volver
      </Link>
    </div>
  );
};

export default CreateCourse;