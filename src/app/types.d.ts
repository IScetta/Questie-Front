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

export interface IModule {
  id: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  lessons: [
    {
      id: string;
      title: string;
    }
  ];
  course: {
    id: string;
  };
}

export interface ILesson {
  id: string;
  title: string;
  order: number;
  xp: number;
  coins: number;
  slug: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  module: {
    id: string;
    course: {
      id: string;
    };
  };
  contents: [string];
}

export interface ICourse {
  id: string;
  title: string;
  slug: string;
  headline: string;
  description: string;
  image: string;
  bg_image: string;
  create_at: string;
  updated_at: string;
  deleted_at: string | null;
  modules: [
    {
      id: string;
      title: string;
      lessons: [
        {
          id: string;
          title: string;
        }
      ];
    }
  ];
}
