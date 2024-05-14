import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getCategoriesDB = async () => {
  try {
    const res = await axios.get(`${API_URL}categories`);
    if (res.status !== 200) {
      console.log("Error al traer las categorias");
    } else {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export { getCategoriesDB };
