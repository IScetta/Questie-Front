import { IModule } from "@/app/types";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getModules = async (): Promise<IModule[]> => {
  try {
    const res: AxiosResponse<IModule[]> = await axios.get(`${API_URL}modules`);
    if (res.status !== 200) {
      console.log("Error al traer los módulos");
    }
    return res.data;
  } catch (error: any) {
    Swal.fire({
      title: 'Oops...',
      text: error.response.data.message,
      icon: 'error'
    })
    throw new Error("Error al obtener los módulos");
  }
};

const getModuleById = async (id: string): Promise<IModule> => {
  try {
    const res: AxiosResponse<IModule> = await axios.get(
      `${API_URL}modules/${id}`
    );
    if (res.status !== 200) {
      console.log("Error al traer el módulo");
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

const putModuleById = async (title:string,description:string, id: string, token:string): Promise<IModule> => {
  try {
    const res: AxiosResponse<IModule> = await axios.put(
      `${API_URL}modules/${id}`,
     [{
        title,
        description  
      }],
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    if (res.status !== 200) {
      console.log("Error al traer el módulo");
    }
    return res.data;
  } catch (error: any) {
    Swal.fire({
      title: 'Oops...',
      text: error.response.data.message,
      icon: 'error'
    })
    throw new Error("Error al actualizar el módulo");
  }
};

export { getModules, getModuleById, putModuleById };
