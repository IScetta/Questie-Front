import { ILoginForm, IRegisterForm } from "@/app/types";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const signin = async (input: ILoginForm): Promise<ILoginForm | undefined> => {
  try {
    const res: AxiosResponse<ILoginForm> = await axios.post(
      `${API_URL}auth/signin`,
      input,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200 || res.data.message === "Login successful") {
      const token = res.data.token; // Reemplaza esto con tu token JWT

      // Dividir el token en sus partes (encabezado, carga útil y firma)
      const parts = token.split(".");
      const payload = JSON.parse(atob(parts[1]));
      res.data.payload = payload;

      return res.data;
    } else {
      throw new Error("Failed to login");
    }
  } catch (error: any) {
    Swal.fire({
      title: 'Oops...',
      text: error.response.data.message,
      icon: 'error'
    })
    throw new Error(error);
  }
};

const signup = async (
  input: IRegisterForm
): Promise<IRegisterForm | undefined> => {
  try {
    const res: AxiosResponse<IRegisterForm> = await axios.post(
      `${API_URL}auth/signup`,
      input,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 201) {
      return res.data;
    } else {
      throw new Error("Failed to register");
    }
  } catch (error: any) {
    Swal.fire({
      title: 'Oops...',
      text: error.response.data.message,
      icon: 'error'
    })
    throw new Error(error);
  }
};

export { signin, signup };
