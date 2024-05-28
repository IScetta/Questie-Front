"use client";

import { ICategory, ICourse } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { getCategoriesDB } from "@/helpers/categories.helper";
import { putCourse } from "@/helpers/createCourse.helper";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AdminCourses = ({ courses }: { courses: ICourse[] }) => {
  const [coursesList, setCoursesList] = useState<ICourse[]>([]);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [checkboxStates, setCheckboxStates] = useState<boolean[]>([]);
  const [isSorted, setIsSorted] = useState(false);
  const [originalOrder, setOriginalOrder] = useState<ICourse[]>([]);
  const [isReady, setIsReady] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const getCategories = async () => {
      const categories: ICategory[] = await getCategoriesDB();
      setCategories(categories);
      setCoursesList(courses);
      setOriginalOrder(courses);
      setCheckboxStates(Array(categories.length).fill(false));
    };
    getCategories();
  }, [courses]);

  const handleCheckboxChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newCheckboxStates = [...checkboxStates];
      newCheckboxStates[index] = event.target.checked;
      setCheckboxStates(newCheckboxStates);
    };

  const normalizeString = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const orderAlphabetically = () => {
    const sortedCourses = [...coursesList].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setCoursesList(sortedCourses);
    setIsSorted(true);
  };

  const resetOrder = () => {
    setCoursesList(originalOrder);
    setIsSorted(false);
  };

  const getCheckedNames = () => {
    const checkedCategories = categories.filter(
      (_, index) => checkboxStates[index]
    );
    if (checkedCategories.length > 0) {
      const filteredCourses = courses.filter((course) =>
        course.categories.some((category) =>
          checkedCategories.some(
            (filterCategory) =>
              normalizeString(category.name).toLowerCase() ===
              normalizeString(filterCategory.name).toLowerCase()
          )
        )
      );
      setCoursesList(filteredCourses);
    } else {
      setCoursesList(courses);
    }
    setOpen(false);
  };

  const statusCourse = async (course: ICourse) => {
    let status = "";
    if (course.status === "pending") {
      status = "complete";
    } else {
      status = "pending";
    }
    const course_id = course.id;
    const { image, bg_image, description, title, headline } = course;
    setIsReady(!isReady);
    const formData = new FormData();
    formData.append("description", description);
    // formData.append("title", title);
    formData.append("headline", headline);
    formData.append("status", status);
    try {
      const statusAct = await putCourse(formData, course_id, token!);
      console.log(statusAct);
      
    } catch (error: any) {
      console.error(error);
    }
    
  };

  return (
    <div>
      <div className="flex">
        <button
          onClick={() => setOpen(!open)}
          className="flex justify-center items-center bg-yellowMain text-purpleMain p-2 h-10 w-fit m-7 text-lg"
        >
          Categorias
        </button>

        {isSorted ? (
          <button
            onClick={resetOrder}
            className="flex justify-center items-center bg-yellowMain text-purpleMain p-2 h-10 w-fit m-7 text-lg"
          >
            Desordenar
          </button>
        ) : (
          <button
            onClick={orderAlphabetically}
            className="flex justify-center items-center bg-yellowMain text-purpleMain p-2 h-10 w-fit m-7 text-lg"
          >
            Ordenar
          </button>
        )}
      </div>

      {open && (
        <div className="bg-white absolute mt-2 w-auto h-auto rounded-md bg-text border-2 border-terciary ring-1 ring-white ring-opacity-5 focus:outline-none z-10 shadow-[0_5px_15px_0px_#00000042] px-2">
          <div className="h-fit w-fit bg-white col-start-2 col-span-4 pl-10 pr-10">
            <h2 className="my-2 p-2 border-b-2 border-black text-[16px] font-semibold text-gray-900 dark:text-white">
              Categorias:
            </h2>
            {categories.map((category: ICategory, index: number) => (
              <div key={category.id} className="m-2 p-2">
                <label>
                  <input
                    className="m-2"
                    type="checkbox"
                    checked={checkboxStates[index]}
                    onChange={handleCheckboxChange(index)}
                  />
                  {category.name}
                </label>
              </div>
            ))}
            <button
              onClick={getCheckedNames}
              className="my-2 p-4 justify-center items-center bg-yellowMainLight rounded-xl text-lg font-semibold text-gray-900 hover:bg-yellowMain"
            >
              Filtrar
            </button>
          </div>
        </div>
      )}

      {coursesList.map((course: ICourse, index: number) => (
        <div
          key={course.id}
          className=" flex flex-row w-full justify-between items-center bg-blue-gray-50 mt-8 text-start p-8 relative group"
        >
          <div>
            <p className="text-xl font-semibold">{course.title}</p>
            <p className="text-sm mt-2">Cantidad de alumnos:</p>
          </div>

          <div className="flex justify-center items-center ">
            {course.status === "pending"  ? (
              <div className=" flex-row m-2 relative group inline-block">
                <button
                  onClick={() => statusCourse(course)}
                  className="p-2 m-4  w-fit text-[20px]  bg-red-500 rounded-lg "
                >
                  <FaTimesCircle className="text-[20px]" />
                </button>
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 px-2 py-1  bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  En Proceso
                </div>
              </div>
            ) : (
              <div className=" flex-row m-2 relative group inline-block">
                <button
                  onClick={() => statusCourse(course)}
                  className="p-2 m-4  w-fit  bg-light-green-500 rounded-lg"
                >
                  <FaCheckCircle className="text-[20px]" />
                </button>
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 px-2 py-1  bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  Finalizado
                </div>
              </div>
            )}
            <Link
              href={`/admin/create-module/${course.id}`}
              className="flex justify-center items-center bg-yellowMain text-purpleMain h-10 w-44 ml-7 text-lg"
            >
              Editar Curso
            </Link>
          </div>

          {/* <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Comentario del curso
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default AdminCourses;
