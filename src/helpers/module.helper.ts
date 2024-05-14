import { IModule } from "@/app/types";
import axios, { AxiosResponse } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getModules = async (): Promise<IModule[]> => {
  try {
    const res: AxiosResponse<IModule[]> = await axios.get(`${API_URL}modules`);
    if (res.status !== 200) {
      console.log("Error al traer los módulos");
    }
    return res.data;
  } catch (error) {
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
  } catch (error) {
    throw new Error("Error al obtener el módulo");
  }
};

export { getModules, getModuleById };
