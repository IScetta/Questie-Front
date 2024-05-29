import { ICategory, ICourse } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { getCategoriesDB } from "@/helpers/categories.helper";
import { putCategoriesCourseDB } from "@/helpers/createCourse.helper";
import { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const EditCategoriesForm = ({ course }: { course: ICourse }): JSX.Element => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [checkboxStates, setCheckboxStates] = useState<boolean[]>([]);
  const [categorySelect, setCaregorySelect] = useState<ICategory[]>([]);
  const [open, setOpen] = useState(false);
  const {token} = useAuth()

  useEffect(() => {
    const getCategories = async () => {
      const categories: ICategory[] = await getCategoriesDB();
      setCategories(categories);
      setCheckboxStates(Array(categories.length).fill(false));
    };
    getCategories();
  }, []);

  const handleCheckboxChangeCategories =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newCheckboxStates = [...checkboxStates];
      newCheckboxStates[index] = event.target.checked;
      setCheckboxStates(newCheckboxStates);
    };

  const getCheckedNames = () => {
    const checkedCategories = categories.filter(
      (_, index) => checkboxStates[index]
    );
    setOpen(false);
    setCaregorySelect(checkedCategories);
  };

  const putCategories = async ()=>{
    try {
        const categoriesNew:ICategory[] = categorySelect;
        const response = await putCategoriesCourseDB(categoriesNew , course.id , token!)
        if (!response) throw new Error("Error al intentar crear modulo");
    } catch (error) {
        console.error("Error Update course:", error) 
    }
  }

  return (
    <div>
      <div className="flex flex-row justify-around">
        <div>
          <button
            onClick={() => setOpen(!open)}
            className="flex justify-center items-center  bg-purpleMainLighter rounded-md text-purpleMain p-2 h-10 w-fit m-2 text-lg"
          >
            Categorias{" "}
            {open ? (
              <FaCaretUp className="text-purpleMain w-4 h-auto cursor-pointer" />
            ) : (
              <FaCaretDown className="text-purpleMain w-4 h-auto cursor-pointer" />
            )}
          </button>
          {open && (
            <div className="bg-white absolute  w-auto h-auto rounded-md bg-text border-2 border-terciary ring-1 ring-white ring-opacity-5 focus:outline-none z-10 shadow-[0_5px_15px_0px_#00000042] px-2">
              <div className="h-fit w-fit bg-white col-start-2 col-span-4 ">
                <h2 className="my-2 p-2 border-b-2 border-black text-[16px] font-semibold text-gray-900 dark:text-white">
                  Categorias:
                </h2>
                {categories.map((category: ICategory, index: number) => (
                  <div
                    key={category.id}
                    className="m-2 p-2 hover:bg-blue-gray-50"
                  >
                    <label>
                      <input
                        className="m-2"
                        type="checkbox"
                        checked={checkboxStates[index]}
                        onChange={handleCheckboxChangeCategories(index)}
                      />
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          onClick={getCheckedNames}
          className="p-2 m-2 rounded-sm hover:bg-yellowMainLight bg-yellowMain"
        >
          Seleccionar
        </button>
      </div>
      <div className="border-2 m-2 border-gray-500"></div>
      <div>
        <h2 className="p-2 mt-2 text-[20px] ">Categorias seleccionadas:</h2>
      </div>
      {categorySelect.length ? (
        <div>
          {categorySelect.map((category: ICategory, index: number) => (
            <h3
              key={index}
              className="flex flex-row p-2 m-2 w-fit h-auto text-[18px] text-purpleMainLighter bg-purpleMain rounded-2xl"
            >
              {category.name}
            </h3>
          ))}
        </div>
      ) : (
        <h3 className=" flex justify-center p-2 my-2 bg-gray-100">No hay categorias seleccionadas </h3>
      )}
      <div className="border-2 m-2 border-blue-gray-500"></div>
      {course.categories.length ? 
        <div>
          <h2 className="p-2 mt-2 text-[20px] ">
            Este curso posee las categorias:
          </h2>
          {course.categories.map((category,index)=>(
            <h3
            key={index}
            className="flex flex-row p-2 m-2 w-fit h-auto text-[18px] text-purpleMainLighter bg-purpleMain rounded-2xl"
          >
            {category.name}
          </h3>
          ))} 
          <div className="border-2 m-2 border-blue-gray-500"></div>
        </div>
        :
        <></>
     }
     {categorySelect.length ?
     <div onClick={putCategories} className="flex justify-center items-center">
            <button className="p-2 m-2 border-2 text-[21px] border-purpleMain rounded-sm hover:bg-yellowMainLight bg-yellowMain">Guardar Categorias</button>
        </div>
        :
        <div className="flex justify-center items-center">
            <button disabled className="p-2 m-2 border-2 text-[21px] border-purpleMain rounded-sm  bg-purpleMainLighter">Guardar Categorias</button>
        </div>
     }
        

    </div>

  );
};

export default EditCategoriesForm;
