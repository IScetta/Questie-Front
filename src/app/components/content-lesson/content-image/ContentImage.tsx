import Image from "next/image";

const ContentImage: React.FC<{ image: string; name: string }> = ({
  image,
  name,
}: {
  image: string;
  name: string;
}): JSX.Element => {
  return (
    <div className="bg-blue-gray-50 flex justify-center items-center w-full h-auto p-4 mt-4 rounded">
      <Image
        src={image}
        alt={name}
        width={1000}
        height={1000}
        className="w-[640px] h-[480px] object-cover rounded-md"
      />
    </div>
  );
};

export default ContentImage;
