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

export interface IModules {
  id: string;
  title: string;
  course: string;
  lessons: [string];
}

export interface IModuleById {
  id: string;
  title: string;
}

export interface module{
  id:string;
  title:string;
  lessons:lesson[]
}

export interface lesson{
  id:string;
  title:string;
}

export interface course{
  id: string;
  title: string;
  slug: string;
  headline: string;
  description: string;
  image: string;
  bg_image:string;
  create_at:string;
  updated_at:string;
  deleted_at:null;
  modules: module[]
}