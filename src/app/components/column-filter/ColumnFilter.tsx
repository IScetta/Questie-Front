"use client";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import data from "@/helpers/categoriesPreLoad.json";
import { useRouter } from "next/navigation";
import { getCategoriesDB } from "@/helpers/categories.helper";
import { ICategory } from "@/app/types";

const ColumnFilter = ({categories}:{categories:ICategory[]})=> {

  // console.log(categories)
  const [checkboxStates, setCheckboxStates] = useState(
    Array(categories.length).fill(false)
  );

  const route = useRouter();

  const handleCheckboxChange =
  (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = event.target.checked;
    setCheckboxStates(newCheckboxStates);
  };

const getCheckedNames = () => {
  const list = categories
    .filter((category, index) => checkboxStates[index])
    .map((category) => category.name);
  // Array de categorías
  const encodedCategories = list.map((category) => encodeURIComponent(category));
  const formattedURL = encodedCategories
    .map((category) => `categorie%5B%5D=${category}`)
    .join("&");

  route.push(`/categories/${formattedURL}`);

  return list;
};

  return (
    <div className="justify-center items-center grid grid-cols-1">
      <div className="h-full w-80 bg-purpleMainLight col-start-2 col-span-4 pl-10 pr-10">
        <h2 className="my-2 p-4 bg-purpleMainLighter rounded-xl text-lg font-semibold text-gray-900 dark:text-white">
          Categorias:
        </h2>
        {categories.map((category: any, index: number) => (
          <div key={index}>
            <p className=" bg-purpleMainLighter m-2 p-2">
              <label>
                <input
                  className="m-2"
                  type="checkbox"
                  checked={checkboxStates[index]}
                  onChange={handleCheckboxChange(index)}
                />
                {category.name}
              </label>
            </p>
          </div>
        ))}
        <button
          onClick={getCheckedNames}
          className="my-2 p-4  justify-center items-center bg-yellowMainLight rounded-xl text-lg font-semibold text-gray-900 hover:bg-yellowMain"
        >
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default ColumnFilter;
