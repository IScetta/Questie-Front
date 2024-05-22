"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ToggleButton: React.FC = (): JSX.Element => {
  const pathname = usePathname();

  const buttonText = pathname === "/" ? "Registrarse" : "Iniciar Sesión";
  const linkPath = buttonText === "Registrarse" ? "/sign-up" : "/sign-in";

  return (
    <>
      <Link href={linkPath}>
        <button className="bg-yellowMain text-purpleMain text-base font-semibold cursor-pointer px-4 py-2 rounded-lg">
          {buttonText}
        </button>
      </Link>
    </>
  );
};

export default ToggleButton;