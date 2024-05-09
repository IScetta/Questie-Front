

import FeaturedCarousel from "../components/featured/featured-carousel"
import HeaderCurse from "../components/curse/header-curse"
import ColumnCurso from "../components/columnCurso";


const CurseReview = ()=>{
return(
    <div className="flex flex-row  mx-[11.5rem] border-2 border-red-700 ">
      <div className="flex  w-[200px]">
        <ColumnCurso/>
      </div>
      <div className="pt-4 ">
        <HeaderCurse/>
        <div className=" w-full h-[1200px] bg-gray-500"></div>
        
        {/* <FeaturedCarousel/> */}
      </div>
    </div>
)
}

export default CurseReview