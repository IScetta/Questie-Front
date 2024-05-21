const ContentText: React.FC<{ text: string }> = ({
  text,
}: {
  text: string;
}): JSX.Element => {
  return (
    <div className="bg-blue-gray-50 w-full h-auto p-4 mt-4 rounded">
      <p className="text-base text-left">{text}</p>
    </div>
  );
};

export default ContentText;
