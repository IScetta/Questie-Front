import { IProduct } from "@/app/types";
import axios from "axios";
import Swal from "sweetalert2";

export const getAllProducts = async () => {
  try {
    const products = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}products`
    );

    //Filter products that are not courses
    const filteredProducts = products.data.filter(
      (product: IProduct) => product.polymorphicEntityType !== "Course"
    );

    return filteredProducts;
  } catch (error: any) {
    console.error("Error getting products", error);
    Swal.fire({
      title: "Oops...",
      text: error.response.data.message,
      icon: "error",
    });
  }
};

export const getAllCourseProducts = async () => {
  try {
    const products = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}products`
    );

    //Filter products that are not courses
    const filteredProducts = products.data.filter(
      (product: IProduct) => product.polymorphicEntityType === "Course"
    );

    return filteredProducts;
  } catch (error: any) {
    console.error("Error getting products", error);
    Swal.fire({
      title: "Oops...",
      text: error.response.data.message,
      icon: "error",
    });
  }
};

export const getProductById = async (productId: string) => {
  try {
    const product = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}products/${productId}`
    );
    return product.data;
  } catch (error: any) {
    console.error("Error getting product", error);
    Swal.fire({
      title: "Oops...",
      text: error.response.data.message,
      icon: "error",
    });
  }
};

export const postProductByCourse = async (
  name: string,
  description: string,
  price: number,
  courseId: string,
  token: string
) => {
  const currency = "qty";
  try {
    const product = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}products`,
      {
        name,
        description,
        price: Number(price),
        currency,
        polymorphicEntityId: courseId,
        polymorphicEntityType: "Course",
      },
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    return product.data;
  } catch (error) {
    console.error("Error create product", error);
  }
};
