"use client";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import data from "@/helpers/categoriesPreLoad.json";
import { useRouter } from "next/navigation";

const ColumnFilter: React.FC = (): JSX.Element => {
  const [checkboxStates, setCheckboxStates] = useState(Array(data.length).fill(false))

  const route = useRouter();

  const handleCheckboxChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newCheckboxStates = [...checkboxStates]
      newCheckboxStates[index] = event.target.checked
      setCheckboxStates(newCheckboxStates)
    }

    const getCheckedNames = () => {
      const list = data.filter((category, index) => checkboxStates[index]).map(category => category.name);
      // Array de géneros
      const encodedGenres = list.map(genre => encodeURIComponent(genre));
      const formattedURL = encodedGenres.map(genre => `categorie%5B%5D=${genre}`).join('&');

      route.push(`/categories/${formattedURL}`)

      return list;
    }

  return (
    <div className="justify-center items-center grid grid-cols-1">
      <div className="h-full w-80 bg-purpleMainLight col-start-2 col-span-4 pl-10 pr-10">
        <h2 className="my-2 p-4 bg-purpleMainLighter rounded-xl text-lg font-semibold text-gray-900 dark:text-white">
          Categorias:
        </h2>
        {data.map((category: any, index: number) => (
          <div key={index}>
            <p className=" bg-purpleMainLighter m-2 p-2">
              <label>
                <input className="m-2"
                  type="checkbox"
                  checked={checkboxStates[index]}
                  onChange={handleCheckboxChange(index)}
                />
                {category.name}
              </label>
            </p>
          </div>
        ))}
        <button onClick={getCheckedNames} className="my-2 p-4  justify-center items-center bg-purpleMainLighter rounded-xl text-lg font-semibold text-gray-900">Filtrar</button>
      </div>
    </div>
  );
};

export default ColumnFilter;
