import axios from "axios";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCategoriesDB = async () => {
  try {
    const res = await axios.get(`${API_URL}categories`);
    if (res.status !== 200) {
      console.log("Error al traer las categorias");
    } else {
      return res.data;
    }
  } catch (error: any) {
    Swal.fire({
      title: 'Oops...',
      text: error.response.data.message,
      icon: 'error'
    })
  }
};


export const postCategoryBD = async (name:string,token:string) => {
  try {
    const res = await axios.post(`${API_URL}categories`,
      {name:name},
    {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    }
    );
    if (res.status !== 200) {
      console.log("Error al traer las categorias");
    } else {
      return res.data;
    }
  } catch (error: any) {
    Swal.fire({
      title: 'Oops...',
      text: error.response.data.message,
      icon: 'error'
    })
  }
};


