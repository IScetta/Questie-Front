const ColumnProfile = async () => {
  return (
    <div className="justify-center items-center grid grid-cols-1">
      <div className="h-full w-80 bg-purpleMainLight col-start-2 col-span-4 px-7 ">
        <div className="bg-image rounded-full h-52 w-52 ml-7 mt-6 mb-6"></div>
        <button className="bg-yellowMain text-purpleMain h-10 w-52 ml-7 text-lg">
          edit profile
        </button>
        <div className="text-lg text-center space-y-4 my-5">
          <p>Nombre</p>
          <p>Puntos Totales: 18</p>
          <p>Cursos finalizados: 3</p>
          <p>Cursos pendientes: 2</p>
          <p>Experiencia: 100</p>
        </div>
      </div>
    </div>
  );
};

export default ColumnProfile;
