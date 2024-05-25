import { IUser } from "@/app/types";
import axios, { AxiosResponse } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllUsers = async (token: string | null): Promise<IUser[]> => {
  try {
    const res: AxiosResponse<IUser[]> = await axios.get(`${API_URL}users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      console.log("Error al traer los usuarios");
    }
    return res.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error);
  }
};

export const getUserById = async (
  id: string,
  token: string | null
): Promise<IUser> => {
  try {
    const res: AxiosResponse<IUser> = await axios.get(`${API_URL}users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      console.log("Error al traer el usuario");
    }
    return res.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error);
  }
};

export const addCoins = async (
  token: string | null,
  userId: string,
  coins: number
): Promise<IUser> => {
  try {
    const res: AxiosResponse<IUser> = await axios.post(
      `${API_URL}stats/coins/${userId}`,
      {
        coins,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status !== 201) {
      console.log("Error al agregar coins");
    }

    return res.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error);
  }
};
