"use client";

import Link from "next/link";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoSearchCircle } from "react-icons/io5";
import ButtonCategoryNavbar from "./button-category-navbar";
import ButtonNavbar from "../buttons/button-navbar";
import styles from "./NavBar.module.css";
import axios, { AxiosResponse } from "axios";
import { ICourse } from "@/app/types";

const Navbar: React.FC = (): JSX.Element => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    // Aquí podrías implementar la lógica de búsqueda,
    // por ejemplo, redirigir a una página de resultados con la consulta de búsqueda.
    console.log("Realizar búsqueda con:", searchQuery);
    const courses: AxiosResponse<ICourse> = await axios.get(
      `${API_URL}courses`
    );
    const products: AxiosResponse<ICourse> = await axios.get(
      `${API_URL}products`
    );
    /* const categories: AxiosResponse<ICourse> = await axios.get(
      `${API_URL}categories`
    ); */
    console.log(courses);
    console.log(products); /* 
    console.log(categories); */
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <nav
        className={`flex items-center justify-between px-[11.5rem] py-4 bg-purpleMain ${styles["navbar-desktop"]}`}
      >
        <Link href="/">
          <h1 className="text-white text-4xl font-medium">Questie</h1>
        </Link>
        <div className="flex items-center justify-between space-x-4">
          <ButtonCategoryNavbar />
          <div className="justify-center items-center inline-flex cursor-pointer">
            <p className="text-white text-base font-medium hover:text-yellowMain cursor-pointer">
              Comunidad
            </p>
            <FaCaretDown className="text-white w-4 h-auto cursor-pointer" />
          </div>
          <div className="justify-center items-center inline-flex cursor-pointer">
            <Link href="/shop">
              <p className="text-white text-base font-medium hover:text-yellowMain cursor-pointer">
                Tienda
              </p>
            </Link>
          </div>
        </div>
        <div className="justify-center items-center inline-flex w-[32rem] h-12 p-2 bg-purpleMainLighter rounded-lg">
          <input
            className="w-full h-full px-2 py-1 bg-purpleMainLight rounded-lg placeholder:text-white placeholder:text-opacity-70"
            placeholder="Buscar..."
            type="text"
            name="search"
            id="search"
          />
          <button className="ml-1">
            <IoSearchCircle className="w-10 h-10 text-purpleMain" />
          </button>
        </div>
        <ButtonNavbar />
      </nav>
      <nav className={styles["navbar-mobile"]}>
        <div className={styles["navbar-mobile-menu"]}>
          <div className={styles["navbar-mobile-menu-button"]}></div>
          <input
            type="checkbox"
            className={styles["navbar-mobile-menu-activator"]}
          />
          <div className={styles["navbar-mobile-menu-links"]}>
            <Link href={"/"}>Home</Link>
            <Link href={"/categories"}>Categories</Link>
            <Link href={"/shop"}>Shop</Link>
          </div>
        </div>
        <div className={styles["navbar-mobile-title"]}>
          <h2>Questie</h2>
        </div>
        <div className={styles["navbar-mobile-button"]}>
          <ButtonNavbar />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
