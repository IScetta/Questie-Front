import { ILesson, IProgress, ILessonOrder } from "@/app/types";
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
const postLessonContent = async (
  
  lessonid: string,
  // contents: [IContent["contents"]],
  contents: any,
  token: string | null
) => {
  
  try {
    
    
    const res = await axios.post(`${API_URL}contents`, 
     {  
        lesson_id:lessonid,
        contents,
      },
      
     { headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }},
    );
    
    if (res.status === 201) {
      console.log(res.data)
      return res.data;
    } else {
      throw alert("Hubo un error al crear la lección");
    }
  } catch (error: any) {
    console.log(error)
  }
};

const getLessonsFinishedByUser = async (
  userId: string
): Promise<IProgress[] | null> => {
  try {
    const res: AxiosResponse<IProgress[] | null> = await axios.get(
      `${API_URL}progress/user/${userId}`
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

const putLessonById = async (
  title: string,
  xp: number,
  coins: number,
  id: string,
  token: string | null
): Promise<ILesson> => {
  const updateLessonDto = {
    title: title,
    xp: Number(xp),
    coins: Number(coins),
  };
  try {
    const res: AxiosResponse<ILesson> = await axios.put(
      `${API_URL}lessons`,

      [
        {
          id,
          updateLessonDto,
        },
      ],
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
    throw new Error("Error al Actualizar leccion", error);
  }
};

const putLessonOrder = async (
  listOrder: ILessonOrder[],
  token: string | null
): Promise<ILesson> => {
  try {
    const res: AxiosResponse<ILesson> = await axios.put(
      `${API_URL}lessons`,
      listOrder,
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
    throw new Error("Error al Actualizar leccion", error);
  }
};

export {
  getLessonById,
  getLessonsFinishedByUser,
  getLessons,
  putLessonById,
  putLessonOrder,
};
