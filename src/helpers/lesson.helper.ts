import { ILesson } from "@/app/types";
import axios, { AxiosResponse } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getLessons = async (): Promise<ILesson[]> => {
  try {
    const res: AxiosResponse<ILesson[]> = await axios.get(`${API_URL}lessons`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5MmZmNjUxLTc1NWYtNGNmYi1iYjVjLTRlYTJkYzJiM2I4NSIsImVtYWlsIjoiam9obkRvZUBnbWFpbC5jb20iLCJpc0FkbWluIjoiYWRtaW4iLCJzdWIiOiI3OTJmZjY1MS03NTVmLTRjZmItYmI1Yy00ZWEyZGMyYjNiODUiLCJpYXQiOjE3MTU2OTc0NTcsImV4cCI6MTcxNTcwNDY1N30.ZlxK0V5fwyEjIH5srFyutw_MPI6UraOzva5Ftvvtj6A`,
      },
    });
    if (res.status !== 200) {
      console.log(`Error status: ${res.status}`);
    }
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener el módulo");
  }
};

const getLessonById = async (
  id: string
): Promise<ILesson> => {
  try {
    const res: AxiosResponse<ILesson> = await axios.get(
      `${API_URL}lessons/${id}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5MmZmNjUxLTc1NWYtNGNmYi1iYjVjLTRlYTJkYzJiM2I4NSIsImVtYWlsIjoiam9obkRvZUBnbWFpbC5jb20iLCJpc0FkbWluIjoiYWRtaW4iLCJzdWIiOiI3OTJmZjY1MS03NTVmLTRjZmItYmI1Yy00ZWEyZGMyYjNiODUiLCJpYXQiOjE3MTU2OTc0NTcsImV4cCI6MTcxNTcwNDY1N30.ZlxK0V5fwyEjIH5srFyutw_MPI6UraOzva5Ftvvtj6A`,
        },
      }
    );
    if (res.status !== 200) {
      console.log(`Error status: ${res.status}`);
    }
    
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener el módulo");
  }
};

export { getLessonById, getLessons };
