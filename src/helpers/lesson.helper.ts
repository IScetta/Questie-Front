import { ILesson, IProgress } from "@/app/types";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getLessons = async (token: string | null): Promise<ILesson[]> => {
  try {
    const res: AxiosResponse<ILesson[]> = await axios.get(`${API_URL}lessons`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      console.log(`Error status: ${res.status}`);
    }
    return res.data;
  } catch (error: any) {
    Swal.fire({
      title: "Oops...",
      text: error.response.data.message,
      icon: "error",
    });
    throw new Error("Error al obtener el módulo");
  }
};

const getLessonById = async (
  id: string,
  token: string | null
): Promise<ILesson> => {
  try {
    const res: AxiosResponse<ILesson> = await axios.get(
      `${API_URL}lessons/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status !== 200) {
      console.log(`Error status: ${res.status}`);
    }

    return res.data;
  } catch (error: any) {
    Swal.fire({
      title: "Oops...",
      text: error.response.data.message,
      icon: "error",
    });
    throw new Error("Error al obtener el módulo");
  }
};

const getLessonsFinishedByUser = async (
  userId: string
): Promise<IProgress[] | null> => {
  try {
    const res: AxiosResponse<IProgress[] | null> = await axios.get(
      `http://localhost:3001/progress/user/${userId}`
    );
    if (res.status !== 200) {
      console.log(`Error status: ${res.status}`);
    }

    return res.data;
  } catch (error: any) {
    Swal.fire({
      title: "Oops...",
      text: error.response.data.message,
      icon: "error",
    });
    throw new Error("Error al obtener el módulo");
  }
};

export { getLessonById, getLessons, getLessonsFinishedByUser };
