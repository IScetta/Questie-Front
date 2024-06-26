import { getCoursesDB } from "@/helpers/course.helpers";
import Carousel from "./components/carousel";
import CategoriesCards from "./components/categories/categories-cards/CategoriesCards";
import Slider from "./components/slider";
import LandingLogin from "./components/landing-login";

const Home: React.FC = async (): Promise<JSX.Element> => {
  const courses = await getCoursesDB();

  return (
    <div className="flex flex-col justify-center items-center mx-[2rem] md:mx-[5rem] lg:mx-[11.5rem]">
      <div className="flex place-content-center md:flex-row md:justify-center md:items-center mt-10 md:gap-14">
        <div className="flex items-center justify-center w-[17rem] sm:w-[20rem] h-[22rem] sm:h-[25rem]  md:flex md:items-center md:justify-center md:w-[52rem] md:h-[40.5rem] bg-blue-gray-50 p-2 rounded-lg">
          <Carousel />
        </div>
        <div className="hidden md:hidden lg:flex">
          <LandingLogin />
        </div>
      </div>

      <div className="bg-blue-gray-50 w-full h-auto md:hidden lg:hidden mt-10">
        <div className="w-full">
          <h1 className="text-black text-start font-semibold text-xl">
            Cursos Mas Visitados
          </h1>
        </div>
        <Slider
          data={courses}
          cardButtonLink="/course-review"
          cardButtonLabel="Ver Curso"
          elementsPerSlide={1}
        />
      </div>

      <div className="bg-blue-gray-50 hidden md:flex md:flex-col md:items-center md:justify-center md:w-full md:h-auto md:mt-10 lg:hidden">
        <div className="w-full">
          <h1 className="text-black text-start font-semibold text-xl">
            Cursos Mas Visitados
          </h1>
        </div>
        <Slider
          data={courses}
          cardButtonLink="/course-review"
          cardButtonLabel="Ver Curso"
          elementsPerSlide={2}
        />
      </div>

      <div className="bg-blue-gray-50 hidden lg:flex lg:flex-col lg:items-center lg:justify-center lg:w-full lg:h-auto lg:mt-20 lg:px-8 lg:py-8">
        <div className="w-full">
          <h1 className="text-black text-start font-semibold text-xl">
            Cursos Mas Visitados
          </h1>
        </div>
        <Slider
          data={courses}
          cardButtonLink="/course-review"
          cardButtonLabel="Ver Curso"
          elementsPerSlide={3}
        />
      </div>

      <div className="hidden md:flex flex-col items-center justify-center w-full h-auto my-20 px-8 py-8 bg-blue-gray-50">
        <div className="w-full mb-6">
          <h1 className="text-black text-start font-semibold text-xl">
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
