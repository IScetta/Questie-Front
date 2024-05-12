import ColumnModule from "@/app/components/column-module";
import { getModuleById } from "@/helpers/module.helper";
import modulePreLoad from "@/helpers/modulePreLoad.json";

const Module = async ({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> => {
  const { slug } = params;
  // const modules = await getModuleById(slug);
  //   console.log(modules);
  const modules = modulePreLoad;
  const moduleById = modules.find((module) => module.id.toString() === slug);
  const lessonInModule = moduleById?.lessons.map((lesson) => lesson);

  console.log(moduleById);

  return (
    <div className="flex mx-[11.5rem] justify-center h-full">
      <div className="flex flex-grow-0">
        <ColumnModule />
      </div>
      <div className="ml-10 mt-10 w-full flex flex-col justify-start">
        {/* <button className="bg-yellowMain rounded-full w-12 h-12 mt-8 mb-6 hover:w-18 h-18 flex justify-center items-center sticky top-6">
          <GoArrowUp className="w-8 h-8" />
        </button> */}
        <h1 className="text-4xl mt-18 font-bold">
          Módulo: {moduleById?.title}
        </h1>
        <div className="w-full bg-blue-gray-50 mt-8 text-start p-8">
          <p className="text-xl font-semibold">Sobre este módulo</p>
          <p className="text-sm mt-2">{moduleById?.description}</p>
        </div>
        <div className="w-full bg-blue-gray-50 mt-6 text-start p-8">
          <h2 className="text-3xl font-semibold">Contenido</h2>
          {lessonInModule &&
            lessonInModule.map((lesson, index) => (
              <div key={index} className="mt-4">
                <h2 className="text-lg font-semibold cursor-pointer hover:underline">
                  {lesson.title}
                </h2>
                <p>{lesson.content}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Module;
