const ColumnCourse: React.FC = (): JSX.Element => {
  return (
    <div className=" justify-center items-center grid grid-cols-1  ">
      <div className="h-full w-80 bg-purpleMainLight col-start-2 col-span-4 pl-10 pr-10">
        <div className="bg-whiteColumn  my-5 py-3 mt-10 flex flex-nowrap">
          <div className=" bg-image w-12 h-12 rounded-full ml-3 "></div>

          <div className="flex flex-wrap">
            <p className="ml-3 ">Name curse</p>

            <p className="text-sm ml-3">unidades skills</p>
          </div>
        </div>
        <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3">
          <p className="text-sm">Unidad 1</p>
          <p>Titulo de unidad</p>
        </div>
        <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3">
          <p className="text-sm">Unidad 1</p>
          <p>Titulo de unidad</p>
        </div>
        <div className="bg-whiteColumn mb-4 hover:bg-purpleMainLighter pl-5 pr-5 py-3">
          <p className="text-sm">Unidad 1</p>
          <p>Titulo de unidad</p>
        </div>
      </div>
    </div>
  );
};

export default ColumnCourse;
