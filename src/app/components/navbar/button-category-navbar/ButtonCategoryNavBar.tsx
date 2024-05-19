"use client";

import { ICategory } from "@/app/types";
import { getCategoriesDB } from "@/helpers/categories.helper";
import { categoriesPreLoad } from "@/helpers/categoriesPreLoad";
import { promises } from "dns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const ButtonCategoryNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const getCategories = async (): Promise<ICategory[]> => {
    return getCategoriesDB();
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="justify-center items-center cursor-pointer">
        <button
          onClick={toggleDropdown}
          className="flex flex-row justify-center items-center text-white text-base font-medium hover:text-yellowMain cursor-pointer"
        >
          Categorias
          {isOpen ? (
            <FaCaretUp className="text-white w-4 h-auto cursor-pointer" />
          ) : (
            <FaCaretDown className="text-white w-4 h-auto cursor-pointer" />
          )}
        </button>
      </div>

      <div>
        {isOpen && (
          <div
            className="bg-white origin-top-right absolute right-0 w-[220px] h-auto mt-[4px] rounded-md bg-text border-2 border-terciary ring-1 ring-white ring-opacity-5 focus:outline-none z-10 shadow-[0_5px_15px_0px_#00000042] px-2"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link href={`/categories/`} onClick={toggleDropdown}>
              <h3 className="m-4 p-2 hover:rounded-lg hover:bg-purpleMainLighter">
                Todos los cursos
              </h3>
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>

            {categories.map((item:ICategory) => (
              <Link href={`/categories/categorie%5B%5D=${item.name}`} onClick={toggleDropdown} key={item.id}>
                <h3 className="m-4 p-2 rounded-lg hover:bg-purpleMainLighter">
                  {item.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ButtonCategoryNavBar;
