const ContentText: React.FC<{ text: string | undefined }> = ({
  text,
}: {
  text: string | undefined;
}): JSX.Element => {
  return (
    <div className="bg-blue-gray-50 w-full h-auto p-4 mt-4 rounded">
      <p className="text-lg text-left leading-8">{text}</p>
    </div>
  );
};

export default ContentText;
