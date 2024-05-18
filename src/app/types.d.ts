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
  firstName: string;
  lastName: string;
  birthdate: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  [key: string?]: string;
}

export interface IRegisterErrorForm {
  firstname?: string;
  lastname?: string;
  birthdate?: string;
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
  categories:[
    {
      name: string;
      id:string;
    }
  ];
}

export interface IProduct {
  id: string;
  name: string;
  order: number;
  price: number;
  imgUrl: string;
  currency: string;
  description: string;
  polymorphicEntityType?: string;
  polymorphicEntityId?: string;
}

export interface IInvoice {
  id: string;
  userId: string;
  total: number;
  status: string;
  product: IProduct;
  user: {
    id: string;
  };
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface IPayload {
  id: string;
  email: string;
  isAdmin: string;
  sub: string;
  iat: number;
  exp: number;
}


export interface ICreateCourseForm{
  title: string;
  headline: string;
  description: string;
  image: string;
  bg_image: string;
  categories: string[];
}

export interface ICreateCourseErrorForm{
  title: string;
  headline: string;
  description: string;
  image: string;
  bg_image: string;
  categories: string[];
}