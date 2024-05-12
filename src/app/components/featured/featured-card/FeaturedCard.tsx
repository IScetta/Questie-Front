import { DatoNuevoCurso } from "@/helpers/categoriesPreLoad";
import Image from "next/image";
import Link from "next/link";



const FeaturedCard = ({idCourse}:any) => {
  const curso = DatoNuevoCurso[idCourse];
  return (
    <Link href={`/course-review/${curso.id}`}>
      <div className=" mx-2 w-[250px] h-[250px] ml-20 mr20 lg:w-40 duration-200 transform ease-in-out hover:scale-110 ">
        <div className=" my-11">
          <Image
            src={curso.infoGenral.imageCurse}
            alt="js"
            width={250}
            height={130}
          />
          <div className="flex flex-col w-full h-[120px] bg-purpleMain text-white">
            <h2 className="mx-2 text-xl">{curso.infoGenral.title}</h2>
            <h4 className="bg-yellowMain text-purpleMain inline-flex items-baseline text-start px-2">
              {curso.infoGenral.categories}
            </h4>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCard;
