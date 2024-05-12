import Link from "next/link";

const ColumnModule: React.FC = (): JSX.Element => {
  return (
    <div className=" justify-center items-center grid grid-cols-1  ">
      <div className="h-full w-80 bg-purpleMainLight col-start-2 col-span-4 px-7">
        <div className="bg-whiteColumn my-5 py-3 mt-10 flex flex-nowrap w-full h-[4.5rem] content-center">
          <div className=" bg-image w-12 h-12 rounded-full ml-3 "></div>
          <div className="flex flex-col ml-3 justify-center">
            <p className="font-bold text-base">Nombre del Curso</p>
            <p className="text-xs font-light">Modulos 8 - Skills 42</p>
          </div>
        </div>

        {/* <Link href="/module/1"> */}
        <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer">
          <p className="text-xs font-light">Módulo 1</p>
          <p className="text-base font-semibold">Título del Módulo</p>
        </div>
        {/* </Link> */}

        {/* <Link href="/module/2"> */}
        <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer">
          <p className="text-xs font-light">Módulo 2</p>
          <p className="text-base font-semibold">Título del Módulo</p>
        </div>
        {/* </Link> */}

        {/* <Link href="/module/3"> */}
        <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer">
          <p className="text-xs font-light">Módulo 3</p>
          <p className="text-base font-semibold">Título del Módulo</p>
        </div>
        {/* </Link> */}

        {/* <Link href="/module/4"> */}
        <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer">
          <p className="text-xs font-light">Módulo 4</p>
          <p className="text-base font-semibold">Título del Módulo</p>
        </div>
        {/* </Link> */}

        {/* <Link href="/module/5"> */}
        <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer">
          <p className="text-xs font-light">Módulo 5</p>
          <p className="text-base font-semibold">Título del Módulo</p>
        </div>
        {/* </Link> */}

        {/* <Link href="/module/6"> */}
        <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer">
          <p className="text-xs font-light">Módulo 6</p>
          <p className="text-base font-semibold">Título del Módulo</p>
        </div>
        {/* </Link> */}

        {/* <Link href="/module/7"> */}
        <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer">
          <p className="text-xs font-light">Módulo 7</p>
          <p className="text-base font-semibold">Título del Módulo</p>
        </div>
        {/* </Link> */}

        {/* <Link href="/module/8"> */}
        <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer">
          <p className="text-xs font-light">Módulo 8</p>
          <p className="text-base font-semibold">Título del Módulo</p>
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default ColumnModule;
