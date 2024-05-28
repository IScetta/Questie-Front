import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface AssessmentProps {
  initialAssessment?: number;
  onAssessmentChange?: (assessment: number) => void;
}

const Assessment = ({
  initialAssessment = 0,
  onAssessmentChange,
}: AssessmentProps) => {
  const [assessment, setAssessment] = useState(initialAssessment);

  const handleAssessment = (rate: number) => {
    setAssessment(rate);
    if (onAssessmentChange) {
      onAssessmentChange(rate);
    }
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={star <= assessment}
          onClick={() => handleAssessment(star)}
        />
      ))}
    </div>
  );
};

interface StarProps {
  filled: boolean;
  onClick: () => void;
}

const Star = ({ filled, onClick }: StarProps) => (
  <FaStar
    className={`w-8 h-8 cursor-pointer flex space-x-1 my-2 ml-4 ${
      filled ? "text-yellow-400" : "text-gray-400"
    }`}
    onClick={onClick}
  />
);

export default Assessment;
