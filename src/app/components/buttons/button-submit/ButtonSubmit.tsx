import { IContent } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { postLessonContent } from "@/helpers/lesson.helper";
import Link from "next/link";

const ButtonSubmit = async ({
  lessonid,
  contents,
  courseid,
}: {
  lessonid: string;
  contents: any;
  courseid: string;
}) => {
  const { token } = useAuth();
  const submitContent = await postLessonContent(lessonid, contents, token!);

  return (
    <button
    type="submit"
      onClick={submitContent}
      className="bg-yellowMain text-purpleMain h-10 w-52 text-lg font-semibold"
    >
      {/* <Link href={`/admin/create-course/${courseid}`}>Crear Contenido</Link> */}
    </button>
  );
};

export default ButtonSubmit;
