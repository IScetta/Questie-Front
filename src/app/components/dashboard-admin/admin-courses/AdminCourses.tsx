"use client";

import { ICategory, ICourse } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { getCategoriesDB } from "@/helpers/categories.helper";
import { putCourse } from "@/helpers/createCourse.helper";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AdminCourses = ({ courses }: { courses: ICourse[] }) => {
  const [open, setOpen] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [isOrder, setIsOrder] = useState("Por Defecto");
  const [isStatus, setIsStatus] = useState(false);
  const [status , setStatus] = useState("Todos")
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [checkboxStates, setCheckboxStates] = useState<boolean[]>([]);

  const [coursesList, setCoursesList] = useState<ICourse[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const getCategories = async () => {
      const categories: ICategory[] = await getCategoriesDB();
      setCategories(categories);
      setCoursesList(courses);
      setCheckboxStates(Array(categories.length).fill(false));
    };
    getCategories();
  }, [courses]);

  const filter = {
    status: [{status:"Finalizados", statusFilter:"complete"}, {status:"En Proceso",statusFilter:"pending"}, {status:"Todos",statusFilter:"Todos"}],
    orden: ["Por Defecto", "Nombre A-Z"],
    Categoria: categories,
  };

  const handleCheckboxChangeCategories =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newCheckboxStates = [...checkboxStates];
      newCheckboxStates[index] = event.target.checked;
      setCheckboxStates(newCheckboxStates);
    };

  const normalizeString = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const orderAlphabetically = (coursesListOrder: ICourse[]) => {
    const sortedCourses = [...coursesListOrder].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    return sortedCourses;
  };

  const getCheckedNames = () => {
    const checkedCategories = categories.filter(
      (_, index) => checkboxStates[index]
    );
    let filteredCoursesCategories = courses
    if (checkedCategories.length > 0) {
     filteredCoursesCategories = courses.filter((course) =>
      course.categories.some((category) =>
        checkedCategories.some(
          (filterCategory) =>
            normalizeString(category.name).toLowerCase() ===
            normalizeString(filterCategory.name).toLowerCase()
        )
      )
    )}
    
    let filtered = filteredCoursesCategories;

    if (!(statusFilter === "Todos")) {
       filtered = filteredCoursesCategories.filter(
        (course) => course.status === statusFilter
      );
    }

    if (isOrder === "Nombre A-Z") {
      filtered = orderAlphabetically(filtered);
    }
    setCoursesList(filtered!);
    setOpen(false);
  };

  const statusCourse = async (course: ICourse) => {
    const status = course.status === "pending" ? "complete" : "pending";
    const { id: course_id, description, title, headline } = course;
    const formData = {
      description,
      title,
      headline,
      status,
    };
    try {
      const statusAct = await putCourse(formData, course_id, token!);
      const updatedCourses = coursesList.map((c) =>
        c.id === course_id ? { ...c, status } : c
      );
      setCoursesList(updatedCourses);
      console.log(statusAct);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center shadow-[0_5px_15px_0px_#00000042]">
        <div>
          <button
            onClick={() => setOpen(!open)}
            className="flex justify-center items-center  bg-purpleMainLighter rounded-md text-purpleMain p-2 h-10 w-fit m-2 text-lg"
          >
            Categorias {open ? (
            <FaCaretUp className="text-purpleMain w-4 h-auto cursor-pointer" />
          ) : (
            <FaCaretDown className="text-purpleMain w-4 h-auto cursor-pointer" />
          )}
          </button>
          {open && (
            <div className="bg-white absolute  w-auto h-auto rounded-md bg-text border-2 border-terciary ring-1 ring-white ring-opacity-5 focus:outline-none z-10 shadow-[0_5px_15px_0px_#00000042] px-2">
              <div className="h-fit w-fit bg-white col-start-2 col-span-4 pl-10 pr-10">
                <h2 className="my-2 p-2 border-b-2 border-black text-[16px] font-semibold text-gray-900 dark:text-white">
                  Categorias:
                </h2>
                {categories.map((category: ICategory, index: number) => (
                  <div key={category.id} className="m-2 p-2 hover:bg-blue-gray-50">
                    <label>
                      <input
                        className="m-2"
                        type="checkbox"
                        checked={checkboxStates[index]}
                        onChange={handleCheckboxChangeCategories(index)}
                      />
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setIsSorted(!isSorted)}
            className="flex justify-center items-center bg-purpleMainLighter rounded-md text-purpleMain p-2 h-10 w-fit m-2 text-lg"
          >
            Orden: {isOrder}
          </button>
          {isSorted ? (
            <div className="bg-white absolute w-auto h-auto rounded-md bg-text border-2 border-terciary ring-1 ring-white ring-opacity-5 focus:outline-none z-10 shadow-[0_5px_15px_0px_#00000042] px-2">
              <div className="h-fit w-fit bg-white col-start-2 col-span-4 pl-10 pr-10">
                {filter.orden.map((option, index) => (
                  <div key={index} className="m-2 p-2 hover:bg-blue-gray-50">
                    <button
                      onClick={() => {
                        setIsOrder(option);
                        setIsSorted(!isSorted);
                      }}
                      className="m-2"
                    >
                      {option}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div>
          <button
            onClick={() => setIsStatus(!isStatus)}
            className="flex justify-center items-center bg-purpleMainLighter rounded-md text-purpleMain p-2 h-10 w-fit m-2 text-lg"
          >
            Estado: {status}
          </button>

          {isStatus && (
            <div className="bg-white absolute w-fit h-auto rounded-md bg-text border-2 border-terciary ring-1 ring-white ring-opacity-5 focus:outline-none z-20 shadow-[0_5px_15px_0px_#00000042] px-2">
              <div className="h-fit w-fit bg-white col-start-2 col-span-4 pl-10 pr-10">
                {filter.status.map((status, index) => (
                  <div key={index} className="m-2 p-2 hover:bg-blue-gray-50">
                    <button
                      onClick={() => {
                        setStatusFilter(status.statusFilter);
                        setIsStatus(!isStatus);
                        setStatus(status.status)
                      }}
                      className="m-2"
                    >
                      {}{status.status}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={getCheckedNames}
          className="m-2 p-4 justify-center items-center bg-yellowMainLight rounded-xl text-lg font-semibold text-gray-900 hover:bg-yellowMain"
        >
          Filtrar
        </button>
      </div>

      {coursesList.map((course: ICourse) => (
        <div
          key={course.id}
          className="flex flex-row w-full justify-between items-center bg-blue-gray-50 mt-8 text-start p-8 "
        >
          <div>
            <p className="text-xl font-semibold">{course.title}</p>
            <p className="text-sm mt-2">Cantidad de alumnos: {}</p>
          </div>

          <div className="flex justify-center items-center ">
            {course.status === "pending" ? (
              <div className="flex-row m-2 relative group inline-block">
                <button
                  onClick={() => statusCourse(course)}
                  className="p-2 m-4 w-fit text-[20px] bg-red-500 rounded-lg"
                >
                  <FaTimesCircle className="text-[20px]" />
                </button>
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 px-2 py-1 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  En Proceso
                </div>
              </div>
            ) : (
              <div className="flex-row m-2 relative group inline-block">
                <button
                  onClick={() => statusCourse(course)}
                  className="p-2 m-4 w-fit bg-light-green-500 rounded-lg"
                >
                  <FaCheckCircle className="text-[20px]" />
                </button>
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 px-2 py-1 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  Finalizado
                </div>
              </div>
            )}
            <Link
              href={`/admin/create-course/${course.id}`}
              className="flex justify-center items-center bg-purpleMainLighter text-purpleMain h-10 w-44 ml-7 text-lg"
            >
              Editar Curso
            </Link>

            <Link
              href={`/admin/create-module/${course.id}`}
              className="flex justify-center items-center bg-yellowMain text-purpleMain h-10 w-44 ml-7 text-lg"
            >
              Editar Contenido
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminCourses;
