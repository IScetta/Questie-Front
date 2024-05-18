import Link from "next/link";
import { FaCaretDown } from "react-icons/fa";
import { IoSearchCircle } from "react-icons/io5";
import ButtonCategoryNavbar from "./button-category-navbar";
import ButtonNavbar from "../buttons/button-navbar";
import styles from "./NavBar.module.css";
import { getCategoriesDB } from "@/helpers/categories.helper";
import { ICategory } from "@/app/types";

 const Navbar: React.FC = async () => {
  const categoriesList:ICategory[] = await getCategoriesDB()
  return (
    <>
      <nav className="flex items-center justify-between px-[11.5rem] py-4 bg-purpleMain w-full">
        <Link href="/">
          <h1 className="text-white text-4xl font-medium">Questie</h1>
        </Link>
        <div className="flex items-center justify-between space-x-4">
          <ButtonCategoryNavbar categories={categoriesList} />
          <div className="justify-center items-center inline-flex cursor-pointer">
            <p className="text-white text-base font-medium hover:text-yellowMain cursor-pointer">
              Comunidad
            </p>
            <FaCaretDown className="text-white w-4 h-auto cursor-pointer" />
          </div>
          <div className="justify-center items-center inline-flex cursor-pointer">
            <Link href="/shop">
              <p className="text-white text-base font-medium hover:text-yellowMain cursor-pointer">
                Tienda
              </p>
            </Link>
          </div>
        </div>
        <div className="justify-center items-center inline-flex w-[32rem] h-12 p-2 bg-purpleMainLighter rounded-lg">
          <input
            className="w-full h-full px-2 py-1 bg-purpleMainLight rounded-lg placeholder:text-white placeholder:text-opacity-70"
            placeholder="Buscar..."
            type="text"
            name="search"
            id="search"
          />
          <button className="ml-1">
            <IoSearchCircle className="w-10 h-10 text-purpleMain" />
          </button>
        </div>
        <ButtonNavbar />
      </nav>
      <nav className={styles["navbar-mobile"]}>
        <div className={styles["navbar-mobile-menu"]}>
          <div className={styles["navbar-mobile-menu-button"]}></div>
          <input
            type="checkbox"
            className={styles["navbar-mobile-menu-activator"]}
          />
          <div className={styles["navbar-mobile-menu-links"]}>
            <Link href={"/"}>Home</Link>
            <Link href={"/categories"}>Categories</Link>
            <Link href={"/shop"}>Shop</Link>
          </div>
        </div>
        <div className={styles["navbar-mobile-title"]}>
          <h2>Questie</h2>
        </div>
        <div className={styles["navbar-mobile-button"]}>
          <ButtonNavbar />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
