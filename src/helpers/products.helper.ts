import axios from "axios";

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
  } catch (error) {
    console.error("Error getting products", error);
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
  } catch (error) {
    console.error("Error getting product", error);
  }
};
