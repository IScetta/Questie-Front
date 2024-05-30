import { ILoginForm, IUser } from "@/app/types";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const saveUserDB = async (userData: any) => {
  if (userData) {
    const truncatedSid = userData.sid.substring(0, 19) + "!";
    try {
      const response = await axios.post(`${API_URL}auth0/register/`, {
        firstName: userData.given_name || userData.name.split(" ")[0],
        lastName:
          userData.family_name || userData.name.split(" ").slice(1).join(" "),
        email: userData.email,
        username: userData.nickname,
        password: truncatedSid,
        passwordConfirmation: truncatedSid,
        birthdate: new Date(),
      });
      return response;
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        title: "Oops...",
        text: error.response.data.message,
        icon: "error",
      });
      throw new Error("Error al registrar usuario en la base de datos");
    }
  }
};

export default saveUserDB;
