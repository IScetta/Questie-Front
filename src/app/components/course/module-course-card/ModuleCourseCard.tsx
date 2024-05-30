"use client";

import { ICourse } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GoArrowDown, GoArrowUp } from "react-icons/go";

const ModuleCourseCard = ({ course }: { course: ICourse }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative ">
      <div className="m-6 p-4  bg-purpleMainLighter rounded-xl  shadow-[0_5px_15px_0px_#00000042]">
        <div className="flex items-center p-8 border-b-2 border-gray-700">
          <Image
            className="w-12 h-12 rounded-full"
            src={course.image}
            alt="program"
            width={1000}
            height={1000}
          />
          <Link
            href={`/module/${course.modules[0].id}`}
            className="text-[22px] font-semibold leading-6 p-2 cursor-pointer hover:underline"
          >
            {course?.modules[0]?.title}
          </Link>
        </div>
        <div className="grid grid-cols-3 w-full text-start">
          {course?.modules[0]?.lessons?.length >= 1
            ? course?.modules[0]?.lessons?.map((lesson: any, index: any) => (
                <h3 className="m-2 mx-8 text-[18px] line-clamp-1" key={index}>
                  {lesson.title}
                </h3>
              ))
            : null}
        </div>
      </div>

      <div>
        {isOpen ? (
          <div className=" bg-white shadow-md  w-full">
            {course?.modules.length >= 1 ? (
              course?.modules?.map((module: any, index: any) => (
                <div key={index} className="">
                  {index !== 0 && (
                    <div className="m-6 p-4 bg-purpleMainLighter rounded-xl shadow-[0_5px_15px_0px_#00000042]">
                      <div className="flex items-center p-8 border-b-2 border-gray-700">
                        <Image
                          className="w-12 h-12 rounded-full"
                          src={course.image}
                          alt="program"
                          width={1000}
                          height={1000}
                        />
                        <Link
                          href={`/module/${module.id}`}
                          className="text-[22px] font-semibold leading-6 p-2 cursor-pointer hover:underline"
                        >
                          {module.title}
                        </Link>
                      </div>
                      <div className="grid grid-cols-3 w-full text-start">
                        {module?.lessons?.map((lesson: any, index: any) => (
                          <h3
                            className="m-2 mx-8 text-[18px] line-clamp-1"
                            key={index}
                          >
                            {lesson.title}
                          </h3>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div>
                <h1>No hay modulos</h1>
              </div>
            )}
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
export default ModuleCourseCard;
