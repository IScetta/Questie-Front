import Link from "next/link";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className="bg-purpleMain pb-5">
      <div className="flex flex-col justify-center items-center w-full h-auto sm:px-[11.5rem] md">
        <div className="sm:flex sm:flex-row grid grid-cols-2 justify-between items-center w-full h-full px-2 py-2 md:mr-20 lg:mr-14">
          <div className="ml-4  flex flex-col sm:flex sm:flex-col justify-start items-start h-[15rem] sm:w-60 sm:h-[17.5rem] sm:p-6 md:place-content-center md:ml-0">
            <h1 className="text-yellowMain text-sm sm:text-2xl font-medium mb-6">
              Empresa
            </h1>
            <Link href="/about">
              <p className="text-white text-sm sm:text-base font-normal hover:underline cursor-pointer mb-3">
                Acerca de
              </p>
            </Link>
            <Link href="/contact">
              <p className="text-white text-sm sm:text-base font-normal hover:underline cursor-pointer mb-3">
                Empleo
              </p>
            </Link>
            <Link href="/affiliate-program">
              <p className="text-white text-sm sm:text-base font-normal hover:underline cursor-pointer mb-3">
                Programa de Afiliados
              </p>
            </Link>
            <Link href="/associations">
              <p className="text-white text-sm sm:text-base font-normal hover:underline cursor-pointer mb-3">
                Asociaciones
              </p>
            </Link>
            <Link href="/blog">
              <p className="text-white text-sm sm:text-base font-normal hover:underline cursor-pointer">
                Blog
              </p>
            </Link>
          </div>
          <div className="ml-4 flex flex-col sm:flex sm:flex-col justify-start items-start sm:w-60 h-[15rem] sm:h-[17.5rem] sm:p-6">
            <h1 className="text-yellowMain text-sm sm:text-2xl font-medium mb-6">
              Estudiantes
            </h1>
            <Link href="/students/scholarships">
              <p className="text-white text-sm sm:text-base font-normal hover:underline cursor-pointer mb-3">
                Becas
              </p>
            </Link>
            <Link href="/students/memberships">
              <p className="text-white text-sm sm:text-base font-normal hover:underline cursor-pointer mb-3">
                Membresias
              </p>
            </Link>
            <Link href="/students/points-plans">
              <p className="text-white text-sm sm:text-base font-normal hover:underline cursor-pointer mb-3">
                Planes de puntos
              </p>
            </Link>
          </div>
          <div className="ml-4 flex flex-col sm:flex sm:flex-col sm:justify-start sm:items-start sm:w-60 h-[15rem] sm:h-[17.5rem] sm:p-6">
            <h1 className="text-yellowMain sm:text-2xl font-medium mb-6">
              Enseñanza
            </h1>
            <Link href="/teaching/begin-to-teach">
              <p className="text-white text-sm sm:text-base font-normal hover:underline cursor-pointer mb-3">
                Comienza a enseñar
              </p>
            </Link>
            <Link href="/teaching/support-for-teachers">
              <p className="text-white text-sm sm:text-base font-normal hover:underline cursor-pointer mb-3">
                Ayuda para profesores
              </p>
            </Link>
            <Link href="/teaching/rules-and-requirements">
              <p className="text-white text-sm sm:text-base font-normal hover:underline cursor-pointer mb-3">
                Reglas y requisitos
              </p>
            </Link>
            <Link href="/teaching/support-center">
              <p className="text-white text-sm sm:text-base font-normal hover:underline cursor-pointer mb-3">
                Centro de ayuda
              </p>
            </Link>
          </div>
        </div>
        <div className="w-10/12 h-[0px] border border-white"></div>
        <div className="flex flex-col md:flex-row justify-center items-center w-full h-20">
          <div className="flex flex-nowrap items-stretch  place-content-center md:place-content-center md:flex-row   w-full h-auto  gap-3 mt-5 mb-3 lg:mr-10">
            <p className="text-white text-sm sm:text-base font-normal hover:underline ml-3 md:text-xs">© Questie - 2024</p>
            <Link href="/help">
              <p className="text-white text-sm sm:text-base font-normal hover:underline md:text-sm">
                Ayuda
              </p>
            </Link>
            <Link href="/privacy">
              <p className="text-white text-sm sm:text-base font-normal hover:underline md:text-sm">
                Privacidad
              </p>
            </Link>
            <Link href="/terms">
              <p className="text-white text-xs sm:text-base font-normal hover:underline md:text-sm">
                Términos y Condiciones
              </p>
            </Link>
          </div>
          <div className="flex flex-row justify-center md:justify-end content-center items-center w-full h-full mx-4">
            <Link
              href="https://www.instagram.com"
              target="_blank"
              className="mr-1"
            >
              <FaInstagramSquare className="text-white w-6 h-auto cursor-pointer" />
            </Link>
            <Link
              href="https://www.facebook.com"
              target="_blank"
              className="mx-1"
            >
              <FaFacebookSquare className="text-white w-6 h-auto cursor-pointer" />
            </Link>
            <Link
              href="https://www.twitter.com"
              target="_blank"
              className="mx-1"
            >
              <FaSquareXTwitter className="text-white w-6 h-auto cursor-pointer" />
            </Link>
            <Link href="/">
              <h1 className="bg-yellowMain text-purpleMain text-sm sm:text-3xl font-medium px-4 py-2 ml-2 cursor-pointer rounded-lg md:text-base">
                Questie
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
