import { ILoginForm } from "@/app/types";
import axios, { AxiosResponse, AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const signin = async (input: ILoginForm): Promise<ILoginForm> => {
  try {
    const res: AxiosResponse<ILoginForm> = await axios.post(
      `${API_URL}auth/signin`,
      input
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("Error de red:", axiosError.message);
      throw new Error("Error de red al iniciar sesión");
    } else
      (error: any) => {
        console.error("Error:", error.message);
        throw new Error("Error al intentar iniciar sesión");
      };
  }
};

export { signin };
