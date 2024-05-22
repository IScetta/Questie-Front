"use client";
import { useState } from "react";
import Link from "next/link";
import SearchBar from "./search-bar/searchBar";
import ButtonNavbar from "../buttons/button-navbar";
import SideBar from "../sidebar";
import ButtonCategoryNavBar from "./button-category-navbar"; // Ajusta la ruta según tu estructura de archivos

const Navbar: React.FC = (): JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="w-full space-x-4 flex items-center justify-between px-4 py-4 bg-purpleMain sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-[11.5rem]">
        <button
          className="ml-4 xl:hidden text-yellowMain text-sm sm:text-base lg:text-lg font-semibold cursor-pointer px-2 py-1 sm:px-4 sm:py-2 rounded-lg"
          onClick={() => setIsSidebarOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
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
            <a className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium sm:font-normal mr-20">
              Questie
            </a>
          </Link>
        </div>
        <div className="justify-start hidden md:flex">
          <ButtonCategoryNavBar />
        </div>
        <SearchBar />
        <div className="flex justify-end ">
          <ButtonNavbar />
        </div>
      </nav>
      <SideBar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
    </>
  );
};

export default Navbar;
