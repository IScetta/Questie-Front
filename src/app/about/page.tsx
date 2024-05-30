import Link from "next/link";

const About = () => {
  return (
    <div className="flex flex-col justify-center items-center mx-[11.5rem] my-20 space-y-20">
      <div className="flex flex-row justify-around items-center w-full h-full bg-blue-gray-50 p-8 rounded-lg">
        <div className="h-48">
          <h1 className="text-7xl font-bold text-purpleMain">Questie</h1>
        </div>
        <div className="flex flex-col justify-start items-start space-y-4 w-1/3 h-auto">
          <h1 className="text-4xl font-bold underline text-purpleMain">
            ¿Quienes Somos?
          </h1>
          <p className="text-base">
            Questie es una plataforma de aprendizaje en línea diseñada para
            ofrecer cursos de alta calidad en una variedad de disciplinas. Desde
            programación y diseño gráfico hasta marketing digital y desarrollo
            personal, Questie proporciona recursos educativos accesibles y
            prácticos para ayudar a los estudiantes a alcanzar sus objetivos
            profesionales y personales.
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-around items-center w-full h-full">
        <div className="flex flex-col justify-start items-start space-y-4 w-1/3 h-auto text-start bg-blue-gray-50 p-8 rounded-lg">
          <h1 className="text-3xl font-bold text-purpleMain text-start">
            Nuestra Historia
          </h1>
          <p>
            CursoMaster nació de nuestra visión compartida: somos Joel Daniel
            Blanco Lafon, Jorge Hernan Zimmermann, Luis Alberto Becerril
            Moralez, Lucas Alexis Heredia, Isaías Scetta e Ivan Exequiel Rojas,
            seis amigos apasionados por la educación y la tecnología. En 2018,
            nos reunimos con una idea clara: crear una plataforma que rompiera
            las barreras tradicionales del aprendizaje y ofreciera educación de
            alta calidad a cualquier persona, en cualquier lugar.
          </p>
        </div>
        <div className="flex flex-col justify-start items-start space-y-4 w-1/3 h-auto text-start bg-blue-gray-50 p-8 rounded-lg">
          <h1 className="text-3xl font-bold text-purpleMain text-start">
            Nuestra Misión
          </h1>
          <p>
            En Questie, nuestra misión es empoderar a los individuos en todo el
            mundo proporcionándoles acceso a educación de alta calidad que sea
            flexible, accesible y relevante. Nos comprometemos a crear una
            comunidad de aprendizaje dinámica y de apoyo, donde los estudiantes
            puedan desarrollar habilidades prácticas, alcanzar sus metas
            profesionales y personales, y adaptarse a las demandas de un mundo
            en constante cambio.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full h-full space-y-10">
        <h1 className="text-5xl font-bold text-purpleMain">
          Nuestros Integrantes
        </h1>
        <div className="flex flex-row justify-around items-center w-full h-full">
          <div className="flex flex-col justify-start items-center space-y-4 w-1/3 h-auto text-start bg-blue-gray-50 p-8 rounded-lg">
            <h1 className="text-3xl font-bold text-purpleMain text-start">
              Back-end
            </h1>
            <Link
              href="https://github.com/joeldblanco"
              target="_blank"
              className="hover:text-purpleMainLight"
            >
              Joel Daniel Blanco Lafon
            </Link>
            <Link
              href="https://github.com/Zimmer95"
              target="_blank"
              className="hover:text-purpleMainLight"
            >
              Jorge Hernan Zimmermann
            </Link>
            <Link
              href="https://github.com/LabM123"
              target="_blank"
              className="hover:text-purpleMainLight"
            >
              Luis Alberto Becerril Moralez
            </Link>
          </div>
          <div className="flex flex-col justify-start items-center space-y-4 w-1/3 h-auto text-start bg-blue-gray-50 p-8 rounded-lg">
            <h1 className="text-3xl font-bold text-purpleMain text-start">
              Front-end
            </h1>
            <Link
              href="https://github.com/LucasHeredia17"
              target="_blank"
              className="hover:text-purpleMainLight"
            >
              Lucas Alexis Heredia
            </Link>
            <Link
              href="https://github.com/IScetta"
              target="_blank"
              className="hover:text-purpleMainLight"
            >
              Isaías Scetta
            </Link>
            <Link
              href="https://github.com/IvanExequiel00"
              target="_blank"
              className="hover:text-purpleMainLight"
            >
              Ivan Exequiel Rojas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
