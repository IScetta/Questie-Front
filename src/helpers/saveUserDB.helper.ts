import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const saveUserDB = async () => {
  const session = await getSession();
  // console.log("session", session);
  if (session && session.user) {
    const { user } = session;
    // console.log("saveUserDB", user);
    try {
      const response = await axios.post(
        `http://localhost:3001/auth0/register`,
        {
          body: {
            firstName: user.given_name || user.name.split(" ")[0],
            lastName:
              user.family_name || user.name.split(" ").slice(1).join(" "),
            email: user.email,
            username: user.nickname,
            password: user.sub,
            confirmPassword: user.sub,
            auth0Id: user.sub,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      console.log(response);
      if (response.status !== 200) {
        throw new Error("Fallo al registrar usuario en la base de datos");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error al registrar usuario en la base de datos");
    }
  }
};

export default saveUserDB;
