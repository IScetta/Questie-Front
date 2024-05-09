import { ICategory } from "@/app/types";
import Image from "next/image";

const CategoryCard = ({ name, image }: ICategory) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-purpleMainLighter w-56 h-[12.5rem]">
        <Image
          src={image}
          alt={name}
          width={1000}
          height={1000}
          className="w-full h-full"
        />
      </div>
      <div className="bg-purpleMain w-full h-6 flex items-end px-1 content-center">
        <h1 className="text-yellowMain text-base font-medium">{name}</h1>
      </div>
    </div>
  );
};

export default CategoryCard;
