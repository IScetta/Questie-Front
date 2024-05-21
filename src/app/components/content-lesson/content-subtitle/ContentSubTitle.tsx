const ContentSubTitle: React.FC<{ subtitle: string | undefined }> = ({
  subtitle,
}: {
  subtitle: string | undefined;
}): JSX.Element => {
  return (
    <div className="bg-blue-gray-50 w-full h-auto p-4 mt-8 text-center rounded">
      <h3 className="text-3xl font-semibold">{subtitle}</h3>
    </div>
  );
};

export default ContentSubTitle;
