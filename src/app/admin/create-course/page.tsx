"use client";

import CreateCourseColumn from "@/app/components/create-course/create-course-column";
import CreateCourseForm from "@/app/components/create-course/create-course-form";
import { IPayload } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreateCourse: React.FC = (): JSX.Element => {
  const [payloadParsed, setPayloadParse] = useState<IPayload>({
    id: "",
    email: "",
    isAdmin: "",
    sub: "",
    iat: 0,
    exp: 0,
  });

  const { token, payload } = useAuth();
  const route = useRouter();

  useEffect(() => {
    const payloadParse = async () => {
      if (payload === Object(payload)) {
        setPayloadParse(payload);
      } else {
        setPayloadParse(JSON.parse(payload));
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
    <>{route.push("/")}</>
  );
};

export default CreateCourse;
