import { getCoursesDB } from "@/helpers/course.helpers";
import Login from "./components/auth/login";
import Carousel from "./components/carousel";
import CategoriesCards from "./components/categories/categories-cards/CategoriesCards";
import FeaturedCarousel from "./components/featured/featured-carousel";

 const Home: React.FC = async ()=> {
  const courses = await getCoursesDB();

  return (
    <div className="flex flex-col justify-center items-center mx-[11.5rem]">
      <div className="flex flex-row justify-center items-center mt-10 gap-14">
        <div className="flex items-center justify-center w-[32.5rem] h-[40.5rem] bg-blue-gray-50 px-9 py-7">
          <Carousel />
        </div>
        <Login />
      </div>
      <div className="flex flex-col items-center justify-center w-full h-auto mt-16">
        <FeaturedCarousel courses={courses}/>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-auto mt-10 mb-10 px-8 py-8 bg-blue-gray-50">
        <div className="w-full mb-6">
          <h1 className="text-black text-start font-medium text-xl">
            Categorías Principales
          </h1>
        </div>
        <CategoriesCards />
      </div>
    </div>
  );
};

export default Home;
