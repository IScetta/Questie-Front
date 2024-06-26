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
    <div className="flex w-full">
      <div className="progress-container w-full">
        <div className="bg-gray-300 rounded-full h-2 w-full">
          <div
            className={`bg-green-500 rounded-full h-2 ${
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
