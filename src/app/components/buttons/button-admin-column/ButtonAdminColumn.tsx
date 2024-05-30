import Link from "next/link";
import { usePathname } from "next/navigation";

const ButtonAdminColumn = () => {
  const pathname = usePathname();

  const linkpath = pathname === "/admin" ? "/admin/create-course" : "/admin";
  const buttontext =
    pathname === "/admin" ? "Crear Cursos" : "Administrar Cursos";

  return (
    <button className="bg-yellowMain text-purpleMain h-10 w-52 text-lg font-semibold">
      <Link href={linkpath}>{buttontext}</Link>
    </button>
  );
};

export default ButtonAdminColumn;
