"use client";

import { ICourse, IProduct } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import {
  deleteProductByCourse,
  getAllProducts,
  postProductByCourse,
  putProductByCourse,
} from "@/helpers/products.helper";
import { useEffect, useState, useCallback } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

const EditProductForm = ({
  course,
  onClose,
}: {
  course: ICourse;
  onClose: () => void;
}): JSX.Element => {
  const { token } = useAuth();
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [product, setProduct] = useState<IProduct | undefined>();
  const [alertProduct, setAlertProduct] = useState<boolean>(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const fetchProducts = useCallback(async () => {
    try {
      const response: IProduct[] = await getAllProducts();
      setAllProducts(response);
      if (!response) throw new Error("Error al intentar traer los productos");
    } catch (error: any) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const productFilter = () => {
      const productFiltered = allProducts?.filter(
        (product) => product.polymorphicEntityId === course.id
      );
      setProduct(productFiltered[0]);
    };
    productFilter();
  }, [allProducts, course.id]);

  useEffect(() => {
    if (course.isProduct && product) {
      setInput({
        name: product.name,
        description: product.description,
        price: product.price,
      });
    }
  }, [course.isProduct, product]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(input.price)
    try {
      if (course.isProduct && input.price != 0) {
        const response = putProductByCourse(
          input.name,
          input.description,
          input.price,
          product?.id!,
          token!
        );
        if (!response) throw new Error("Error al intentar actualizar producto");
        onClose();
      } else if (course.isProduct && input.price == 0) {
        const response = deleteProductByCourse(product?.id!, token!);
        if (!response) throw new Error("Error al intentar quitar producto");
        onClose();
        window.location.reload();
      } else if (!course.isProduct && input.price != 0) {
        const response = postProductByCourse(
          input.name,
          input.description,
          input.price,
          course.id,
          token!
        );
        if (!response) throw new Error("Error al intentar crear producto");
        onClose();
        window.location.reload();
      } else if (!course.isProduct && input.price <= 0) {
        setAlertProduct(true);
        console.log("No create Product");
      }
      // onClose();
      // window.location.reload();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-start justify-center w-full h-auto mb-2">
        <label
          className="font-medium text-base md:text-[22px]"
          htmlFor={"name"}
        >
          {"Nombre del Producto:"}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={input.name}
          placeholder="Ingresa el Nombre del Producto"
          onChange={handleChange}
          className="w-full h-12 mt-1 px-4 py-2 bg-purpleMainLighter rounded-lg placeholder:text-gray-700 placeholder:text-opacity-60 focus:outline-none text-sm md:text-base"
        />
        <div className="my-1 w-auto h-4 bg-purpleMainLighter"></div>
      </div>

      <div className="flex flex-col mb-4">
        <label
          htmlFor="description"
          className="font-medium text-base md:text-[22px]"
        >
          Descripción:
        </label>
        <textarea
          id="description"
          name="description"
          value={input.description}
          onChange={handleChange}
          placeholder="Ingresa la descripción del Producto"
          className="border h-32 w-full mt-1 px-4 py-2 bg-purpleMainLighter rounded-lg placeholder:text-gray-800 placeholder:text-opacity-60 focus:outline-none text-sm md:text-base"
        />
      </div>

      <div className="flex flex-col items-start justify-center w-full h-auto mb-2">
        <label
          className="font-medium text-base md:text-[22px]"
          htmlFor={"price"}
        >
          {"Valor del Producto en Qty:"}
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={input.price}
          placeholder=""
          onChange={handleChange}
          className="w-full h-12 mt-1 px-4 py-2 bg-purpleMainLighter rounded-lg placeholder:text-gray-700 placeholder:text-opacity-60 focus:outline-none text-sm md:text-base"
        />
        <div className="my-1 w-auto h-4 bg-purpleMainLighter"></div>
      </div>

      {course.isProduct ? (
        <div className="flex justify-center items-center p-2 m-2 bg-gray-200">
          <FaRegQuestionCircle className="bg-yellowMain w-fit h-fit  m-2 text-[50px] rounded-full" />
          Para comvertir un producto de pago a gratuito deje su precio en 0.
        </div>
      ) : (
        <></>
      )}
        {alertProduct ? (
          <div className="flex justify-center items-center p-2 m-2 bg-gray-200">
            <FaRegQuestionCircle className="bg-yellowMain w-fit h-fit  m-2 text-[50px] rounded-full" />
            No se puede crear un producto con precio 0.
          </div>
        ) : (
          <></>
        )}
      <div className="flex flex-row justify-center">
        <button
          type="submit"
          className="items-center bg-yellowMain border-2 hover:bg-yellowMainLight border-purpleMain text-purpleMain h-fit mx-7 px-4 py-2 text-lg mt-5"
        >
          Crear
        </button>
        <button
          onClick={onClose}
          className="items-center border-2 border-black bg-gray-500 hover:bg-gray-400 mx-7 px-4 py-2 h-fit text-lg text-white mt-5"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;
