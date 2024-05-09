import { categoriesPreLoad } from "@/helpers/categoriesPreLoad";
import CategoryCard from "../category-card";

const CategoriesCards: React.FC = (): JSX.Element => {
  return (
    <div className="grid grid-cols-4 justify-items-center w-full h-auto gap-10">
      {categoriesPreLoad.map((category, index) => (
        <CategoryCard key={index} {...category} />
      ))}
    </div>
  );
};

export default CategoriesCards;
