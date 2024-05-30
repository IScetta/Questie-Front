import Link from "next/link";
import { usePathname } from "next/navigation";
import CreateCategoriesModal from "../../dashboard-admin/create-categories-modal";

const ButtonAdminColumn = () => {
  const pathname = usePathname();

  const linkpath = pathname === "/admin" ? "/admin/create-course" : "/admin";
  const buttontext =
    pathname === "/admin" ? "Crear Cursos" : "Administrar Cursos";

  return (
    <div className="flex flex-col justify-center">
      <button className="bg-yellowMain text-purpleMain mb-2 h-10 w-52 text-lg font-semibold">
        <Link href={linkpath}>{buttontext}</Link>
      </button>
      <CreateCategoriesModal/>
    </div>
  );
};

export default ButtonAdminColumn;
