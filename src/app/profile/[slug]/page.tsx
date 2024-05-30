"use client";

import ColumnProfile from "@/app/components/column-profile";
import Progress from "@/app/components/progress/Progress";
import { ICourse, IEnrolment, IPayload, IUser } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { getCoursesDB } from "@/helpers/course.helpers";
import { getEnrolmentsByUser } from "@/helpers/enrolments.helper";
import { getUserById } from "@/helpers/user.helper";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Profile = ({ params }: { params: { slug: string } }): JSX.Element => {
  const { slug } = params;
  const { token, payload } = useAuth();
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<IUser>({
    id: "",
    username: "",
    password: "",
    email: "",
    profile_pic: "",
    firstName: "",
    lastName: "",
    birthdate: "",
    role: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
  });

  const [userCourses, setUserCourses] = useState<ICourse[]>([]);
  const [userCoursesEnrolments, setUserCoursesEnrolments] = useState<
    IEnrolment[]
  >([]);

  useEffect(() => {
    if (!token || !payload) return;

    let parsedPayload: IPayload | undefined;

    const fetchUser = async () => {
      try {
        parsedPayload =
          typeof payload === "string" ? JSON.parse(payload) : payload;
        if (!parsedPayload) {
          return;
        }
        const user = await getUserById(parsedPayload.id, token);
        setUser(user);
        fetchUserCourses(user.id);
      } catch (error: any) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un problema al cargar los datos del usuario. Por favor, inténtalo de nuevo más tarde.",
        });
      }
    };

    const fetchUserCourses = async (userId: string) => {
      try {
        const userEnrolments: IEnrolment[] | null = await getEnrolmentsByUser(
          token,
          userId
        );

        if (!userEnrolments) return;

        const courses: ICourse[] = await getCoursesDB();
        const userCourses: ICourse[] = courses.filter((course) =>
          userEnrolments?.some((enrolment) => enrolment.course === course.id)
        );

        setUserCoursesEnrolments(userEnrolments);
        setUserCourses(userCourses);
        setLoading(false);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchUser();
  }, [token, payload]);

  if (!token || !payload) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1>Debe registrarse e iniciar sesión para ver su perfil</h1>
        <div className="flex flex-row justify-center items-center mt-2 gap-2">
          <Link
            href="/sign-up"
            className="bg-yellowMain hover:bg-yellowMainLight px-4 py-2 rounded font-semibold text-purpleMain"
          >
            Registrarse
          </Link>
          <Link
            href="/sign-in"
            className="bg-yellowMain hover:bg-yellowMainLight px-4 py-2 rounded font-semibold text-purpleMain"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex mx-[11.5rem] justify-center h-full">
      <div>
        <ColumnProfile userInfo={user} userCourses={userCoursesEnrolments} />
      </div>
      <div className="ml-10 mt-10 w-full flex flex-col justify-start h-full">
        {loading ? (
          <div className="animate-pulse">
            <h1 className="text-4xl mt-18 h-8 bg-gray-300 rounded"></h1>
            <div className="flex flex-row w-full bg-blue-gray-50 mt-8 p-8 justify-between items-center rounded">
              <p className="h-6 bg-gray-300 rounded w-1/4"></p>
              <div className="flex items-center">
                <div className="h-4 bg-gray-300 rounded w-16"></div>
                <div className="bg-yellowMain h-6 rounded-md px-4 py-2 text-xl font-semibold ml-4 w-16"></div>
              </div>
            </div>
            <div className="flex flex-row w-full bg-blue-gray-50 mt-8 p-8 justify-between items-center rounded">
              <p className="h-6 bg-gray-300 rounded w-1/4"></p>
              <div className="flex items-center">
                <div className="h-4 bg-gray-300 rounded w-16"></div>
                <div className="bg-yellowMain h-6 rounded-md px-4 py-2 text-xl font-semibold ml-4 w-16"></div>
              </div>
            </div>
            <div className="flex flex-row w-full bg-blue-gray-50 mt-8 p-8 justify-between items-center rounded">
              <p className="h-6 bg-gray-300 rounded w-1/4"></p>
              <div className="flex items-center">
                <div className="h-4 bg-gray-300 rounded w-16"></div>
                <div className="bg-yellowMain h-6 rounded-md px-4 py-2 text-xl font-semibold ml-4 w-16"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-4xl mt-18 font-bold">
              Continuar con los cursos
            </h1>
            {userCourses.length > 0 ? (
              userCourses.map((course) => (
                <div
                  key={course?.id}
                  className="flex flex-row w-full bg-blue-gray-50 mt-8 p-8 justify-between items-center rounded"
                >
                  <div className="flex flex-col w-full space-y-3">
                    <p className="text-xl font-semibold text-start">
                      {course?.title}
                    </p>
                    <Progress courseId={course.id} userId={user.id} />
                  </div>
                  <div className="flex items-center">
                    <Link
                      href={`/course-review/${course?.id}`}
                      className="bg-yellowMain text-purpleMain rounded-md px-4 py-2 text-xl font-semibold ml-4"
                    >
                      Continuar
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-row w-full bg-blue-gray-50 mt-8 p-8 justify-between items-center rounded">
                <p className="text-xl font-semibold text-start">
                  No tienes cursos en este momento
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
