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

export interface ICreateModule {
  title: string;
  description: string;
  course_id: string;
}

export interface ICategory {
  id?: number;
  name: string;
  image: string;
}

export interface ICourse {
  id: string;
  title: string;
  slug: string;
  headline: string;
  description: string;
  image: string;
  bg_image: string;
  assessment: number;
  status: string;
  isProduct: boolean;
  create_at: string;
  updated_at: string;
  deleted_at: string | null;
  modules: [IModule];
  categories: [
    {
      name: string;
      id: string;
    }
  ];
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
  lessons: [ILesson];
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

export interface ICreateLesson {
  title: string;
  xp: number;
  coins: number;
}

export interface IProduct {
  id: string;
  name: string;
  order: number;
  data?: {
    type?: string;
    qty?: number;
  };
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
  firstName?: string;
  lastName?: string;
  username?: string;
  role?: string;
  isAdmin?: string;
  sub?: string;
  iat?: number;
  exp?: number;
}

export interface ICreateCourseForm {
  title: string;
  headline: string;
  description: string;
  // courseImg: string;
  // courseBgImg: string;
  // categories: string[];
}

export interface ICreateCourseErrorForm {
  title: string;
  headline: string;
  description: string;
  image: string;
  bg_image: string;
  // categories: string[];
}

export interface IUser {
  id: string;
  username: string;
  password: string;
  email: string;
  profile_pic: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  role: string;
  stats?: IStats;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ICreateLessonModule {
  title: string;
  id: string;
}

export interface IEnrolment {
  id: string;
  course: string;
  user: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface IStats {
  coins: number;
  xp: number;
  user: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface Option {
  id: string;
  text: string;
  correct: boolean;
}
