import Image from "next/image";

const HeaderCurse = () => {
  return (
    <div className="">
    <div className="flex flex-row bg-[url(https://blog.cronapp.io/wp-content/uploads/2020/09/javascript-1.jpg)] ">
      <div className="flex flex-col m-4 text-white">
        <h1 className="text-5xl m-4 backdrop-blur-sm">JavaScript Avansado - qweqwe qweqwe</h1>
        <p className="text-lg ml-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accur soluta,
          dolor ipsa cupiditate ut beatae.
        </p>
        <button className="bg-yellowMain text-purpleMain text-base font-semibold cursor-pointer px-4 py-2 rounded-lg">
          Iniciar Curso
        </button>
      </div>
      <div className="flex justify-center items-center p-4">
        <Image
        className=" rounded-2xl border-2 border-yellowMain"
          src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg"
          alt="video"
          width={400}
          height={600}
        />
      </div>
    </div>
    </div>
  );
};

export default HeaderCurse;
