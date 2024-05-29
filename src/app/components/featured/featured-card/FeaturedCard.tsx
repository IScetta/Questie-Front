import Image from "next/image";
import Link from "next/link";

const FeaturedCard = ({ course }: any) => {
  return (
    <Link href={`/course-review/${course.id}`}>
      <div className=" mx-2 w-[350px] h-[350px] ml-20 mr20 lg:w-40 duration-200 transform ease-in-out hover:scale-110 ">
        <div className=" my-11">
          <Image
            className="w-[250] h-[130]"
            src={course.image}
            alt="js"
            width={250}
            height={130}
          />
          <div className="flex flex-col w-full h-[150px] bg-purpleMain text-white">
            <h2 className="mx-2 text-xl">{course.title}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCard;
