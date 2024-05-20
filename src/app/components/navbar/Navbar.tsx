"use client";
import styles from "./NavBar.module.css";
import ButtonNavbar from "../buttons/button-navbar";
import ButtonCategoryNavbar from "./button-category-navbar";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoSearchCircle } from "react-icons/io5";
import useSearch from "./useSearch";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleResultClick = (result: {
    id: string;
    type: string;
    name: string;
  }) => {
    let url = "";
    switch (result.type) {
      case "course":
        url = `/course-review/${result.id}`;
        break;
      case "module":
        url = `/module/${result.id}`;
        break;
      case "category":
        url = `/categories/categorie%5B%5D=${result.name}`;
        break;
      default:
        url = "/";
    }
    setIsDropdownOpen(false);
    window.location.href = url;
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isDropdownOpen && resultsToShow.length > 0) {
      if (event.key === "ArrowDown") {
        setHighlightedIndex((prevIndex) =>
          prevIndex < resultsToShow.length - 1 ? prevIndex + 1 : 0
        );
      } else if (event.key === "ArrowUp") {
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : resultsToShow.length - 1
        );
      } else if (event.key === "Enter" && highlightedIndex >= 0) {
        handleResultClick(resultsToShow[highlightedIndex]);
      }
    }
  };

  return (
    <>
      <nav
        className={`flex items-center justify-between py-4 bg-purpleMain ${styles["navbar-desktop"]}`}
      >
        <Link href="/" legacyBehavior>
          <a className="text-white text-4xl font-medium">Questie</a>
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
            <Link href="/shop" legacyBehavior>
              <a className="text-white text-base font-medium hover:text-yellowMain cursor-pointer">
                Tienda
              </a>
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
              autoComplete="off"
              value={searchQuery}
              onChange={handleChange}
              onKeyDown={(e) => {
                handleKeyPress(e);
                handleKeyDown(e);
              }}
              onFocus={() => setIsDropdownOpen(true)}
            />
            <button
              className="ml-1"
              onClick={() => {
                handleSearch(searchQuery);
                setIsDropdownOpen(true);
              }}
              disabled={loading}
            >
              <IoSearchCircle className="w-10 h-10 text-purpleMain" />
            </button>
          </div>
          {isDropdownOpen && resultsToShow.length > 0 && (
            <div
              className="absolute top-full mt-2 w-[32rem] bg-white shadow-lg rounded-lg z-10"
              ref={dropdownRef}
            >
              {resultsToShow.map((result, index) => (
                <div
                  key={index}
                  className={`p-2 border-b last:border-b-0 ${
                    highlightedIndex === index ? "bg-gray-200" : ""
                  }`}
                >
                  <Link href="#" legacyBehavior>
                    <a
                      className="block text-black hover:bg-gray-100 p-2 rounded"
                      onClick={() => handleResultClick(result)}
                    >
                      {result.name}
                      <br />
                      <span className="bg-purpleMainLighter rounded-lg w-full h-full px-2 py-1">
                        {result.type}
                      </span>
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
            <Link href="/" legacyBehavior>
              <a>Inicio</a>
            </Link>
            <Link href="/categories" legacyBehavior>
              <a>Categorías</a>
            </Link>
            <Link href="/shop" legacyBehavior>
              <a>Tienda</a>
            </Link>
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
