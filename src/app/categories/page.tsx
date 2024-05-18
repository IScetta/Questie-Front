import { getCoursesDB } from "@/helpers/course.helpers";
import ColumnFilter from "../components/column-filter";
import CarouselFilter from "../components/filter-components/carousel-filter";
import Slider from "../components/slider/Slider";
import { ICategory, ICourse } from "../types";
import FeaturedCard from "../components/featured/featured-card";
import Card from "../components/card";
import { getCategoriesDB } from "@/helpers/categories.helper";

async function Categories() {
  const courses = await getCoursesDB();
  const categoriesList:ICategory[] = await getCategoriesDB()

  return (
    <div className="flex mx-[11.5rem] justify-center ">
      <div className="flex flex-grow-0">
        <ColumnFilter categories={categoriesList}/>
      </div>
      <div className="ml-10 w-full flex flex-col justify-around items-center space-y-5">
        <div className="bg-purpleMain mt-8 rounded-xl ">
          <h1 className="text-4xl mt-18 text-center text-white mt-10">
            Todos los cursos
          </h1>
          <div className=" text-sm mt-8 text-center">
            <p className="text-white text-center pb-5">
              Questie es una página que posee muchos cursos de todo tipo. Ofrece
              una amplia variedad de contenidos educativos que abarcan desde la
              programación y el desarrollo de software hasta las artes
              culinarias y la música. Con una plataforma fácil de usar y
              accesible desde cualquier dispositivo, Questie se convierte en una
              excelente opción para quienes buscan mejorar sus habilidades y
              conocimientos de manera flexible y efectiva.
            </p>
          </div>
        </div>

        <Slider
          data={courses}
          cardButtonLink="/course-review"
          cardButtonLabel="Ver Curso"
          elementsPerSlide={3}
        />

        <div className=" text-sm mt-8"> </div>
        <div className="   mb-8 ">
          <div className=" bg-purpleMainLight p-6 text-[22px]">Cursos</div>
          <div className="flex flex-wrap gap-10  place-content-around my-5">
            {courses.map((course: ICourse, index: number) => (
              <Card
                key={index}
                title={course.title}
                imgUrl={course.image}
                // body={course.headline}
                buttonLabel={`Ver Curso`}
                buttonLink={`/course-review/${course.id}`}
              />
            ))}
          </div>
          <div className="bg-purpleMainLight p-6"></div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Categories;
