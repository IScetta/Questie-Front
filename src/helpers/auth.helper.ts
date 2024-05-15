import { ILoginForm, IRegisterForm } from "@/app/types";
import axios, { AxiosResponse } from "axios";

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
      return res.data;
    } else {
      throw new Error("Failed to login");
    }
  } catch (error: any) {
    console.log(error.message);
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
    if (res.status === 200 || res.data.message === "Register successful") {
      return res.data;
    } else {
      throw new Error("Failed to register");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export { signin, signup };
