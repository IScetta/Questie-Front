import ColumnModule from "@/app/components/column-module";
import { getModuleById } from "@/helpers/module.helper";
import modulePreLoad from "@/helpers/modulePreLoad.json";
import Link from "next/link";

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

  return (
    <div className="flex mx-[11.5rem] justify-center h-full">
      <div className="flex flex-grow-0">
        <ColumnModule id={slug} />
      </div>
      <div className="ml-10 mt-10 w-full flex flex-col justify-start">
        <h1 className="text-4xl mt-18 font-bold">
          Módulo: {moduleById?.title}
        </h1>
        <div className="w-full bg-blue-gray-50 mt-8 text-start p-8">
          <p className="text-xl font-semibold">Sobre este módulo</p>
          <p className="text-sm mt-2">{moduleById?.description}</p>
        </div>
        <h2 className="text-3xl font-semibold mt-4">Contenido</h2>
        <div className="">
          {lessonInModule &&
            lessonInModule.map((lesson, index) => (
              <div
                key={index}
                className="w-full bg-blue-gray-50 my-4 text-start p-8"
              >
                <Link href="/lesson">
                  <h2 className="text-lg font-semibold cursor-pointer hover:underline">
                    {lesson.title}
                  </h2>
                </Link>
                {Array.isArray(lesson.content) &&
                  lesson.content.map(
                    (content: { title: string }, contentIndex: number) => (
                      <div key={contentIndex}>
                        <p className="text-sm mt-2">{content.title}</p>
                      </div>
                    )
                  )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Module;
