import { ILesson } from "@/app/types";
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
      title: 'Oops...',
      text: error.response.data.message,
      icon: 'error'
    })
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
      title: 'Oops...',
      text: error.response.data.message,
      icon: 'error'
    })
    throw new Error("Error al obtener el módulo");
  }
};

const getLessonsFinishedByUser = async (
  userId: string
): Promise<true | null> => {
  try {
    const res: AxiosResponse<true | null> = await axios.get(
      `${API_URL}lessons/finished/${userId}`
    );
    if (res.status !== 200) {
      console.log(`Error status: ${res.status}`);
    }
    return res.data;
  } catch (error: any) {
    Swal.fire({
      title: 'Oops...',
      text: error.response.data.message,
      icon: 'error'
    })
    throw new Error("Error al obtener el módulo");
  }
};

const putLessonById = async (
  title:string,
  xp:number,
  coins:number,
  id: string,
  token: string | null
): Promise<ILesson> => {
  try {
    const res: AxiosResponse<ILesson> = await axios.put(
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
      title: 'Oops...',
      text: error.response.data.message,
      icon: 'error'
    })
    throw new Error("Error al obtener el módulo");
  }
};

export { getLessonById, getLessons, putLessonById };
