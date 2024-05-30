"use client";

import { ICourse, IModule, IPayload, IProduct } from "@/app/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Modal } from "@/app/components/modal/Modal";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { checkEnrolment, createEnrolment } from "@/helpers/enrolments.helper";
import {
  getCourseModules,
  getCourseProductById,
} from "@/helpers/course.helpers";
import Assessment from "../../assessments/assessment";
import { FaCoins, FaLock } from "react-icons/fa";
import { addCoins } from "@/helpers/user.helper";
import { useUserContext } from "@/context/UserContext";

const HeaderCourse = ({ course }: { course: ICourse }) => {
  const [openModal, setOpenModal] = useState(false);
  const [enrolmentExists, setEnrolmentExists] = useState(true);
  const [courseAssessment, setCourseAssessment] = useState(0);
  const [payloadParsed, setPayloadParsed] = useState<IPayload | null>(null);
  const [courseProduct, setCourseProduct] = useState<IProduct | null>(null);
  const { fetchUserStats } = useUserContext();

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

  //GET COURSE PRODUCT
  useEffect(() => {
    if (!token || !payloadParsed) return;

    const getCourseProduct = async () => {
      const courseProduct = await getCourseProductById(course.id);
      setCourseProduct(courseProduct);
    };

    if (course.isProduct) getCourseProduct();
  }, [course.id, course.isProduct, payloadParsed, token]);

  async function enrolStudent(courseId: string) {
    if (enrolmentExists) {
      alert("Ya estás inscrito");
      return;
    }

    if (!token || !payloadParsed) {
      alert("Debe iniciar sesión para continuar");
      return;
    }

    if (typeof payload !== "object") {
      payload = JSON.parse(payload);
    }

    if (course.isProduct) {
      const courseProduct = await getCourseProductById(course.id);
      if (!courseProduct) return;
    }

    await addCoins(token!, payloadParsed.id, -courseProduct?.price!);

    const enrolmentId: string | null = await createEnrolment(
      token,
      courseId,
      payloadParsed.id
    );

    if (enrolmentId) {
      const courseModules: Pick<IModule, "id" | "title" | "lessons">[] =
        await getCourseModules(courseId);

      const moduleId: string = courseModules[0].id;

      setOpenModal(false);

      fetchUserStats();

      route.push(`/module/${moduleId}`);
    } else {
      alert("Error al crear la inscripción");
    }
  }

  return (
    <div className="">
      <div className="flex flex-col md:flex-row bg-gray-900 justify-center w-screen md:w-full">
        <div className="flex flex-col m-2 md:m-4 text-white px-4 space-y-4">
          <h1 className="text-2xl md:text-5xl mt-4 backdrop-blur-sm">
            {course.title}
          </h1>
          <p className="text-base md:text-lg my-2">{course.headline}</p>
          <Assessment
            courseId={course.id}
            initialAssessment={courseAssessment}
            userId={payloadParsed?.id!}
          />
          {!enrolmentExists ? (
            <button
              className="flex items-center justify-center bg-yellowMain text-purpleMain text-base font-semibold cursor-pointer md:px-4 md:py-2 rounded-lg"
              onClick={() => setOpenModal(true)}
            >
              Iniciar Curso
              {course.isProduct ? <FaLock className="ml-2" /> : <></>}
            </button>
          ) : null}
          <Modal openModal={openModal} setOpenModal={setOpenModal}>
            {payload ? (
              <div className="space-y-4">
                <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">
                  ¿Estás seguro que deseas{" "}
                  {course.isProduct ? "comprar" : "iniciar"} este curso?
                </h3>
                {course.isProduct ? (
                  <div>
                    <p className="text-sm text-yellow-400 dark:text-gray-400">
                      Este es un curso pago, no es gratis.
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                <div className="flex justify-center gap-4">
                  <button
                    className="w-full text-center items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    onClick={() => enrolStudent(course.id)}
                  >
                    {course.isProduct ? (
                      <span className="flex justify-center items-center">
                        {Math.trunc(courseProduct?.price!)}{" "}
                        <FaCoins className="ml-1" />
                      </span>
                    ) : (
                      "Sí, estoy seguro"
                    )}
                  </button>
                  <button
                    className="w-full text-center items-center justify-center bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
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
