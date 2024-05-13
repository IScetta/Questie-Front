import { ICourse } from "@/app/types";
import axios, { AxiosResponse } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getCourseByIdDB = async (id: string): Promise<ICourse> => {
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
    throw new Error("Error al obtener todos los cursos");
  }
};

const getCoursesDB = async (): Promise<ICourse[]> => {
  try {
    const res: AxiosResponse<ICourse[]> = await axios.get(`${API_URL}courses`);
    if (res.status !== 200) {
      console.log("Error al traer los cursos");
    }
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el curso por id");
  }
};

export { getCourseByIdDB, getCoursesDB };
