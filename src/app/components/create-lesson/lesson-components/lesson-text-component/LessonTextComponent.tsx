
import DraftEditor from "../../create-lesson-text/CreateLessonText"

const LessonTextComponent = () => {
    return (
        <div className=" grid grid-rows-auto mx-10 my-5 border-2 border-red-50 shadow-[0_5px_15px_0px_#00000042] ">
                <div className="text-[20px] bg-purpleMainLighter  p-5" >
                Editor de Texto :
            </div>
                <DraftEditor/>
            <div className="flex flex-row bottom-div self-end text-[20px] bg-purpleMainLighter p-5" >
                <button className=" bg-yellowMain m-auto px-2 py-1 rounded-lg hover:bg-yellowMainLight">Subir</button>
                <button className=" bg-gray-200 m-auto px-2 py-1 rounded-lg hover:bg-gray-400">Cancelar</button>
            </div>


            </div>
    )
};


export default LessonTextComponent;