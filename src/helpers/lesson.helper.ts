import { IContent, ILesson } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import axios, { AxiosResponse } from "axios";


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
  } catch (error) {
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
  } catch (error) {
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
): Promise<true | null> => {
  try {
    const res: AxiosResponse<true | null> = await axios.get(
      `${API_URL}lessons/finished/${userId}`
    );
    if (res.status !== 200) {
      console.log(`Error status: ${res.status}`);
    }
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener el módulo");
  }
};

export { getLessonById, getLessons, postLessonContent };
