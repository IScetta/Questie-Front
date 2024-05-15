"use client";

import { IRegisterErrorForm, IRegisterForm } from "@/app/types";
import { signin } from "@/helpers/auth.helper";
import { registerFormData } from "@/utils/formData";
import { registerValidation } from "@/utils/formValidations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";

const Register: React.FC = (): JSX.Element => {
  const router = useRouter();

  const initialState: IRegisterForm = {
    firstName: "",
    lastName: "",
    birthdate: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [input, setInput] = useState<IRegisterForm>(initialState);
  const [errors, setErrors] = useState<IRegisterErrorForm>({
    firstname: "",
    lastname: "",
    birthdate: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const errors: IRegisterErrorForm = registerValidation(input);
    setErrors(errors);
  }, [input]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      console.log(input);
      event.preventDefault();
      const response = await signin(input);
      if (!response) throw new Error(`Error al intentar registrar usuario`);
      alert(`Registro exitoso, Bienvenido/a ${input.firstName}`);
      router.push("/sign-in");
    } catch (error: any) {
      alert("Error al registrar usuario: " + error.message);
      throw new Error("Error desconocido: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-purpleMainLight w-[30rem] h-auto my-4 mx-auto px-10 py-6 rounded-lg">
      <div className="flex flex-col items-center justify-center w-full h-auto">
        <form
          className="flex flex-col items-center justify-center w-full h-auto"
          onSubmit={handleSubmit}
        >
          <h1 className="text-black text-center font-bold text-3xl mb-2">
            Registrate
          </h1>

          {registerFormData.map(({ label, name, type, placeholder }) => {
            return (
              <div
                className="flex flex-col items-start justify-center w-full h-auto mb-2"
                key={name}
              >
                <label className="font-medium text-[22px]" htmlFor={name}>
                  {label}
                </label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={input[name]}
                  placeholder={placeholder}
                  onChange={handleChange}
                  className="w-full h-12 mt-1 px-4 py-2 bg-purpleMain rounded-lg placeholder:text-white placeholder:text-opacity-70 focus:outline-none"
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
            className="w-full h-12 bg-yellowMain text-purpleMain text-2xl font-medium rounded-lg text-center hover:bg-yellowMainLight mt-2"
            type="submit"
            disabled={Object.keys(errors).length > 0}
            style={{
              cursor: Object.keys(errors).length > 0 ? "not-allowed" : "",
            }}
          >
            Registrarme
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
          <div className="flex items-center justify-between w-full h-auto">
            <button className="mr-1 bg-white py-2 px-8 border-2 border-purpleMain rounded-lg hover:bg-purpleMain hover:text-white">
              <FaGoogle className="w-10 h-10" />
            </button>

            <button className="mx-1 bg-white py-2 px-8 border-2 border-purpleMain rounded-lg hover:bg-purpleMain hover:text-white">
              <FaFacebookF className="w-10 h-10" />
            </button>

            <button className="ml-1 bg-white py-2 px-8 border-2 border-purpleMain rounded-lg hover:bg-purpleMain hover:text-white">
              <FaApple className="w-10 h-10" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
