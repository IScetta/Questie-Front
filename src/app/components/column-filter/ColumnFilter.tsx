"use client";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import data from "@/helpers/categoriesPreLoad.json";

const ColumnFilter: React.FC = (): JSX.Element => {
  const [isOpenArray, setIsOpenArray] = useState(new Array(data.length).fill(false));

  const handleToggle = (index: number) => {
    const newIsOpenArray = isOpenArray.map((isOpen, i) => (i === index ? !isOpen : isOpen));
    setIsOpenArray(newIsOpenArray);
  };

  return (
    <div className="justify-center items-center grid grid-cols-1">
      <div className="h-full w-80 bg-purpleMainLight col-start-2 col-span-4 pl-10 pr-10">
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Categories:
        </h2>
        {data.map((category: any, index: number) => (
          <div key={index}>
            <p>
              {category.name}
              <button onClick={() => handleToggle(index)}>
                {isOpenArray[index] ? <FaCaretDown /> : <FaCaretUp />}
              </button>
              {isOpenArray[index] && (
                <div className="bg-white shadow-md w-full">
                  <p>{category.contenidos[0].contenido}</p>
                </div>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnFilter;
