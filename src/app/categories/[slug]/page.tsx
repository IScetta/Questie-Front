import { getCoursesDB } from "@/helpers/course.helpers";
import ColumnFilter from "../../components/column-filter";
import CarouselFilter from "../../components/filter-components/carousel-filter";
import { ICategory, ICourse } from "@/app/types";
import FeaturedCard from "@/app/components/featured/featured-card";
import Card from "@/app/components/card";
import { getCategoriesDB } from "@/helpers/categories.helper";
import ButtonFilter from "@/app/components/button-filter";

async function Categories({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const courses: ICourse[] = await getCoursesDB();
  const categoriesList:ICategory[] = await getCategoriesDB()

  // const coursesPreLoad:ICourse[] = coursePreLoadFilter;
  const { slug } = params;
  const decodedURL = decodeURIComponent(slug);

  const pairs = decodedURL.split("&");
  let categories: string[] = [];

  pairs.forEach((pair) => {
    const decodedValue = decodeURIComponent(pair.split("=")[1]);
    categories.push(decodedValue);
  });
  // console.log(categories)

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
    <div className="flex flex-col md:flex md:flex-row md:mx-[11.5rem] md:justify-center ">
      <div className=" md:flex md:flex-grow-0">
     
        <div className="hidden md:flex">
              <ColumnFilter categories={categoriesList}/>
        </div>
    
      </div>
      <div className="ml-0 md:ml-10 w-full flex flex-col justify-center items-center">
        <div className="bg-purpleMain mt-8 w-full rounded-xl">
          <h1 className="text-4xl mt-18 text-center text-white mt-10">
            Cursos Disponibles
          </h1>
          <div className=" text-xs md:text-sm mt-8 text-center">
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

        <div className=" text-sm mt-8"> </div>
        <div className=" mb-8 rounded-xl bg-blue-gray-50 shadow-[0_5px_15px_0px_#00000042] w-full">
          <div className="block md:hidden">
             <ButtonFilter categories={categoriesList} />
          </div>
       
          <div className="flex flex-wrap items-center rounded-t-xl bg-purpleMainLight p-6 w-full ">Cursos:
          {categories.map((category:string,index:number)=>(
            <h3 key={index} className="text-purpleMainLighter m-1 bg-purpleMain rounded-xl p-2 mx-2">{category}</h3>
          ))}
          
          </div>
          {filteredCourses.length ? (
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
          ) : (
            <div className="flex justify-center items-center">
              <h3 className="p-2 mt-10 mb-5 bg-purpleMainLighter">
                No existen cursos para esta categoria
              </h3>
            </div>
          )} 
          <div className="bg-purpleMainLight w-full rounded-b-xl p-6"></div>
        </div>
       
      </div>
    </div>
  );
}

export default Categories;
