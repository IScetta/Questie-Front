import { getCoursesDB } from "@/helpers/course.helpers";
import ColumnFilter from "../components/column-filter";
import Slider from "../components/slider/Slider";
import { ICategory, ICourse } from "../types";
import Card from "../components/card";
import { getCategoriesDB } from "@/helpers/categories.helper";

async function Categories() {
  const courses = await getCoursesDB();
  const categoriesList: ICategory[] = await getCategoriesDB();

  return (
    <div className="flex mx-[11.5rem] justify-center ">
      <div className="flex flex-grow-0">
        <ColumnFilter categories={categoriesList} />
      </div>
      <div className="ml-10  w-full flex flex-col justify-around items-center space-y-5">
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

        <div className="text-sm my-8"></div>
        <div className="mb-4 rounded-xl bg-blue-gray-50 shadow-[0_5px_15px_0px_#00000042] w-full ">
          <div className="rounded-t-xl bg-purpleMainLight p-6 text-[22px]">
            Cursos
          </div>
          <div className="flex flex-wrap gap-10  place-content-around my-5">
            {courses.map((course: ICourse, index: number) => (
              <Card
                key={index}
                title={course.title}
                imgUrl={course.image}
                buttonLabel={`Ver Curso`}
                buttonLink={`/course-review/${course.id}`}
              />
            ))}
          </div>
          <div className="bg-purpleMainLight w-full rounded-b-xl mb-0 h-20"></div>
        </div>
        <div className="text-sm my-8"></div>
      </div>
    </div>
  );
}

export default Categories;
