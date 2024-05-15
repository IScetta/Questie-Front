import { getCoursesDB } from "@/helpers/course.helpers";
import ColumnFilter from "../components/column-filter";
import CarouselFilter from "../components/filter-components/carousel-filter";
import Slider from "../components/slider/Slider";
import { ICourse } from "../types";
import FeaturedCard from "../components/featured/featured-card";
        
async function Categories() {
  const courses = await getCoursesDB();

  return (
    <div className="flex mx-[11.5rem] justify-center ">
      <div className="flex flex-grow-0">
        <ColumnFilter />
      </div>
      <div className="ml-10 w-full flex flex-col justify-around items-center space-y-5">
        <div className="bg-purpleMain mt-8  ">
          <h1 className="text-5xl mt-18 text-center text-white mt-10">
          Todos los cursos
          </h1>
          <div className=" text-sm mt-8 text-center">
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

        <Slider
          data={courses}
          cardButtonLink="/course-review"
          cardButtonLabel="View Course"
          elementsPerSlide={3}
        />


        <div className=" text-sm mt-8"> </div>
        <div className="   mb-8 ">
          <div className=" bg-purpleMainLight p-6 text-[22px]">Cursos</div>
          <div className="flex flex-wrap gap-10  place-content-around my-5">
            {courses.map((course:ICourse,index:number)=>(
                <FeaturedCard key={index} course={course}/>
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
