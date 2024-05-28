import axios from "axios";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface AssessmentProps {
  courseId: string;
  initialAssessment?: number;
  onAssessmentChange?: (assessment: number) => void;
}

interface CourseScore {
  averageScore: number;
  totalAssessments: number;
  maxScore: number;
  minScore: number;
}

const Assessment = ({
  courseId,
  initialAssessment = 0,
  onAssessmentChange,
}: AssessmentProps) => {
  const [assessment, setAssessment] = useState<number>(initialAssessment);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalRatings, setTotalRatings] = useState<number>(0);
  const [filledStars, setFilledStars] = useState<number>(0);

  const handleAssessment = (rate: number) => {
    setAssessment(rate);
    if (onAssessmentChange) {
      onAssessmentChange(rate);
    }
  };

  const fetchCourseRating = async (courseId: string) => {
    try {
      const response = await axios.get<CourseScore>(
        `${API_URL}assessment/scores/${courseId}`
      );
      const courseScore: CourseScore = response.data;

      setAverageRating(courseScore.averageScore);
      setTotalRatings(courseScore.totalAssessments);
      setFilledStars(Math.round(courseScore.averageScore));
    } catch (error) {
      console.error("Error fetching course rating:", error);
    }
  };

  useEffect(() => {
    fetchCourseRating(courseId);
  }, [courseId]);

  return (
    <div className="my-2 ml-4">
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            filled={star <= filledStars}
            onClick={() => handleAssessment(star)}
          />
        ))}
      </div>
      <div className="text-xs text-gray-500">
        Valoración media: {averageRating.toFixed(1)} ({totalRatings}{" "}
        valoraciones)
      </div>
    </div>
  );
};

interface StarProps {
  filled: boolean;
  onClick: () => void;
}

const Star = ({ filled, onClick }: StarProps) => (
  <FaStar
    className={`w-8 h-8 cursor-pointer ${
      filled ? "text-yellow-400" : "text-gray-400"
    }`}
    onClick={onClick}
  />
);

export default Assessment;
