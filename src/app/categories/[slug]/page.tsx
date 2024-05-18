import { getCoursesDB } from "@/helpers/course.helpers";
import ColumnFilter from "../../components/column-filter";
import CarouselFilter from "../../components/filter-components/carousel-filter";
import { ICourse } from "@/app/types";
import FeaturedCard from "@/app/components/featured/featured-card";
import Card from "@/app/components/card";
import { getCategoriesDB } from "@/helpers/categories.helper";

async function Categories({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const courses: ICourse[] = await getCoursesDB();
  const categoriesList = await getCategoriesDB()
  // const coursesPreLoad:ICourse[] = coursePreLoadFilter;
  const { slug } = params;
  const decodedURL = decodeURIComponent(slug);

  const pairs = decodedURL.split("&");
  let categories: string[] = [];

  pairs.forEach((pair) => {
    const decodedValue = decodeURIComponent(pair.split("=")[1]);
    categories.push(decodedValue);
  });

  const normalizeString = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filteredCourses: ICourse[] = courses.filter((course) =>
    course.categories.some((category) =>
      categories.some(
        (filterCategory) =>
          normalizeString(category.name).toLowerCase() ===
          normalizeString(filterCategory).toLowerCase()
      )
    )
  );

  return (
    <div className="flex mx-[11.5rem] justify-center ">
      <div className="flex flex-grow-0">
        <ColumnFilter />
      </div>
      <div className="ml-10 w-full flex flex-col justify-center items-center">
        <div className="bg-purpleMain mt-8 w-full rounded-xl">
          <h1 className="text-4xl mt-18 text-center text-white mt-10">
            Cursos Disponibles
          </h1>
          <div className=" text-sm mt-8 text-center">
            {" "}
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

        <div className="container flex flex-col gap-[25px] h-auto max-h-screen overflow-hidden">
          {/* <CarouselFilter courses={courses}/> */}
          <div className="pagination flex justify-center items-center m-2" />
        </div>

        <div className=" text-sm my-8"> </div>
        <div className=" mb-8  w-full">
          <div className=" bg-purpleMainLight l p-6">Cursos</div>
            {filteredCourses.length ? 
          <div className="flex flex-wrap gap-10  place-content-around my-5">
            
              {filteredCourses.map((course: ICourse, index: number) => (
              <Card
              key={index}
              title={course.title}
              imgUrl={course.image}
              buttonLabel={`Ver Curso`}
              buttonLink={`/course-review/${course.id}`}
            >
              {course.headline}
            </Card>
            ))}
            </div>
              
            :
            <div className="flex justify-center items-center">
              <h3 className="p-2 mt-10 mb-5 bg-purpleMainLighter">No existen cursos para esta categoria</h3>
            </div>
          }

            
          </div>
          <div className="bg-purpleMainLight w-full mb-2 p-6"></div>
        </div>
      </div>

  );
}

export default Categories;
