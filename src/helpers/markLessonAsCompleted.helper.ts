import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const markLesson = async (
  lessonId: string | undefined,
  userId: string | undefined
) => {
  try {
    const response = await axios.post(`${API_URL}progress`, {
      userId: userId,
      lessonId: lessonId,
    });
    return response;
  } catch (error: any) {
    console.error(error);
    throw new Error("Error al registrar usuario en la base de datos");
  }
};

export default markLesson;
