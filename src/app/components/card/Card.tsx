"use client";

import Image from "next/image";
import Link from "next/link";
import Assessment from "../assessments/assessment";

const Card = ({
  title,
  imgUrl,
  style,
  buttonLink,
  buttonLabel,
  children,
  courseId,
}: {
  title: string;
  imgUrl: string;
  style?: { [key: string]: string };
  buttonLink?: string;
  buttonLabel?: string;
  children?: React.ReactNode;
  courseId?: string;
}) => {
  return (
    <div
      className="bg-white flex flex-col select-none border p-4 rounded-lg space-between w-96 h-full space-y-4"
      style={style}
    >
      <div id="card-header" className="flex flex-col h-full space-y-4">
        <Image
          className="w-full h-1/2 object-cover rounded-md"
          src={imgUrl}
          alt={title}
          width={300}
          height={300}
        />
        <h5 className="text-xl font-bold tracking-tight text-gray-900 truncate line-clamp-1 text-pretty">
          {title}
        </h5>
      </div>
      {children && <div className="w-full h-1/2">{children}</div>}
      <div
        id="card-footer"
        className="w-full flex justify-between items-center"
      >
        {/* Condicionamos la renderización del Assessment */}
        {courseId ? <Assessment courseId={courseId} userId={""} /> : <></>}
        {buttonLink && buttonLabel && (
          <Link href={buttonLink}>
            <button className="bg-yellowMain hover:bg-yellowMainLight text-purpleMain px-4 py-2 rounded-lg font-semibold">
              {buttonLabel}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
