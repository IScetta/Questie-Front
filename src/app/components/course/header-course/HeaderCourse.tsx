"use client";

import { ICourse, IModule, IPayload } from "@/app/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Modal } from "@/app/components/modal/Modal";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { checkEnrolment, createEnrolment } from "@/helpers/enrolments.helper";
import { getCourseModules } from "@/helpers/course.helpers";

const HeaderCourse = ({ course }: { course: ICourse }) => {
  const [openModal, setOpenModal] = useState(false);
  const [enrolmentExists, setEnrolmentExists] = useState(true);
  let { payload, token } = useAuth();
  const route = useRouter();

  //CHECK IF USER ALREADY ENROLLED
  useEffect(() => {
    if (!token || !payload) return;

    let parsedPayload: IPayload;

    if (typeof payload !== "object") {
      parsedPayload = JSON.parse(payload);
    }

    const userAlreadyEnrolled = async () => {
      const enrolment = await checkEnrolment(
        token,
        course.id,
        parsedPayload.id
      );
      setEnrolmentExists(enrolment);
    };

    userAlreadyEnrolled();
  }, [course.id, payload, token]);

  async function enrolStudent(courseId: string) {
    if (enrolmentExists) {
      alert("Ya estás inscrito");
      return;
    }

    setOpenModal(false);

    if (!token || !payload) {
      alert("Debe iniciar sesión para continuar");
      return;
    }

    if (typeof payload !== "object") {
      payload = JSON.parse(payload);
    }

    const enrolmentId: string | null = await createEnrolment(
      token,
      courseId,
      payload.id
    );

    if (enrolmentId) {
      const courseModules: Pick<IModule, "id" | "title" | "lessons">[] =
        await getCourseModules(courseId);
      const moduleId: string = courseModules[0].id;
      route.push(`/module/${moduleId}`);
    } else {
      alert("Error al crear la inscripción");
    }
  }

  return (
    <div className="">
      <div className="flex flex-row bg-gray-900  justify-center">
        <div className="flex flex-col m-4 text-white">
          <h1 className="text-5xl m-4 backdrop-blur-sm">{course.title}</h1>
          <p className="text-lg my-2 ml-6">{course.headline}</p>
          {!enrolmentExists ? (
            <button
              className="flex justify-center bg-yellowMain text-purpleMain text-base font-semibold cursor-pointer px-4 py-2 rounded-lg"
              onClick={() => setOpenModal(true)}
            >
              Iniciar Curso
            </button>
          ) : null}
          <Modal openModal={openModal} setOpenModal={setOpenModal}>
            {payload ? (
              <div>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  ¿Estás seguro que deseas iniciar este curso?
                </h3>
                <div className="flex justify-center gap-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    onClick={() => enrolStudent(course.id)}
                  >
                    {"Sí, estoy seguro"}
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                    onClick={() => setOpenModal(false)}
                  >
                    No, cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Inicia sesión para continuar
                </h3>
                <button
                  className="py-2 px-4 rounded-lg bg-purpleMain hover:bg-purpleMainLight hover:text-gray-700 text-white"
                  onClick={() => route.push("/sign-in")}
                >
                  Iniciar sesión
                </button>
              </div>
            )}
          </Modal>
        </div>
        <div className="flex justify-center items-center p-4">
          <Image
            className=" rounded-2xl border-2 border-yellowMain "
            src={course.image}
            alt="video"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderCourse;
