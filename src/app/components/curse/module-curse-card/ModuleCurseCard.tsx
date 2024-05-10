"use client";

import Image from "next/image";
import { useState } from "react";
import { GoArrowDown, GoArrowUp } from "react-icons/go";

const ModuleCurseCard = ({ items }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative ">
      <div>
        {isOpen ? (
          <div className=" bg-white shadow-md  w-full">
            {items.map((item: any, index: any) => (
              <div key={index} className="">
                <div className="m-6 p-4  bg-purpleMainLighter rounded-xl  shadow-[0_5px_15px_0px_#00000042]">
                  <div className="flex items-center p-8 border-b-2  border-red-900">
                    <Image
                      className=" rounded-full"
                      src="https://e7.pngegg.com/pngimages/73/928/png-clipart-web-development-logo-computer-programming-design-trademark-logo-thumbnail.png"
                      alt="program"
                      width={50}
                      height={50}
                    />
                    <h2 className="text-[22px] leading-6 p-2 cursor-pointer">
                      {item.titulo}
                    </h2>
                  </div>
                  <div className="flex flex-wrap w-[80%]">
                    <h3 className="p-2 mx-8 text-[18px]" key={index}>
                      {item.modulo}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex justify-center items-start ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className=" bg-purpleMainLight hover:bg-purpleMainLighter rounded-full w-12 h-12 mt-2 flex justify-center items-center "
        >
          {isOpen ? (
            <GoArrowUp className="w-8 h-8 " />
          ) : (
            <GoArrowDown className="w-8 h-8 " />
          )}
        </button>
      </div>
    </div>
  );
};
export default ModuleCurseCard;
