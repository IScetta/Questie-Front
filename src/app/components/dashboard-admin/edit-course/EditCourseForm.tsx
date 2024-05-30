"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ICourse, ICreateCourseErrorForm, ICreateCourseForm } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { postCreateCourse, putEditCourse } from "@/helpers/createCourse.helper";

const EditCourseForm = ({ course }: { course: ICourse })=> {
  const { token } = useAuth();
  const router = useRouter();

  // console.log(course)
  const initialState = {
    title: course.title,
    headline: course.headline,
    description: course.description,
    courseImg: null,
    courseBgImg: null,
  };

  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState<ICreateCourseErrorForm>({
    title: "",
    headline: "",
    description: "",
    image: "",
    bg_image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setInput({
        ...input,
        [name]: files[0],
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { courseImg, courseBgImg, description,title,headline} = input;

      const formData = new FormData();
      if (courseImg) formData.append("courseImg", courseImg);
      if (courseBgImg) formData.append("courseBgImg", courseBgImg);
      formData.append('description',description);
      formData.append('title', title);
      formData.append('headline', headline);

      const response = await putEditCourse(formData,course.id, token!);
      if (!response) throw new Error("Error al intentar crear curso");

      router.push(`/admin/create-module/${response.id}`);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="flex flex-col items-start justify-center w-full h-auto mb-2">
        <label className="font-medium text-base md:text-[22px]" htmlFor="title">
          Título de Curso:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={input.title}
          placeholder="Ingresa el título del curso"
          onChange={handleChange}
          className="w-full h-12 mt-1 px-4 py-2 bg-purpleMainLighter rounded-lg placeholder:text-gray-700 placeholder:text-opacity-60 focus:outline-none text-sm md:text-base"
        />
        {/* <div className="my-1 w-auto h-4 bg-purpleMainLighter">
          {errors.title && <p className="text-red-600 text-xs">{errors.title}</p>}
        </div> */}
      </div>

      <div className="flex flex-col items-start justify-center w-full h-auto mb-2">
        <label className="font-medium text-base md:text-[22px]" htmlFor="courseImg">
          Imagen Principal:
        </label>
        <input
          type="file"
          id="courseImg"
          name="courseImg"
          onChange={handleFileChange}
          className="w-full h-12 mt-1 px-4 py-2 bg-purpleMainLighter rounded-lg placeholder:text-gray-700 placeholder:text-opacity-60 focus:outline-none text-sm md:text-base"
        />
        {/* <div className="my-1 w-auto h-4 bg-purpleMainLighter">
          {errors.image && <p className="text-red-600 text-xs">{errors.image}</p>}
        </div> */}
      </div>

      <div className="flex flex-col items-start justify-center w-full h-auto mb-2">
        <label className="font-medium text-base md:text-[22px]" htmlFor="courseBgImg">
          Imagen de Fondo:
        </label>
        <input
          type="file"
          id="courseBgImg"
          name="courseBgImg"
          onChange={handleFileChange}
          className="w-full h-12 mt-1 px-4 py-2 bg-purpleMainLighter rounded-lg placeholder:text-gray-700 placeholder:text-opacity-60 focus:outline-none text-sm md:text-base"
        />
        {/* <div className="my-1 w-auto h-4 bg-purpleMainLighter">
          {errors.bg_image && <p className="text-red-600 text-xs">{errors.bg_image}</p>}
        </div> */}
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="headline" className="font-medium text-base md:text-[22px]">
          Encabezado:
        </label>
        <textarea
          id="headline"
          name="headline"
          value={input.headline}
          onChange={handleChange}
          placeholder="Ingresa el encabezado"
          className="border h-32 w-full mt-1 px-4 py-2 bg-purpleMainLighter rounded-lg placeholder:text-gray-800 placeholder:text-opacity-60 focus:outline-none text-sm md:text-base"
        />
        {/* <div className="my-1 w-auto h-4 bg-purpleMainLighter">
          {errors.headline && <p className="text-red-600 text-xs">{errors.headline}</p>}
        </div> */}
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="description" className="font-medium text-base md:text-[22px]">
          Descripción:
        </label>
        <textarea
          id="description"
          name="description"
          value={input.description}
          onChange={handleChange}
          placeholder="Ingresa la descripción del curso"
          className="border h-32 w-full mt-1 px-4 py-2 bg-purpleMainLighter rounded-lg placeholder:text-gray-800 placeholder:text-opacity-60 focus:outline-none text-sm md:text-base"
        />
        {/* <div className="my-1 w-auto h-4 bg-purpleMainLighter">
          {errors.description && <p className="text-red-600 text-xs">{errors.description}</p>}
        </div> */}
      </div>

      <div className="flex flex-row justify-center">
        <button type="submit" className="bg-yellowMain border-2 hover:bg-yellowMainLight rounded-md border-purpleMain text-purpleMain h-10 w-52 mx-7 text-lg mt-5">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default EditCourseForm;
