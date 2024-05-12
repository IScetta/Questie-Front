

import ColumnCreateCourse from "../components/create-lesson/Column-create-lesson/ColumnCreateLesson";
import ButtonCreator from "../components/create-lesson/button-creator/ButtonCreator";
import DraftEditor from "../components/create-lesson/create-lesson-text/CreateLessonText";
import LessonTextComponent from "../components/create-lesson/lesson-components/lesson-text-component";

// import CreateLeesonText from "../components/create-lesson/create-lesson-text/CreateLessonText";



const CreateCourse = ()=>{
    return(

        <div className="flex flex-row mx-[11.5rem]">
        <div className="flex flex-grow-0">
            <ColumnCreateCourse/>
        </div >
            
            <ButtonCreator component={<LessonTextComponent/>}/>
            
        </div>
    )
}

export default CreateCourse;