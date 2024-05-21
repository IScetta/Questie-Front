const ContentTitle: React.FC<{ title: string }> = ({
  title,
}: {
  title: string;
}): JSX.Element => {
  return (
    <div className="bg-blue-gray-50 w-full h-auto p-4 mt-8 text-center rounded">
      <h1 className="text-5xl font-semibold">{title}</h1>
    </div>
  );
};

export default ContentTitle;
