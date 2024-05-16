import { getCoursesDB } from "@/helpers/course.helpers";
import Login from "./components/auth/login";
import Carousel from "./components/carousel";
import CategoriesCards from "./components/categories/categories-cards/CategoriesCards";
import FeaturedCarousel from "./components/featured/featured-carousel";
import Slider from "./components/slider";

const Home: React.FC = async () => {
  const courses = await getCoursesDB();

  return (
    <div className="flex flex-col justify-center items-center mx-[11.5rem]">
      <div className="flex place-content-center mr-11 md:flex-row md:justify-center  md:items-center mt-10 md:gap-14">
        <div className="flex items-center justify-center w-[15.5rem] h-[20.5rem]  md:flex md:items-center md:justify-center md:w-[32.5rem] md:h-[40.5rem] bg-blue-gray-50 px-9 py-7">
          <Carousel />
        </div>
        <div className="hidden md:flex">
          <Login />
        </div>
      </div>
      <div className="hidden md:flex md:flex-col md:items-center md:justify-center md:w-full md:h-auto md:mt-16">
        <Slider
          data={courses}
          cardButtonLink="/course-review"
          cardButtonLabel="View Course"
          elementsPerSlide={3}
        />
      </div>
      <div className="hidden md:flex flex-col items-center justify-center w-full h-auto mt-10 mb-10 px-8 py-8 bg-blue-gray-50">
        <div className="w-full mb-6">
          <h1 className="text-black text-start font-medium text-xl">
            Categorías Principales
          </h1>
        </div>
        <CategoriesCards />
      </div>
      <div className="md:hidden xl:hidden grid grid-cols-1 justify-item-center gap-4 my-6  w-[15rem] h-[40rem]">
        <div className="flex w-full">
          <div className="bg-image rounded-full w-10 h-10 mt-5"></div>{" "}
          <button className="">Programacion</button>
        </div>
        <div className="flex w-full">
          <div className="bg-image rounded-full w-10 h-10 mt-5"></div>{" "}
          <button className=" ">Cocina</button>
        </div>
        <div className="flex w-full">
          <div className="bg-image rounded-full w-10 h-10 mt-5"></div>{" "}
          <button className=" ">Musica</button>
        </div>
        <div className="flex w-full">
          <div className="bg-image rounded-full w-10 h-10 mt-5"></div>{" "}
          <button className=" ">Diseño</button>
        </div>
        <div className="flex w-full">
          <div className="bg-image rounded-full w-10 h-10 mt-5"></div>{" "}
          <button className=" ">Fotografia</button>
        </div>
        <div className="flex w-full">
          <div className="bg-image rounded-full w-10 h-10 mt-5"></div>{" "}
          <button className=" ">Diseño web</button>
        </div>
        <div className="flex w-full">
          <div className="bg-image rounded-full w-10 h-10 mt-5"></div>{" "}
          <button className=" ">Desarrollo-web</button>
        </div>

        
      </div>
    </div>
  );
};

export default Home;
