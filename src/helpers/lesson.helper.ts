import { ILesson } from "@/app/types";
import axios, { AxiosResponse } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getLessons = async (): Promise<ILesson[]> => {
  try {
    const res: AxiosResponse<ILesson[]> = await axios.get(`${API_URL}lessons`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5MmZmNjUxLTc1NWYtNGNmYi1iYjVjLTRlYTJkYzJiM2I4NSIsImVtYWlsIjoiam9obkRvZUBnbWFpbC5jb20iLCJpc0FkbWluIjoiYWRtaW4iLCJzdWIiOiI3OTJmZjY1MS03NTVmLTRjZmItYmI1Yy00ZWEyZGMyYjNiODUiLCJpYXQiOjE3MTU2Mzk3NDMsImV4cCI6MTcxNTY0Njk0M30.n6W5E1JpjELzHoFMPwI30OpLannei0G5Nl1AQxxwq6U`,
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
  id: string,
  idmodule: string
): Promise<ILesson> => {
  try {
    const res: AxiosResponse<ILesson> = await axios.get(
      `${API_URL}lessons/${id}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5MmZmNjUxLTc1NWYtNGNmYi1iYjVjLTRlYTJkYzJiM2I4NSIsImVtYWlsIjoiam9obkRvZUBnbWFpbC5jb20iLCJpc0FkbWluIjoiYWRtaW4iLCJzdWIiOiI3OTJmZjY1MS03NTVmLTRjZmItYmI1Yy00ZWEyZGMyYjNiODUiLCJpYXQiOjE3MTU2Mzk3NDMsImV4cCI6MTcxNTY0Njk0M30.n6W5E1JpjELzHoFMPwI30OpLannei0G5Nl1AQxxwq6U`,
        },
      }
    );
    if (res.status !== 200) {
      console.log(`Error status: ${res.status}`);
    }
    if (res.data.module.id !== idmodule) {
      console.log("Error al traer la lección, el modulo no coincide");
    }
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener el módulo");
  }
};

export { getLessonById, getLessons };
