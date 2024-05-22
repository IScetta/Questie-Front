import Link from "next/link";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className="bg-purpleMain pb-5">
      <div className="flex flex-col justify-center items-center w-full h-auto px-[5rem] sm:px-[5rem] md:px-[11.5rem]">
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between items-start w-full px-2 py-2">
          <div className="flex flex-col justify-start items-start h-auto w-full sm:w-60 sm:p-6 mb-6 sm:mb-0">
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
          <div className="flex flex-col justify-start items-start h-auto w-full sm:w-60 sm:p-6 mb-6 sm:mb-0">
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
          <div className="flex flex-col justify-start items-start h-auto w-full sm:w-60 sm:p-6">
            <h1 className="text-yellowMain text-sm sm:text-2xl font-medium mb-6">
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
        <div className="w-10/12 border-t border-white my-6"></div>
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-5 md:mb-0">
            <p className="text-white text-sm sm:text-base font-normal hover:underline">
              © Questie - 2024
            </p>
            <Link href="/help">
              <p className="text-white text-sm sm:text-base font-normal hover:underline">
                Ayuda
              </p>
            </Link>
            <Link href="/privacy">
              <p className="text-white text-sm sm:text-base font-normal hover:underline">
                Privacidad
              </p>
            </Link>
            <Link href="/terms">
              <p className="text-white text-sm sm:text-base font-normal hover:underline">
                Términos y Condiciones
              </p>
            </Link>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-3">
            <Link href="https://www.instagram.com" target="_blank">
              <FaInstagramSquare className="text-white w-6 h-auto cursor-pointer" />
            </Link>
            <Link href="https://www.facebook.com" target="_blank">
              <FaFacebookSquare className="text-white w-6 h-auto cursor-pointer" />
            </Link>
            <Link href="https://www.twitter.com" target="_blank">
              <FaSquareXTwitter className="text-white w-6 h-auto cursor-pointer" />
            </Link>
            <Link href="/">
              <h1 className="bg-yellowMain text-purpleMain text-base sm:text-lg md:text-xl font-medium px-4 py-2 rounded-lg cursor-pointer">
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
