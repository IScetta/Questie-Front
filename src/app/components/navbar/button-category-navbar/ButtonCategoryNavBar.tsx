import { useState, useEffect, useRef } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import Link from "next/link";
import { ICategory } from "@/app/types";
import { getCategoriesDB } from "@/helpers/categories.helper";

const ButtonCategoryNavBar: React.FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getCategories = async (): Promise<ICategory[]> => {
    return getCategoriesDB();
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMouseEnter = () => {
    setIsOpen(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }, 1000);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isOpen && categories.length > 0) {
      if (event.key === "ArrowDown") {
        setHighlightedIndex((prevIndex) =>
          prevIndex < categories.length - 1 ? prevIndex + 1 : 0
        );
      } else if (event.key === "ArrowUp") {
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : categories.length - 1
        );
      } else if (event.key === "Enter" && highlightedIndex >= 0) {
        window.location.href = `/categories/categorie%5B%5D=${categories[highlightedIndex].name}`;
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="relative text-left items-center hidden xl:flex xl:space-x-4">
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex flex-row justify-center items-center text-white text-base font-medium hover:text-yellowMain cursor-pointer"
        >
          Cursos
          {isOpen ? (
            <FaCaretUp className="text-white w-4 h-auto cursor-pointer" />
          ) : (
            <FaCaretDown className="text-white w-4 h-auto cursor-pointer" />
          )}
        </button>

        <div className="flex gap-2 ml-4 xl:space-x-4">
          <button className="text-white text-base font-medium hover:text-yellowMain cursor-pointer">
            Comunidad
          </button>
          <button className="text-white text-base font-medium hover:text-yellowMain cursor-pointer">
            Tienda
          </button>
        </div>
      </div>
      {isOpen && (
        <div
          className="bg-white origin-top-right absolute right-0 mt-8 w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px] xl:w-[300px] h-auto rounded-md bg-text border-2 border-terciary ring-1 ring-white ring-opacity-5 focus:outline-none z-10 shadow-[0_5px_15px_0px_#00000042] px-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          onKeyDown={handleKeyDown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link href={`/categories/`} onClick={() => setIsOpen(false)}>
            <h3 className="m-4 p-2 hover:rounded-lg hover:bg-purpleMainLighter">
              Todos los cursos
            </h3>
          </Link>
          <div className="w-full h-[1px] bg-gray-400"></div>

          {categories.map((item: ICategory, index: number) => (
            <Link
              href={`/categories/categorie%5B%5D=${item.name}`}
              onClick={() => setIsOpen(false)}
              key={item.id}
            >
              <h3
                className={`m-4 p-2 rounded-lg hover:bg-purpleMainLighter ${
                  highlightedIndex === index ? "bg-purpleMainLighter" : ""
                }`}
              >
                {item.name}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ButtonCategoryNavBar;
