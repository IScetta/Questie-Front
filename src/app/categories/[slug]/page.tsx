

import { getCoursesDB } from "@/helpers/course.helpers";
import ColumnFilter from "../../components/column-filter";
import CarouselFilter from "../../components/filter-components/carousel-filter";
import { ICourse } from "@/app/types";
import FeaturedCard from "@/app/components/featured/featured-card";


async function Categories({params,}: {params: { slug: string };}): Promise<JSX.Element> {
  const courses = await getCoursesDB()
  const {slug} = params;
  const decodedURL = decodeURIComponent(slug)

  const pairs = decodedURL.split('&')
  let categories:string[] = []

  pairs.forEach(pair => {
    const decodedValue = decodeURIComponent(pair.split('=')[1])
    categories.push(decodedValue)
  });
  
  console.log(categories);

  return (
    <div className="flex mx-[11.5rem] justify-center ">
      <div className="flex flex-grow-0">
        <ColumnFilter />
      </div>
      <div className="ml-10 w-full flex flex-col justify-center items-center">
        <div className="bg-purpleMain mt-8 rounded-xl">
          <h1 className="text-5xl mt-18 text-center text-white mt-10">
            Todos los cursos de
          {categories.map((categorie,index)=>(
          <p key={index}>
             {categorie}
          </p>
          
          
          ))}
          </h1>
          <div className=" text-sm mt-8 text-center">
            {" "}
            <p className="text-white text-center pb-5">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Asperiores, nesciunt fuga inventore deleniti nulla, amet
              distinctio, saepe quisquam quod voluptate nemo. Modi voluptates
              unde, delectus excepturi corporis soluta voluptatem dignissimos.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus
              sunt inventore autem aut porro in harum corporis asperiores eaque
              fuga qui doloremque cum sed, ab alias facere officiis quibusdam
              corrupti?
            </p>
          </div>
        </div>

        <div className="container flex flex-col gap-[25px] h-auto max-h-screen overflow-hidden">
         {/* <CarouselFilter courses={courses}/> */}
          <div className="pagination flex justify-center items-center m-2" />
        </div>

        <div className=" text-sm mt-8"> </div>
        <div className="   mb-8 ">
          <div className=" bg-purpleMainLight p-6">Cursos de {categories[0]}</div>
          <div className="flex flex-wrap gap-10  place-content-around my-5">
            {courses.map((course:ICourse,index:number)=>(
              <div key={index}>
                {true &&
                  <FeaturedCard  course={course}/>
                }
              </div>
              
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
