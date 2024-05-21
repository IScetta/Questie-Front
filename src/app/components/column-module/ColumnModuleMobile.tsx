'use client'
import Link from "next/link";
import { useState } from "react";
import styles from './ColumnModule.module.css'
import { ICourse } from "@/app/types";

const ColumnModuleMobile = ({course}: {course: ICourse}) => {
    let numberModule = 1;
    const [IsOpen, setIsOpen] = useState(false)
    const toogleColumnModule = () => {
        setIsOpen(!IsOpen)
    }
    return (
        <div className={` justify-center items-center grid grid-cols-1 ${styles['ColumnModuleContainerMobile']}`}>
            <div className={`h-full w-80 bg-purpleMainLight col-start-2 col-span-4 px-7 ${styles['ColumnModuleMobile']} ${IsOpen ? styles['MyVisible'] : styles['MyHidden']}`}>
                <Link href={`/course-review/${course.id}`}>
                <div className="bg-whiteColumn my-5 py-3 mt-10 flex flex-nowrap w-full h-[4.5rem] content-center hover:bg-purpleMainLighter">
                    <div className="bg-image w-12 h-12 rounded-full ml-2"></div>
                    <div className="flex flex-col ml-2 justify-center w-[12.5rem]">
                    <p className="font-bold text-base line-clamp-1">{course.title}</p>
                    <p className="text-xs font-light">
                        Modulos {course.modules.length} - Skills 42
                    </p>
                    </div>
                </div>
                </Link>

                {course.modules.length > 0 ? (
                course.modules.map((module: any, index: any) => (
                    <Link href={`/module/${module.id}`} key={index}>
                    <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer">
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
            <div className={styles['ColumnModuleMobileNotch']}>
                <div className={`${styles['ColumnModuleMobileButton']} ${IsOpen ? styles['ColumnModuleMobileButtonActive'] : ''}`} onClick={toogleColumnModule}>
                </div>
            </div>
        </div>
    )
}

export default ColumnModuleMobile;