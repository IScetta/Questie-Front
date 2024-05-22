import { useState, useEffect, useRef } from "react";
import { IoSearchCircle } from "react-icons/io5";
import Link from "next/link";
import useSearch from "./useSearch";

const SearchBar: React.FC = (): JSX.Element => {
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
  const [isExpanded, setIsExpanded] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
      setIsExpanded(false); // Contraer la barra de búsqueda cuando se hace clic fuera
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
    setIsExpanded(false); // Contraer la barra de búsqueda después de seleccionar un resultado
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
    <div className="relative  hidden md:flex w-80  justify-start flex-1  mr-10">
      {isExpanded ? (
        <div className="flex justify-center items-center p-2 bg-purpleMainLighter rounded-lg w-64">
          <>
            <input
              className="w-48 h-full px-2 py-1 bg-purpleMainLight rounded-lg placeholder:text-white placeholder:text-opacity-70"
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
              <IoSearchCircle className="w-8 sm:w-10 h-8 sm:h-10 text-purpleMain" />
            </button>
          </>
        </div>
      ) : (
        <button onClick={() => setIsExpanded(true)} className="ml-1">
          <IoSearchCircle className="w-8 sm:w-10 h-8 sm:h-10 text-purpleMainLighter" />
        </button>
      )}
      {isDropdownOpen && resultsToShow.length > 0 && (
        <div
          className="absolute top-full mt-2 w-full md:max-w-64 bg-white shadow-lg rounded-lg z-10"
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
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SearchBar;
