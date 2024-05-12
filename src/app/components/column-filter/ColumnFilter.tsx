"use client"
import { useState } from "react";
import { GoArrowDown, GoArrowUp } from "react-icons/go";

const ColumnFilter: React.FC = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
   
  return (
    <div className=" justify-center items-center grid grid-cols-1  ">
      <div className="h-full w-80 bg-purpleMainLight col-start-2 col-span-4 pl-10 pr-10">

        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Categories:
        </h2>


          <button
          onClick={() => setIsOpen(!isOpen)}
          className=" bg-purpleMainLight hover:bg-purpleMainLighter  w-12 h-12 mt-2 flex justify-center items-center "
        >
          {isOpen ? (
            <GoArrowUp className="w-8 h-8 " />
          ) : (
            <GoArrowDown className="w-8 h-8 " />
          )}
        </button>

        <div>
        {isOpen ? (
          <div className=" bg-white shadow-md  w-full">
         <p>1</p>
         <p>2</p>
         <p>algoooo</p>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div>ALgo</div>
      <button
          onClick={() => setIsOpen(!isOpen)}
          className=" bg-purpleMainLight hover:bg-purpleMainLighter  w-12 h-12 mt-2 flex justify-center items-center "
        >
          {isOpen ? (
            <GoArrowUp className="w-8 h-8 " />
          ) : (
            <GoArrowDown className="w-8 h-8 " />
          )}
        </button>

        <div>algo</div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className=" bg-purpleMainLight hover:bg-purpleMainLighter  w-12 h-12 mt-2 flex justify-center items-center "
        >
          {isOpen ? (
            <GoArrowUp className="w-8 h-8 " />
          ) : (
            <GoArrowDown className="w-8 h-8 " />
          )}
        </button>
        <div>
        {isOpen ? (
          <div className=" bg-white shadow-md  w-full">
         <p>1</p>
         <p>2</p>
         <p>algoooo</p>
          </div>
        ) : (
          <></>
        )}
      </div>
        
      
      </div>
    </div>
  );
};

export default ColumnFilter;
