import axios from "axios";
import Swal from "sweetalert2";

export const getAllProducts = async () => {
  try {
    const products = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}products`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdjZWNhMDRlLTFlZDQtNDliNy04ZTAxLTY2ZTc5ZWNlYjIzOCIsImVtYWlsIjoiam9obkRvZUBnbWFpbC5jb20iLCJpc0FkbWluIjoiYWRtaW4iLCJzdWIiOiI3Y2VjYTA0ZS0xZWQ0LTQ5YjctOGUwMS02NmU3OWVjZWIyMzgiLCJpYXQiOjE3MTU4Njk4NzUsImV4cCI6MTcxNTg3NzA3NX0.5WOZgSEZVsvLmOdEkI-G67kXuVhj7fnaNK1gufPZVvI`,
        },
      }
    );
    return products.data;
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
      `${process.env.NEXT_PUBLIC_API_URL}products/${productId}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdjZWNhMDRlLTFlZDQtNDliNy04ZTAxLTY2ZTc5ZWNlYjIzOCIsImVtYWlsIjoiam9obkRvZUBnbWFpbC5jb20iLCJpc0FkbWluIjoiYWRtaW4iLCJzdWIiOiI3Y2VjYTA0ZS0xZWQ0LTQ5YjctOGUwMS02NmU3OWVjZWIyMzgiLCJpYXQiOjE3MTU4Njk4NzUsImV4cCI6MTcxNTg3NzA3NX0.5WOZgSEZVsvLmOdEkI-G67kXuVhj7fnaNK1gufPZVvI`,
        },
      }
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


export const putProductByCourse = async (
  name: string,
  description: string,
  price: number,
  product_id:string,
  token: string
) => {
  try {
    const product = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}products/${product_id}`,
      {
        name,
        description,
        price: Number(price),
      },
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    return product.data;
  } catch (error) {
    console.error("Error update product", error);
  }
};


export const deleteProductByCourse = async (
  product_id:string,
  token: string
) => {
  try {
    const product = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}products/${product_id}`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    return product.data;
  } catch (error) {
    console.error("Error delete product", error);
  }
};

