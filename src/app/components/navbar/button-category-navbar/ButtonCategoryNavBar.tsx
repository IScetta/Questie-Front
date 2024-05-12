"use client";

import { categoriesPreLoad } from "@/helpers/categoriesPreLoad";
import Link from "next/link";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const ButtonCategoryNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div className=" justify-center items-center cursor-pointer ">
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
            className="bg-white origin-top-right absolute right-0 w-[220px] h-auto mt-[4px] rounded-md bg-text border-2 border-terciary ring-1 ring-white ring-opacity-5 focus:outline-none z-10 shadow-[0_5px_15px_0px_#00000042]"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link href={"/Categories"} onClick={toggleDropdown}>
              <h3 className="m-4 p-2 border-b-2 border-black hover:rounded-lg hover:bg-purpleMainLighter">
                Todos los cursos
              </h3>
            </Link>

            {categoriesPreLoad.map((item, index) => (
              <Link href={"/Categories"} onClick={toggleDropdown} key={index}>
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
