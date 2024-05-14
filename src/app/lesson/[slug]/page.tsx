import { GoArrowUp } from "react-icons/go";
import ColumnLesson from "../../components/column-lesson";
import { getLessonById } from "@/helpers/lesson.helper";
import { getModuleById } from "@/helpers/module.helper";

const Lesson = async ({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> => {
  const { slug } = params;

  //const lessonInModule = moduleById?.lessons.map((lesson) => lesson);
  // const course = moduleById?.course.id;
  const lessonId = await getLessonById(slug);
  console.log(slug);
  const escalon = lessonId.module.id;
  return (
    <div className="flex mx-[11.5rem] justify-center">
      <ColumnLesson moduleid={escalon} />
      <button className="bg-yellowMain rounded-full w-12 h-12 mt-8 mb-6 hover:w-18 h-18 flex justify-center items-center sticky top-6">
        <GoArrowUp className="w-8 h-8" />
      </button>
   

      <h1 className="text-5xl mt-18 ">{lessonId.title}</h1>
      

      {/* <div>
      lessonId.content.map((conten, index) =>(
        <div key{}>{content}</div>
      ))
      </div> */}

<button className="bg-yellowMain  text-lg w-25 h-15 mt-8 mb-8 pl-4 pr-4">
          Siguiente Lección
        </button>

    </div>
  );
};

export default Lesson;
