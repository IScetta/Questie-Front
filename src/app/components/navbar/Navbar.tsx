"use client";
import { useState } from "react";
import Link from "next/link";
import SearchBar from "./searchbar/SearchBar";
import ButtonNavbar from "../buttons/button-navbar";
import ButtonCategoryNavBar from "./button-category-navbar"; // Ajusta la ruta según tu estructura de archivos

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
            <a className="text-white text-5xl">Questie</a>
          </Link>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6 xl:space-x-8">
          <ButtonCategoryNavBar />
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
