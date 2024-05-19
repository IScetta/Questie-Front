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

const useSearch = (API_URL: string) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<
    (ICourse | IModule | IProduct)[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    const res = await axios.get(`${API_URL}search`);
    try {
      console.log(res.data);

      const allResources = res.data;

      console.log(allResources);

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

      console.log(filtrados);

      /* setFilteredResults(filtrados); */
    } catch (err) {
      setError("Error al obtener resultados de búsqueda");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      handleSearch(searchQuery);
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
    handleSearch, // Añadido aquí para el uso en Navbar
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
    handleSearch, // Añadido aquí para el uso en Navbar
  } = useSearch(API_URL);

  const getResultsByType = () => {
    const resultsByType: {
      course?: ICourse | any;
      module?: IModule | any;
      product?: IProduct | any;
    } = {};

    for (const result of filteredResults) {
      if ("courseSpecificProperty" in result && !resultsByType.course) {
        resultsByType.course = result;
      } else if ("moduleSpecificProperty" in result && !resultsByType.module) {
        resultsByType.module = result;
      } else if (
        "productSpecificProperty" in result &&
        !resultsByType.product
      ) {
        resultsByType.product = result;
      }

      if (
        resultsByType.course &&
        resultsByType.module &&
        resultsByType.product
      ) {
        break;
      }
    }

    return Object.values(resultsByType).filter(Boolean);
  };

  const resultsToShow = getResultsByType();

  return (
    <>
      <nav
        className={`flex items-center justify-between py-4 bg-purpleMain ${styles["navbar-desktop"]}`}
      >
        <Link href="/">
          <h1 className="text-white text-4xl font-medium">Questie</h1>
        </Link>
        <div className="flex items-center justify-between space-x-4">
          <ButtonCategoryNavbar categories={[]} />
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
            <div className="absolute top-full mt-2 w-[32rem] bg-white shadow-lg rounded-lg">
              {resultsToShow.map((result, index) => (
                <div key={index} className="p-2 border-b last:border-b-0">
                  <Link href={`/details/${result.id}`}>
                    <a className="block text-black hover:bg-gray-100 p-2 rounded">
                      {result.name}
                    </a>
                  </Link>
                </div>
              ))}
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
