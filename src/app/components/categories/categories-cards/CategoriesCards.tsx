import CategoryCard from "../category-card";
import categoriesPreLoad from "@/helpers/categoriesPreLoad.json";

const CategoriesCards: React.FC = async (): Promise<JSX.Element> => {
  // const categories = (await getCategoriesDB()) || [];
  const categories = categoriesPreLoad;
  const limitedCategories = categories.slice(0, 8);
  return (
    <div className="grid grid-cols-4 justify-items-center w-full h-auto gap-10">
      {limitedCategories.map((category, index) => (
        <CategoryCard key={index} {...category} />
      ))}
    </div>
  );
};

export default CategoriesCards;
