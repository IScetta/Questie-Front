const ContentVideo: React.FC<{
  video: string | undefined;
  description: string | undefined;
}> = ({
  video,
  description,
}: {
  video: string | undefined;
  description: string | undefined;
}): JSX.Element => {
  return (
    <div className="bg-blue-gray-50 flex justify-center items-center w-full h-auto p-4 mt-4">
      <iframe
        width="640px"
        height="480px"
        src={video}
        title={description}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default ContentVideo;
