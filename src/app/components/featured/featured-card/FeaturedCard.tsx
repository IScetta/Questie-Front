import Image from "next/image";


const FeaturedCard = ()=>{
    return(
        <div className=" mx-2 w-[250px] h-[250px] ">
            <Image src="https://19604448.fs1.hubspotusercontent-na1.net/hubfs/19604448/JavaScript%20un%20lenguaje%20de%20programaci%C3%B3n.jpg" alt="js" width={250} height={130} />
            <div className=" flex flex-col w-full h-[120px] bg-purpleMain text-white">
                <h2 className="ml-2 text-xl">JavaScript Avansado - sasas assdasddssds</h2>
                <p className="ml-2 text-2 ">Nombre creador</p>
                <h4 className="m-2 bg-yellowMain text-purpleMain inline-flex items-baseline ">Programacion</h4>
            </div>
        </div>

    )
}

export default FeaturedCard;