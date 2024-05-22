"use client";
import { useState } from "react";
import Link from "next/link";
import SearchBar from "./search-bar/searchBar";
import ButtonNavbar from "../buttons/button-navbar";
import ButtonCategoryNavBar from "./button-category-navbar"; // Ajusta la ruta según tu estructura de archivos
import { ICourse } from "@/app/types";

const course: ICourse = {
  id: "1dbe0b43-87ea-4955-8903-eb4600456659",
  title: "Introducción a la Programación en Python",
  slug: "introduccion-a-la-programacion-en-python-1715895347062",
  headline: "Domina Python desde cero",
  description:
    "Este curso te llevará a través de los conceptos básicos de la programación utilizando el lenguaje Python. Desde la sintaxis básica hasta las estructuras de control y los tipos de datos, estarás listo para construir tus propias aplicaciones al finalizar este curso de introducción.",
  image: "https://placehold.co/600x400.png",
  bg_image: "https://placehold.co/1000x200.png",
  created_at: "2024-05-16T21:35:48.030Z",
  updated_at: "2024-05-16T21:35:48.030Z",
  deleted_at: null,
  modules: [
    {
      id: "6e4d1032-c383-49b9-9ef4-12255f56f1a9",
      title: "Estructuras de Datos en Python",
      lessons: [
        {
          id: "215b9aea-e294-4f93-86fe-8300be4da5a9",
          title: "Introducción a las estructuras de datos en Python",
        },
      ],
    },
  ],
  categories: [{ id: "", name: "" }],
};

const Navbar: React.FC = (): JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="w-full flex sm:flex items-center justify-between px-4 py-4 bg-purpleMain sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-[11.5rem] ">
        <button
          className="xl:hidden text-yellowMain text-sm sm:text-base lg:text-lg font-semibold cursor-pointer px-2 py-1 sm:px-4 sm:py-2 rounded-lg"
          onClick={() => setIsSidebarOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="flex items-center ml-5">
          <Link href="/" legacyBehavior>
            <a className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl mr-4 sm:mr-8 md:mr-20">
              Questie
            </a>
          </Link>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6 xl:space-x-8">
          <ButtonCategoryNavBar />
        </div>
        <div className="space-x-8 lg:space-x-4">
          <SearchBar />
        </div>
        <div className="">
          <ButtonNavbar />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
