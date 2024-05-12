const ColumnLesson: React.FC = (): JSX.Element => {
  return (
    <div className=" justify-center items-center grid grid-cols-1  ">
      <div className="h-full w-80 bg-purpleMainLight col-start-2 col-span-4 px-7">
        <div className="bg-whiteColumn my-5 py-3 mt-10 flex flex-nowrap w-full h-[4.5rem] content-center">
          <div className=" bg-image w-12 h-12 rounded-full ml-3 "></div>
          <div className="flex flex-col ml-3 justify-center">
            <p className="font-bold text-base">Nombre de la Lección</p>
            <p className="text-xs font-light">Lecciones 5 - Skills 42</p>
          </div>
        </div>

        {/* <Link href="/module/1"> */}
        <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer">
          <p className="text-xs font-light">Lección 1</p>
          <p className="text-base font-semibold">Título de la Lección</p>
        </div>
        {/* </Link> */}

        {/* <Link href="/module/2"> */}
        <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer">
          <p className="text-xs font-light">Lección 2</p>
          <p className="text-base font-semibold">Título de la Lección</p>
        </div>
        {/* </Link> */}

        {/* <Link href="/module/3"> */}
        <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer">
          <p className="text-xs font-light">Lección 3</p>
          <p className="text-base font-semibold">Título de la Lección</p>
        </div>
        {/* </Link> */}

        {/* <Link href="/module/4"> */}
        <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer">
          <p className="text-xs font-light">Lección 4</p>
          <p className="text-base font-semibold">Título de la Lección</p>
        </div>
        {/* </Link> */}

        {/* <Link href="/module/5"> */}
        <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3 w-full h-[4.5rem] content-center cursor-pointer">
          <p className="text-xs font-light">Lección 5</p>
          <p className="text-base font-semibold">Título de la Lección</p>
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default ColumnLesson;
