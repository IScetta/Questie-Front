import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ProgressData {
  totalLessons: number;
  completedLessons: number;
  remainingLessons: number;
}

interface ProgressProps {
  courseId: string;
  userId: string;
}

const Progress = ({ courseId, userId }: ProgressProps) => {
  const [progress, setProgress] = useState<ProgressData | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get<ProgressData>(
          `${API_URL}progress/course/${courseId}/user/${userId}`
        );
        setProgress(response.data);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    fetchProgress();
  }, [courseId, userId]);

  if (!progress) {
    return <div>Cargando progreso...</div>;
  }

  const progressPercentage =
    progress.totalLessons === 0
      ? 0
      : (progress.completedLessons / progress.totalLessons) * 100;

  return (
    <div className="flex justify-end w-full max-w-md mr-6">
      <div className="progress-container">
        <h3 className="text-lg mb-2">Progreso del curso</h3>
        <div className="bg-gray-200 rounded-full h-6">
          <div
            className={`bg-green-500 rounded-full h-6 ${
              progressPercentage === 0 && "w-0"
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
