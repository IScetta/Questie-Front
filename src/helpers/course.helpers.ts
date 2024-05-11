import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getCourseDB = async () => {
  try {
    const res = await axios.get(`${API_URL}courses`);
    if (res.status !== 200) {
      console.log("Error al traer los cursos");
    } else {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export { getCourseDB };