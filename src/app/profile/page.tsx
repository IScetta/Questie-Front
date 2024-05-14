import ColumnProfile from "../components/column-profile";

const profile = () => {
    return (
        <div className="flex mx-[11.5rem] justify-center h-full">
            <div>
                <ColumnProfile />
            </div>
            <div className="ml-10 mt-10 w-full flex flex-col justify-start h-full">
        <h1 className="text-4xl mt-18 font-bold">
          Continuar con los cursos
        </h1>
        <div className="w-full bg-blue-gray-50 mt-8 text-start p-8">
          <p className="text-xl font-semibold">algo</p>
          <p className="text-sm mt-2"></p>
        </div>
        <div className="w-full bg-blue-gray-50 mt-8 text-start p-8">
          <p className="text-xl font-semibold">algo</p>
          <p className="text-sm mt-2"></p>
        </div>
        <div className="w-full bg-blue-gray-50 mt-8 text-start p-8">
          <p className="text-xl font-semibold">algo</p>
          <p className="text-sm mt-2"></p>
        </div>
        
        
      </div>
            
        </div>
    )
  };
  
  export default profile;