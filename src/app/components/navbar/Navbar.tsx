import Link from "next/link";
import { FaCaretDown } from "react-icons/fa";
import { IoSearchCircle } from "react-icons/io5";
import ButtonCategoryNavbar from "./button-category-navbar";

const Navbar: React.FC = (): JSX.Element => {
  return (
    <nav className="flex items-center justify-between px-[11.5rem] py-4 bg-purpleMain">
      <Link href="/">
        <h1 className="text-white text-4xl font-medium">Questie</h1>
      </Link>
      <div className="flex items-center justify-between space-x-4">
        <ButtonCategoryNavbar />
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
      <Link href="/signup">
        <button className="bg-yellowMain text-purpleMain text-base font-semibold cursor-pointer px-4 py-2 rounded-lg">
          Registrarse
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
