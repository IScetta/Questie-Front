"use client";

import { ICourse } from "@/app/types";
import Link from "next/link";
import React, { useState } from "react";

const SideBar = ({course}: {course: ICourse}) => {
  const [open, setOpen] = useState(false);
  let numberModule = 1;
  return (
    <div className='bg-purpleMain py-3 fixed top-0 left-0 right-0 shadow-md z-99 z-50'>
        <div>
             <button className='ml-4 text-yellowMain' onClick={() => setOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
        </div>
     

      <div className={`${!open && "hidden"} bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm`} onClick={() => setOpen(false)}></div>

      <div className={`${open ? "w-80" : "w-0"} bg-purpleMainLight min-h-screen fixed top-0 left-0 transition-all duration-300 z-20 h-full`}>
        <div className={`${!open && "hidden"} pt-3`}>
          <button className='ml-4 text-white mb-14' onClick={() => setOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className='text-center text-white text-xl hover:bg-purpleMain cursor-pointer py-3 mb-2'>Modulos:</div>
          <div>
          {course.modules.length > 0 ? (
          course.modules.map((module: any, index: any) => (
            <Link href={`/module/${module.id}`} key={index}>
              <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter justify-center ml-7 mx- pl-5 pr-5 py-3 w-4/5 h-[4.5rem]  content-center cursor-pointer rounded-lg">
                <p className="text-xs font-light">Módulo {numberModule++}</p>
                <p className="text-base font-semibold line-clamp-1">
                  {module.title}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer">
            <p>No hay módulos</p>
          </div>
        )}
          </div>
         
      </div>
      
          
        </div>
      </div>
   
  );
};

export default SideBar;
