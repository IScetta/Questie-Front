import { ICourse, IModule } from "@/app/types";
import axios, { AxiosResponse } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCourseByIdDB = async (id: string): Promise<ICourse> => {
  try {
    const res: AxiosResponse<ICourse> = await axios.get(
      `${API_URL}courses/${id}`
    );
    if (res.status !== 200) {
      console.log("Error al traer los cursos");
    }
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el curso por id");
  }
};

export const getCoursesDB = async (
  onlyComplete: boolean = true
): Promise<ICourse[]> => {
  try {
    const res: AxiosResponse<ICourse[]> = await axios.get(`${API_URL}courses`);
    if (res.status !== 200) {
      console.log("Error al traer los cursos");
    }
    let courses = res.data;
    if (onlyComplete) {
      courses = courses.filter((course) => course.status === "complete");
    }
    return courses;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener todos los cursos");
  }
};

export const getCourseModules = async (
  courseId: string
): Promise<Pick<IModule, "id" | "title" | "lessons">[]> => {
  try {
    const res: AxiosResponse<ICourse> = await axios.get(
      `${API_URL}courses/${courseId}`
    );

    if (res.status !== 200) {
      console.log("Error al traer los módulos");
    }

    return res.data.modules;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los módulos");
  }
};
