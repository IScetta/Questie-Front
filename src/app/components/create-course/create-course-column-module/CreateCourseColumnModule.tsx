

import ButtonCreator from "../../create-lesson/button-creator/ButtonCreator";
import CreateModule from "../create-module/CreateModule";

const CreateCourseColumnModule = () => {

  return (
    <div className="flex flex-wrap bg-purpleMainLighter mb-4 mx-8 hover:bg-purpleMainLighter pl-5 pr-5 py-3">
        <ButtonCreator component={<CreateModule />}/>

    </div>
  );
};

export default CreateCourseColumnModule;
