const ContentTitle: React.FC<{ title: string | undefined }> = ({
  title,
}: {
  title: string | undefined;
}): JSX.Element => {
  return (
    <div className="bg-blue-gray-50 w-full h-auto p-4 mt-8 text-center rounded">
      <h1 className="text-4xl font-semibold">{title}</h1>
    </div>
  );
};

export default ContentTitle;
