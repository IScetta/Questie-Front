import { ICourse, IModule, IProduct } from "@/app/types";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { getAllCourseProducts } from "./products.helper";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCourseByIdDB = async (id: string): Promise<ICourse> => {
  try {
    const res: AxiosResponse<ICourse> = await axios.get(
      `${API_URL}courses/${id}`
    );
    if (res.status !== 200) {
      console.log("Error al traer los cursos");
    }
    return res.data;
  } catch (error: any) {
    console.log(error);
    Swal.fire({
      title: "Oops...",
      text: error.response.data.message,
      icon: "error",
    });
    throw new Error("Error al obtener el curso por id");
  }
};

export const getCoursesDB = async (
  onlyComplete: boolean = true
): Promise<ICourse[]> => {
  try {
    const res: AxiosResponse<ICourse[]> = await axios.get(`${API_URL}courses`);
    if (res.status !== 200) {
      console.log("Error al traer los cursos");
    }
    let courses = res.data;
    if (onlyComplete) {
      courses = courses.filter((course) => course.status === "complete");
    }
    return courses;
  } catch (error: any) {
    console.log(error);
    Swal.fire({
      title: "Oops...",
      text: error.response.data.message,
      icon: "error",
    });
    throw new Error("Error al obtener todos los cursos");
  }
};

export const getCourseModules = async (
  courseId: string
): Promise<Pick<IModule, "id" | "title" | "lessons">[]> => {
  try {
    const res: AxiosResponse<ICourse> = await axios.get(
      `${API_URL}courses/${courseId}`
    );

    if (res.status !== 200) {
      console.log("Error al traer los módulos");
    }

    return res.data.modules;
  } catch (error: any) {
    console.log(error);
    Swal.fire({
      title: "Oops...",
      text: error.response.data.message,
      icon: "error",
    });
    throw new Error("Error al obtener los módulos");
  }
};

export const getCourseProductById = async (courseId: string) => {
  try {
    const products = await getAllCourseProducts();

    const courseProduct = products.find(
      (product: IProduct) =>
        product.polymorphicEntityType === "Course" &&
        product.polymorphicEntityId === courseId
    );

    return courseProduct;
  } catch (error: any) {
    console.log(error);
    Swal.fire({
      title: "Oops...",
      text: error.response.data.message,
      icon: "error",
    });
    throw new Error("Error al obtener los módulos");
  }
};
