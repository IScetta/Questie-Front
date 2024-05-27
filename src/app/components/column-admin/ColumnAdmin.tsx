"use client";

import { ICourse, IPayload, IUser } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { getCoursesDB } from "@/helpers/course.helpers";
import { getAllUsers, getUserById } from "@/helpers/user.helper";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ColumnAdmin = () => {
  const { token, payload } = useAuth();

  const [admin, setAdmin] = useState<IUser | null>(null);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [allCourses, setAllCourses] = useState<ICourse[]>([]);
  const [payloadParsed, setPayloadParsed] = useState<IPayload | null>(null);

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

  useEffect(() => {
    const getAdmin = async () => {
      if (
        (token && payloadParsed?.isAdmin === "admin") ||
        payloadParsed?.role === "admin"
      ) {
        const admin = await getUserById(payloadParsed?.id, token);
        setAdmin(admin);
      }
    };

    const getUsers = async () => {
      const users = await getAllUsers(token);
      setAllUsers(users);
    };

    const getCourses = async () => {
      const courses: ICourse[] = await getCoursesDB(false);
      setAllCourses(courses);
    };

    getCourses();
    getUsers();
    getAdmin();
  }, [payloadParsed, token]);

  return (
    <div className="h-full w-80 bg-purpleMainLight p-7 flex flex-col justify-start items-center">
      <div className="bg-image rounded-full h-52 w-52 my-6 content-center justify-items-center">
        {admin?.profile_pic && (
          <Image
            src={admin.profile_pic}
            alt={admin.firstName}
            width={1000}
            height={1000}
          />
        )}
      </div>

      <button className="bg-yellowMain text-purpleMain h-10 w-52 text-lg font-semibold">
        <Link href={"/admin/create-course"}>Agregar Curso</Link>
      </button>

      <div className="text-lg text-center my-5">
        <p className="text-2xl font-semibold mb-4">
          {admin?.firstName} {admin?.lastName}
        </p>
        <div className="flex flex-col text-center gap-2">
          <p>Cursos Totales: {allCourses.length}</p>
          <p>Alumnos Totales: {allUsers.length}</p>
        </div>
      </div>
    </div>
  );
};

export default ColumnAdmin;
