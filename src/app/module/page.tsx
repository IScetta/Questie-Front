import ColumnCurso from "../components/columnCurso";

function Module() {
  return (
    <div className="flex  ml-28">
      <div className="flex flex-grow-0">
        <ColumnCurso></ColumnCurso>
      </div>
      
      <div className="ml-10">
        <button className="bg-yellowMain rounded-full w-12 h-12 ml-60 mt-8 hover:w-18 h-18">
        ⬆
        </button>
        <h1 className="text-5xl mt-18 mr-10 ">Titulo del modulo</h1>
        <div className=" text-sm max-w-prose mt-9"> <p className="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores, nesciunt fuga inventore deleniti nulla, amet distinctio, saepe quisquam quod voluptate nemo. Modi voluptates unde, delectus excepturi corporis soluta voluptatem dignissimos. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus sunt inventore autem aut porro in harum corporis asperiores eaque fuga qui doloremque cum sed, ab alias facere officiis quibusdam corrupti?</p></div>
        <div className=" text-sm max-w-prose mt-9"> <p className="">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus sunt inventore autem aut porro in harum corporis asperiores eaque fuga qui doloremque cum sed, ab alias facere officiis quibusdam corrupti? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi nesciunt aut, labore at alias laudantium quod praesentium officiis iure sapiente cupiditate consequatur architecto et ex, eius obcaecati est suscipit iste!</p></div>
        <div className="bg-image text-sm max-w-prose mt-9 w-11/12 h-80"></div>
        <h3 className="text-5xl mt-16 mr-10 ">Titulo del modulo</h3>
        <div className=" text-sm max-w-prose mt-9"> <p className="">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus sunt inventore autem aut porro in harum corporis asperiores eaque fuga qui doloremque cum sed, ab alias facere officiis quibusdam corrupti?</p></div>
        <div className="flex flex-row gap-10 mt-10">
          <div className="bg-image w-60 h-60"></div>
          <div className="bg-image w-60 h-60"></div>
          
        </div>
        <h3 className="text-5xl mt-16 mr-10 ">Titulo del modulo</h3>
        <div className=" text-sm max-w-prose mt-9"> <p className="">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus sunt inventore autem aut porro in harum corporis asperiores eaque fuga qui doloremque cum sed, ab alias facere officiis quibusdam corrupti?</p></div>
        <div className="bg-image text-sm max-w-prose mt-9 w-11/12 h-80"></div>
        <button className="bg-yellowMain  text-lg w-25 h-15 ml-48 mt-8 mb-8 pl-4 pr-4">
          Siguiente modulo
        </button>

  
     </div>
    </div>
  );
}

export default Module;
