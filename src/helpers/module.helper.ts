import { IModuleById, IModules } from "@/app/types";
import axios, { AxiosResponse } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getModules = async (): Promise<IModules[]> => {
  try {
    const res: AxiosResponse<IModules[]> = await axios.get(`${API_URL}modules`);
    if (res.status !== 200) {
      console.log("Error al traer los módulos");
    }
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los módulos");
  }
};

const getModuleById = async (id: string): Promise<IModuleById> => {
  try {
    const res = await axios.get(`${API_URL}modules/${id}`);
    if (res.status !== 200) {
      console.log("Error al traer el módulo");
    }
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el módulo");
  }
};

export { getModules, getModuleById };
