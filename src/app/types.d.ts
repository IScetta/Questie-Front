export interface ILoginForm {
  username: string;
  password: string;
  [key: string?]: string;
}

export interface ILoginErrorForm {
  username?: string;
  password?: string;
  [key: string?]: string;
}

export interface IRegisterForm {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  [key: string?]: string;
}

export interface IRegisterErrorForm {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  [key: string?]: string;
}

export interface ICategory {
  id?: number;
  name: string;
  image: string;
}
