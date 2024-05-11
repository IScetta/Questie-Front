import Image from "next/image";

const FeaturedCard = () => {
  return (
    <div className=" mx-2 w-[250px] h-[250px] ml-20 mr20 lg:w-40  ">
      <div className=" my-11">
<Image
        src="https://19604448.fs1.hubspotusercontent-na1.net/hubfs/19604448/JavaScript%20un%20lenguaje%20de%20programaci%C3%B3n.jpg"
        alt="js"
        width={250}
        height={130}
      />
      <div className="flex flex-col w-full h-[120px] bg-purpleMain text-white">
        <h2 className="mx-2 text-xl">
          JavaScript Avansado - sasas assdasddssds
        </h2>
        <h4 className="bg-yellowMain text-purpleMain inline-flex items-baseline text-start px-2">
          Programacion
        </h4>
      </div>

      </div>
      
    </div>
  );
};

export default FeaturedCard;
