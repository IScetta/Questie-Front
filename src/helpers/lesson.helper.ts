import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getLessons = async (): Promise<any> => {
  try {
    const res = await axios.get(`${API_URL}lessons`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5MmZmNjUxLTc1NWYtNGNmYi1iYjVjLTRlYTJkYzJiM2I4NSIsImVtYWlsIjoiam9obkRvZUBnbWFpbC5jb20iLCJpc0FkbWluIjoiYWRtaW4iLCJzdWIiOiI3OTJmZjY1MS03NTVmLTRjZmItYmI1Yy00ZWEyZGMyYjNiODUiLCJpYXQiOjE3MTU2MzM0MzUsImV4cCI6MTcxNTY0MDYzNX0.8vjA7M01iXuYubegkLR_dqrEi-S9svwYZ642xIgb_Do`,
      },
    });
    if (res.status !== 200) {
      console.log("Error al traer las lecciones");
    }
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el módulo");
  }
};

const getLessonById = async (id: string, idmodule: string): Promise<any> => {
  try {
    const res = await axios.get(`${API_URL}lessons/${id}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5MmZmNjUxLTc1NWYtNGNmYi1iYjVjLTRlYTJkYzJiM2I4NSIsImVtYWlsIjoiam9obkRvZUBnbWFpbC5jb20iLCJpc0FkbWluIjoiYWRtaW4iLCJzdWIiOiI3OTJmZjY1MS03NTVmLTRjZmItYmI1Yy00ZWEyZGMyYjNiODUiLCJpYXQiOjE3MTU2MzM0MzUsImV4cCI6MTcxNTY0MDYzNX0.8vjA7M01iXuYubegkLR_dqrEi-S9svwYZ642xIgb_Do`,
      },
    });
    if (res.status !== 200) {
      console.log("Error al traer la lección1");
    }
    if (res.data.module.id !== idmodule) {
      console.log("Error al traer la lección");
    }
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el módulo");
  }
};

export { getLessonById, getLessons };
