"use client";

import { ICourse, IModule, IPayload } from "@/app/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Modal } from "@/app/components/modal/Modal";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { checkEnrolment, createEnrolment } from "@/helpers/enrolments.helper";
import { getCourseModules } from "@/helpers/course.helpers";
import Assessment from "../../assessments/assessment";

const HeaderCourse = ({ course }: { course: ICourse }) => {
  const [openModal, setOpenModal] = useState(false);
  const [enrolmentExists, setEnrolmentExists] = useState(true);
  const [courseAssessment, setCourseAssessment] = useState(0);
  const [payloadParsed, setPayloadParsed] = useState<IPayload | null>(null);

  let { payload, token } = useAuth();
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

  //CHECK IF USER ALREADY ENROLLED
  useEffect(() => {
    if (!token || !payloadParsed) return;

    const userAlreadyEnrolled = async () => {
      const enrolment = await checkEnrolment(
        token,
        course.id,
        payloadParsed.id
      );
      setEnrolmentExists(enrolment);
    };

    userAlreadyEnrolled();
  }, [course.id, payloadParsed, token]);

  const handleAssessmentChange = (newAssessment: number) => {
    setCourseAssessment(newAssessment);
    // Aquí puedes agregar lógica para guardar la valoración en la base de datos si es necesario
  };

  async function enrolStudent(courseId: string) {
    if (enrolmentExists) {
      alert("Ya estás inscrito");
      return;
    }

    setOpenModal(false);

    if (!token || !payloadParsed) {
      alert("Debe iniciar sesión para continuar");
      return;
    }

    if (typeof payload !== "object") {
      payload = JSON.parse(payload);
    }

    const enrolmentId: string | null = await createEnrolment(
      token,
      courseId,
      payloadParsed.id
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
      <div className="flex flex-col md:flex-row bg-gray-900 justify-center w-screen md:w-full">
        <div className="flex flex-col m-2 md:m-4 text-white">
          <h1 className="text-2xl md:text-5xl m-4 backdrop-blur-sm">
            {course.title}
          </h1>
          <p className="text-base md:text-lg my-2 ml-4">{course.headline}</p>
          <Assessment
            courseId={course.id}
            initialAssessment={courseAssessment}
            onAssessmentChange={handleAssessmentChange}
          />
          {!enrolmentExists ? (
            <button
              className="flex justify-center bg-yellowMain text-purpleMain text-base font-semibold cursor-pointer md:px-4 md:py-2 rounded-lg"
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
        <div className="flex justify-center md:items-center p-4">
          <Image
            className="rounded-2xl border-2 border-yellowMain"
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
