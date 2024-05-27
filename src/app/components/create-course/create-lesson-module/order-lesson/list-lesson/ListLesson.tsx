import { ICreateLessonModule } from "@/app/types"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GiHamburgerMenu } from "react-icons/gi";

const ListLesson =({lesson}:{lesson:ICreateLessonModule})=>{
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    }= useSortable({
        id: lesson.id
    })

    const style ={
        transform: CSS.Transform.toString(transform),
        transition
    }

    return(
        <div 
        style={style}
        ref={setNodeRef}
        {... attributes}
        {... listeners}
        className=" bg-purpleMainLighter m-2  rounded-lg w-full">
            <h4 className="flex flex-row items-center p-2 mr-4 text-[18px] bg-purpleMainLight border-2 border-purpleMainLighter rounded-lg">
            <GiHamburgerMenu className="m-2"/>  {lesson.title}
              </h4>
        </div>
    )
}

export default ListLesson