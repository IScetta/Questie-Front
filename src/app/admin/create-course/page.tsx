"use client";

import CreateCourseColumn from "@/app/components/create-course/create-course-column";
import CreateCourseForm from "@/app/components/create-course/create-course-form";
import { IPayload } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreateCourse: React.FC = (): JSX.Element => {
  const [payloadParsed, setPayloadParsed] = useState<IPayload | null>(null);

  const { token, payload } = useAuth();
  const route = useRouter();

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

  return token && payloadParsed?.isAdmin === "admin" ? (
    <div className="flex mx-[11.5rem] justify-center h-full">
      <div className="flex flex-grow-0">
        <CreateCourseColumn />
      </div>
      <div className="mt-10 w-full flex flex-col justify-center h-full mb-8">
        <h1 className="text-[24px] m-4 p-2 bg-purpleMainLighter rounded-xl">
          Crear Nuevo Curso
        </h1>
        <div className=" flex flex-col w-[50%] ml-[25%] p-4 bg-white rounded-xl border-2 shadow-[0_5px_15px_0px_#00000042]">
          <CreateCourseForm />
        </div>
      </div>
    </div>
  ) : (
    <div className=" flex flex-col justify-center items-center">
      <h1 className=" text-xl"> No tiene las Credenciales para Acceder al sitio.</h1>
      <Link className="flex justify-center items-center bg-yellowMain rounded-md text-purpleMain h-10 w-52 ml-7 text-lg mt-5" href={"/"}>Volver</Link>
    </div>
  );
};

export default CreateCourse;
