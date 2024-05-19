"use client";
import styles from "./NavBar.module.css";
import ButtonNavbar from "../buttons/button-navbar";
import ButtonCategoryNavbar from "./button-category-navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoSearchCircle } from "react-icons/io5";
import axios from "axios";
import { ICourse, ILesson, IModule, IProduct } from "@/app/types";
import { getCategoriesDB } from "@/helpers/categories.helper";

const useSearch = (API_URL: string) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<
    (ICourse | IModule | IProduct | ILesson | any)[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}search`);

      const allResources = res.data;

      const nombreBusquedaNormalizado = query
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      const filtrados = allResources.filter((res: { name: string }) => {
        const nombreResultadoNormalizado = res.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        return nombreResultadoNormalizado.includes(nombreBusquedaNormalizado);
      });

      setFilteredResults(filtrados);
    } catch (err) {
      setError("Error al obtener resultados de búsqueda");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      if (timer) {
        clearTimeout(timer);
      }
      const newTimer = setTimeout(() => {
        handleSearch(searchQuery);
      }, 1000);
      setTimer(newTimer);
    } else {
      setFilteredResults([]);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (timer) {
        clearTimeout(timer);
      }
      handleSearch(searchQuery);
    }
  };

  return {
    searchQuery,
    filteredResults,
    loading,
    error,
    handleChange,
    handleKeyPress,
    handleSearch,
  };
};

const Navbar: React.FC = (): JSX.Element => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
  const {
    searchQuery,
    filteredResults,
    handleChange,
    handleKeyPress,
    loading,
    error,
    handleSearch,
  } = useSearch(API_URL);

  const resultsToShow = filteredResults.slice(0, 3);

  return (
    <>
      <nav
        className={`flex items-center justify-between py-4 bg-purpleMain ${styles["navbar-desktop"]}`}
      >
        <Link href="/">
          <div className="text-white text-4xl font-medium">Questie</div>
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
              <div className="text-white text-base font-medium hover:text-yellowMain cursor-pointer">
                Tienda
              </div>
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="justify-center items-center inline-flex w-[32rem] h-12 p-2 bg-purpleMainLighter rounded-lg">
            <input
              className="w-full h-full px-2 py-1 bg-purpleMainLight rounded-lg placeholder:text-white placeholder:text-opacity-70"
              placeholder="Buscar..."
              type="text"
              name="search"
              id="search"
              value={searchQuery}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <button
              className="ml-1"
              onClick={() => handleSearch(searchQuery)}
              disabled={loading}
            >
              <IoSearchCircle className="w-10 h-10 text-purpleMain" />
            </button>
          </div>
          {resultsToShow.length > 0 && (
            <div className="absolute top-full mt-2 w-[32rem] bg-white shadow-lg rounded-lg z-10">
              {resultsToShow.map((result, index) => {
                const linkHref =
                  result.type === "category"
                    ? `/categories/categorie%5B%5D=${result.name}`
                    : result.type === "module"
                    ? `/module/${result.id}`
                    : result.type === "course"
                    ? `/course-review/${result.id}`
                    : `/shop/pay?productId=${result.id}`;

                return (
                  <div key={index} className="p-2 border-b last:border-b-0">
                    <Link href={linkHref} legacyBehavior>
                      <a className="block text-black hover:bg-gray-100 p-2 rounded">
                        {result.name}
                        <br />
                        <span className="bg-purpleMainLighter rounded-lg w-full h-full px-2 py-1">
                          {result.type}
                        </span>
                      </a>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {error && <p className="text-red-500">{error}</p>}
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
            <Link href="/">Inicio</Link>
            <Link href="/categories">Categorías</Link>
            <Link href="/shop">Tienda</Link>
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
