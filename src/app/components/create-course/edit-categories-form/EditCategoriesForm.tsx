import { ICategory, ICategoryCourse, ICourse } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { getCategoriesDB,  } from "@/helpers/categories.helper";
import { deleteCategoryCourseDB, putCategoriesCourseDB } from "@/helpers/createCourse.helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

const EditCategoriesForm = ({ course }: { course: ICourse }): JSX.Element => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [checkboxStates, setCheckboxStates] = useState<boolean[]>([]);
  const [categorySelect, setCategorySelect] = useState<ICategory[]>([]);
  const [categoryInitial, setCategoryInitial] = useState<ICategoryCourse[]>(course.categories);
  const [categoryToDelete, setCategoryToDelete] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false);
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      const categories: ICategory[] = await getCategoriesDB();
      setCategories(categories);
      setCheckboxStates(Array(categories.length).fill(false));
    };
    getCategories();
  }, []);

  const handleCheckboxChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = event.target.checked;
    setCheckboxStates(newCheckboxStates);
  };

  const getCheckedNames = () => {
    const checkedCategories = categories.filter((_, index) => checkboxStates[index]);
    setOpen(false);
    setCategorySelect(checkedCategories);
  };

  const saveCategories = async () => {
    try {
      const newCategoryIds = categorySelect.map(category => category.id!);
      console.log('Categorías nuevas:', newCategoryIds);
      console.log('Categorías a eliminar:', Array.from(categoryToDelete));
      if(Array.from(categoryToDelete).length){
        Array.from(categoryToDelete).forEach((category_id)=>{
          deleteCategoryCourse(category_id, course.id, token!);
        })
      }

      const response = await putCategoriesCourseDB(newCategoryIds, course.id, token!);
      router.push(`/admin/create-module/${course.id}`);
    } catch (error) {
      console.error("Error al actualizar las categorías del curso:", error);
    }
  };

  const deleteCategoryCourse = async (category_id:string, course_id:string, token:string)=>{
    try {
      const res = await deleteCategoryCourseDB(category_id, course_id, token!);
    } catch (error) {
      console.error("Error al actualizar las categorías del curso:", error);
    }
  }

  const toggleCategoryToDelete = (categoryId: string) => {
    setCategoryToDelete(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  return (
    <div>
      <div className="flex flex-row justify-around">
        <div>
          <button
            onClick={() => setOpen(!open)}
            className="flex justify-center items-center bg-purpleMainLighter rounded-md text-purpleMain p-2 h-10 w-fit m-2 text-lg"
          >
            Categorías{" "}
            {open ? (
              <FaCaretUp className="text-purpleMain w-4 h-auto cursor-pointer" />
            ) : (
              <FaCaretDown className="text-purpleMain w-4 h-auto cursor-pointer" />
            )}
          </button>
          {open && (
            <div className="bg-white absolute w-auto h-auto rounded-md bg-text border-2 border-terciary ring-1 ring-white ring-opacity-5 focus:outline-none z-10 shadow-[0_5px_15px_0px_#00000042] px-2">
              <div className="h-fit w-fit bg-white col-start-2 col-span-4">
                <h2 className="my-2 p-2 border-b-2 border-black text-[16px] font-semibold text-gray-900 dark:text-white">
                  Categorías:
                </h2>
                {categories.map((category, index) => (
                  <div key={category.id} className="m-2 p-2 hover:bg-blue-gray-50">
                    <label>
                      <input
                        className="m-2"
                        type="checkbox"
                        checked={checkboxStates[index]}
                        onChange={handleCheckboxChange(index)}
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
        <h2 className="p-2 mt-2 text-[20px]">Categorías seleccionadas:</h2>
      </div>
      {categorySelect.length ? (
        <div className="flex flex-wrap">
          {categorySelect.map((category, index) => (
            <h3
              key={index}
              className=" p-2 m-2 w-fit h-auto text-[18px] text-white bg-purpleMain rounded-2xl"
            >
              {category.name}
            </h3>
          ))}
        </div>
      ) : (
        <h3 className="flex justify-center p-2 my-2 bg-gray-100">
          No hay categorías seleccionadas{" "}
        </h3>
      )}
      <div className="border-2 m-2 border-blue-gray-500"></div>
      {categoryInitial.length ? (
        <div>
          <h2 className="p-2 mt-2 text-[20px]">Este curso posee las categorías:</h2>
          <div className="flex flex-wrap">
            {categoryInitial.map((category, index) => (
              <div key={index} className="">
                  <button
                    onClick={() => toggleCategoryToDelete(category.id!)}
                    className={`flex flex-row items-center p-2 m-2 w-fit h-auto text-[18px] text-white ${
                      categoryToDelete.has(category.id!) ? 'bg-red-500 ' : 'bg-purpleMain'
                    } rounded-2xl`}
                  >
                    {category.name}
                    {categoryToDelete.has(category.id!) ?
                      <></>
                      :
                      <TiDelete className=" text-[20px]"/>
                    }
                  </button>
              </div>
            ))}
          </div>
          <div className="border-2 m-2 border-blue-gray-500"></div>
        </div>
      ) : null}
      <div onClick={saveCategories} className="flex justify-around items-center">
        <button className="p-2 m-2 border-2 text-[21px] border-purpleMain rounded-sm hover:bg-yellowMainLight bg-yellowMain">
          Guardar Categorías
        </button>
        {categoryInitial.length && categorySelect.length ?
        <button onClick={()=>router.push(`/admin/create-module/${course.id}`)} className="p-2 m-2 border-2 text-[21px] border-gray-500 rounded-sm hover:bg-gray-300 bg-gray-400">
          Cancelar
        </button>
        :
        <></>

        }
      </div>
    </div>
  );
};

export default EditCategoriesForm;
