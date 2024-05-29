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
    if (!input.username)
      errors.username = "Debe ingresar un nombre de usuario.";
    if (input.username.length < 3)
      errors.username =
        "El nombre de usuario debe tener al menos 3 carácteres.";
  }

  //* PASSWORD
  if (!input.password) errors.password = "";
  else {
    if (!input.password) errors.password = "Debe ingresar una contraseña.";
    if (input.password.length < 8)
      errors.password = "La contraseña debe tener al menos 8 carácteres.";
  }

  return errors;
};

const registerValidation = (input: IRegisterForm): IRegisterErrorForm => {
  const emailRegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const passMinRegExp = /[a-z]/;
  const passMayusRegExp = /[A-Z]/;
  const passNumRegExp = /[0-9]/;
  const passSpecialCharRegExp = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
  let errors: IRegisterErrorForm = {};

  //* FIRSTNAME
  if (!input.firstName) errors.firstName = "Debe ingresar su nombre.";
  else {
    if (input.firstName.length < 5)
      errors.firstName = "El nombre debe tener al menos 5 carácteres.";
  }

  //* LASTNAME
  if (!input.lastName) errors.lastName = "Debe ingresar su apellido.";
  else {
    if (input.lastName.length < 5)
      errors.lastName = "El apellido debe tener al menos 5 carácteres.";
  }

  //* BIRTHDATE
  if (!input.birthdate)
    errors.birthdate = "Debe seleccionar su fecha de nacimiento.";
  else {
    const birthdate = new Date(input.birthdate);
    const today = new Date();
    if (birthdate > today)
      errors.birthdate = "La fecha de nacimiento no puede ser futura.";
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
    if (
      !passMinRegExp.test(input.password) ||
      !passMayusRegExp.test(input.password) ||
      !passNumRegExp.test(input.password)
    ) {
      errors.password =
        "La contraseña debe tener al menos una mayúscula, una minúscula y un número.";
    } else {
      if (!passSpecialCharRegExp.test(input.password)) {
        errors.password =
          "La contraseña debe tener al menos un caracter especial.";
      } else {
        if (input.password.length < 8) {
          errors.password = "La contraseña debe tener al menos 8 carácteres.";
        }
      }
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
