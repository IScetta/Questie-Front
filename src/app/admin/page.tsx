"use client";

import ColumnAdmin from "../components/column-admin";
import { ICourse, IPayload } from "../types";
import { getCoursesDB } from "@/helpers/course.helpers";
import AdminCourses from "../components/dashboard-admin/admin-courses";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdimDashborad: React.FC = (): JSX.Element => {
  const { token, payload } = useAuth();
  const route = useRouter();

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [payloadParsed, setPayloadParsed] = useState<IPayload | null>(null);

  useEffect(() => {
    const getCourses = async () => {
      const courses: ICourse[] = await getCoursesDB();
      setCourses(courses);
    };
    getCourses();
  }, []);

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
        <ColumnAdmin />
      </div>
      <div className="ml-10 mt-10 w-full flex flex-col justify-start h-full mb-8">
        <div className="flex justify-evenly ">
          <button className="bg-yellowMain text-purpleMain h-10 w-52 ml-7 text-lg mt-5">
            <p>Categorias </p>
          </button>

          <button className="bg-yellowMain text-purpleMain h-10 w-52 ml-7 text-lg mt-5">
            <p>Alumnos inscriptos</p>
          </button>
        </div>

        <AdminCourses courses={courses} />
      </div>
    </div>
  ) : (
    <div className=" flex flex-col justify-center items-center">
      <h1 className=" text-xl"> No tiene las Credenciales para Acceder al sitio.</h1>
      <Link className="flex justify-center items-center bg-yellowMain rounded-md text-purpleMain h-10 w-52 ml-7 text-lg mt-5" href={"/"}>Volver</Link>
    </div>
  );
};

export default AdimDashborad;
