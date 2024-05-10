import ColumnCurso from "../components/columnCurso";
import { GoArrowUp } from "react-icons/go";

function Module() {
  return (
    <div className="flex mx-[11.5rem] justify-center">
      <div className="flex flex-grow-0">
        <ColumnCurso></ColumnCurso>
      </div>

      <div className="ml-10 w-full flex flex-col justify-center items-center">
        <button className="bg-yellowMain rounded-full w-12 h-12 mt-8 mb-6 hover:w-18 h-18 flex justify-center items-center sticky top-6">
          <GoArrowUp className="w-8 h-8" />
        </button>
        <h1 className="text-5xl mt-18 ">Titulo del modulo</h1>
        <div className=" text-sm mt-8">
          {" "}
          <p className="">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Asperiores, nesciunt fuga inventore deleniti nulla, amet distinctio,
            saepe quisquam quod voluptate nemo. Modi voluptates unde, delectus
            excepturi corporis soluta voluptatem dignissimos. Lorem, ipsum dolor
            sit amet consectetur adipisicing elit. Minus sunt inventore autem
            aut porro in harum corporis asperiores eaque fuga qui doloremque cum
            sed, ab alias facere officiis quibusdam corrupti?
          </p>
        </div>
        <div className=" text-sm mt-8">
          {" "}
          <p className="">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus sunt
            inventore autem aut porro in harum corporis asperiores eaque fuga
            qui doloremque cum sed, ab alias facere officiis quibusdam corrupti?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi
            nesciunt aut, labore at alias laudantium quod praesentium officiis
            iure sapiente cupiditate consequatur architecto et ex, eius
            obcaecati est suscipit iste!
          </p>
        </div>
        <div className="bg-image text-sm mt-9 w-11/12 h-80"></div>
        <h3 className="text-5xl mt-8 mb-4">Titulo del modulo</h3>
        <div className=" text-sm mt-8">
          {" "}
          <p className="">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus sunt
            inventore autem aut porro in harum corporis asperiores eaque fuga
            qui doloremque cum sed, ab alias facere officiis quibusdam corrupti?
          </p>
        </div>
        <div className="flex flex-row gap-10 mt-10">
          <div className="bg-image w-60 h-60"></div>
          <div className="bg-image w-60 h-60"></div>
        </div>
        <h3 className="text-5xl mt-8 mb-4">Titulo del modulo</h3>
        <div className="text-sm mt-8">
          {" "}
          <p className="">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus sunt
            inventore autem aut porro in harum corporis asperiores eaque fuga
            qui doloremque cum sed, ab alias facere officiis quibusdam corrupti?
          </p>
        </div>
        <div className="bg-image text-sm max-w-prose mt-9 w-11/12 h-80"></div>
        <button className="bg-yellowMain  text-lg w-25 h-15 mt-8 mb-8 pl-4 pr-4">
          Siguiente modulo
        </button>
      </div>
    </div>
  );
}

export default Module;
