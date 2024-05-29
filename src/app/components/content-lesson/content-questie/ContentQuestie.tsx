/* export interface IContent {
  id?: string;
  lesson_id: string;
  contents: Array<{
    type: string;
    content: {
      title?: string;
      subtitle?: string;
      text?: string;
      description?: string;
      image_url?: string;
      video_url?: string;
    };
  }>;
}
 */
import React, { useState } from "react";

interface Option {
  text: string;
  id: string;
}

const ContentQuestie: React.FC<{ question: string; options: Option[] }> = ({
  question,
  options,
}: {
  question: string;
  options: Option[];
}): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  return (
    <div className="bg-blue-gray-50 w-full h-auto p-4 mt-4 rounded">
      <p className="text-lg text-left leading-8">{question}</p>
      <div className="mt-4">
        {options.map((option) => (
          <div
            key={option.id}
            className={`cursor-pointer p-2 rounded-md ${
              selectedOption === option.id ? "bg-blue-200" : "bg-white"
            }`}
            onClick={() => handleOptionSelect(option.id)}
          >
            {option.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentQuestie;
