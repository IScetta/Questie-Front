"use client";

import { ILoginErrorForm, ILoginForm } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { signin } from "@/helpers/auth.helper";
import { loginFormData } from "@/utils/formData";
import { loginValidation } from "@/utils/formValidations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

const Login: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { setToken } = useAuth();

  const initialState: ILoginForm = {
    username: "",
    password: "",
  };

  const [input, setInput] = useState<ILoginForm>(initialState);
  const [errors, setErrors] = useState<ILoginErrorForm>({
    username: "",
    password: "",
  });

  useEffect(() => {
    const errors: ILoginErrorForm = loginValidation(input);
    setErrors(errors);
  }, [input]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const resetForm = () => {
    setInput(initialState);
    setErrors({
      username: "",
      password: "",
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const response = await signin(input);

      if (!response) throw new Error(`Error al intentar iniciar sesión`);

      setToken(response.token, response.payload);

      resetForm();

      router.push("/");
    } catch (error: any) {
      Swal.fire({
        title: "Oops...",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center bg-purpleMainLight w-[13rem] md:w-[26.5rem] h-auto my-4 mx-auto px-10 py-6 rounded-lg">
      <div className="flex flex-col items-center justify-center w-full h-auto">
        <form
          className="flex flex-col items-center justify-center w-full h-auto"
          onSubmit={handleSubmit}
        >
          {loginFormData.map(({ label, name, type, placeholder }) => {
            return (
              <div
                className="flex flex-col items-start justify-center w-full h-auto mb-6"
                key={name}
              >
                <label className="font-medium md:text-[22px]" htmlFor={name}>
                  {label}
                </label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={input[name]}
                  placeholder={placeholder}
                  onChange={handleChange}
                  className="w-full h-12 mt-1 px-4 py-2 bg-purpleMain rounded-lg placeholder:text-white placeholder:text-opacity-70 focus:outline-none text-xs md:text-base"
                />
                <div className="my-1 w-auto h-4 bg-purpleMainLight">
                  <p className="text-red-600 text-xs">
                    {errors[name] && errors[name]}
                  </p>
                </div>
              </div>
            );
          })}

          <button
            className="w-full h-12 bg-yellowMain text-purpleMain text-base md:text-2xl font-medium rounded-lg text-center hover:bg-yellowMainLight"
            type="submit"
            disabled={Object.keys(errors).length > 0}
            style={{
              cursor: Object.keys(errors).length > 0 ? "not-allowed" : "",
            }}
          >
            Iniciar Sesión
          </button>
        </form>

        <span className="text-start font-light my-6 text-sm">
          Al registrarte en Questie, aceptas los{" "}
          <Link href="/terms" className="hover:underline hover:text-indigo-600">
            Términos y Condiciones
          </Link>{" "}
          y la{" "}
          <Link
            href="/privacy"
            className="hover:underline hover:text-indigo-600"
          >
            Política de privacidad
          </Link>{" "}
          de Questie.
        </span>

        <div className="flex flex-col items-center justify-center w-full h-auto">
          <p className="text-start font-medium mb-4">
            También puedes iniciar sesión con:
          </p>
          <div className="flex items-center justify-between w-full h-auto mr-6">
            <Link
              href="/api/auth/login"
              className="mx-1 bg-purpleMain px-3 py-2 md:px-8 border-2 border-purpleMain rounded-lg text-white hover:bg-yellowMain hover:text-purpleMain"
            >
              <FaGoogle className="md:w-10 md:h-10" />
            </Link>

            <Link
              href="/api/auth/login"
              className="mx-1 bg-purpleMain px-3 py-2 md:px-8 border-2 border-purpleMain rounded-lg text-white hover:bg-yellowMain hover:text-purpleMain"
            >
              <FaFacebookF className="md:w-10 md:h-10" />
            </Link>

            <Link
              href="/api/auth/login"
              className="mx-1 bg-purpleMain px-3 py-2 md:px-8 border-2 border-purpleMain rounded-lg text-white hover:bg-yellowMain hover:text-purpleMain"
            >
              <FaApple className="md:w-10 md:h-10" />
            </Link>
          </div>
        </div>
        <p className="text-center text-sm mt-4">
          ¿No tienes cuenta?{" "}
          <Link
            href="/sign-up"
            className="hover:underline hover:text-indigo-600"
          >
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
