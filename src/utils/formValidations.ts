import {
  ILoginErrorForm,
  ILoginForm,
  IRegisterErrorForm,
  IRegisterForm,
} from "@/app/types";

const loginValidation = (input: ILoginForm): ILoginErrorForm => {
  let errors: ILoginErrorForm = {};

  //* USERNAME
  if (!input.username) errors.username = "";
  else {
    if (input.username.length < 3)
      errors.username =
        "El nombre de usuario debe tener al menos 3 carácteres.";
  }

  //* PASSWORD
  if (!input.password) errors.password = "";
  else {
    if (input.password.length < 6)
      errors.password = "La contraseña debe tener al menos 6 carácteres.";
  }

  return errors;
};

const registerValidation = (input: IRegisterForm): IRegisterErrorForm => {
  const emailRegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const passMinRegExp = /[a-z]/;
  const passMayusRegExp = /[A-Z]/;
  const passNumRegExp = /[0-9]/;
  let errors: IRegisterErrorForm = {};

  //* FIRSTNAME
  if (!input.firstname) errors.firstname = "Debe ingresar su nombre.";
  else {
    if (input.firstname.length < 3)
      errors.firstname = "El nombre debe tener al menos 3 carácteres.";
  }

  //* LASTNAME
  if (!input.lastname) errors.lastname = "Debe ingresar su apellido.";
  else {
    if (input.lastname.length < 3)
      errors.lastname = "El apellido debe tener al menos 3 carácteres.";
  }

  //* EMAIL
  if (!input.email) errors.email = "Debe ingresar un email.";
  else {
    if (!emailRegExp.test(input.email))
      errors.email = "Debe ingresar un email válido.";
  }

  //* USERNAME
  if (!input.username) errors.username = "Debe ingresar un nombre de usuario.";
  else {
    if (input.username.length < 3)
      errors.username = "El username debe tener al menos 3 carácteres.";
  }

  //* PASSWORD
  if (!input.password) errors.password = "Debe ingresar su contraseña.";
  else {
    if (input.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 carácteres.";
    }
    if (
      !passMinRegExp.test(input.password) ||
      !passMayusRegExp.test(input.password) ||
      !passNumRegExp.test(input.password)
    ) {
      errors.password =
        "La contraseña debe tener al menos una minúscula, una mayúscula y un número.";
    }
  }

  //* CONFIRM PASSWORD
  if (!input.confirmPassword)
    errors.confirmPassword = "Debe re-ingresar su contraseña.";
  else {
    if (input.password !== input.confirmPassword)
      errors.confirmPassword = "Las contraseñas no coinciden.";
  }

  return errors;
};

export { loginValidation, registerValidation };
