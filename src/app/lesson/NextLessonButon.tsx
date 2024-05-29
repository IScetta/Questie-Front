// components/NextLessonButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ILesson, IPayload } from "@/app/types";
import { Button, Modal as FlowbiteModal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import markLesson from "@/helpers/markLessonAsCompleted.helper";
import { useUserContext } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";

interface NextLessonButtonProps {
  allLessons: ILesson[];
  lesson: ILesson;
  getNextLessonById: (allLessons: ILesson[], currentLessonId: string) => string;
}

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const questions: Question[] = [
  {
    question: "¿Cuál es el comando para instalar express?",
    options: [
      "npn install express framework",
      "npm install express",
      "install express",
      "express",
    ],
    answer: "npm install express",
  },
  {
    question:
      "¿como se requiere el módulo de Express en un archivo JavaScript?",
    options: [
      "const express = require('express');",
      "require('express');",
      "express = require('express');",
      "const express = require('expressjs');",
    ],
    answer: "const express = require('express');",
  },
  // Agrega más preguntas aquí
];

const NextLessonButton: React.FC<NextLessonButtonProps> = ({
  allLessons,
  lesson,
  getNextLessonById,
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const router = useRouter();
  const { payload } = useAuth();

  const handleAnswerChange = (index: number, answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[index] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleConfirm = async () => {
    const allCorrect = questions.every(
      (question, index) => question.answer === selectedAnswers[index]
    );
    if (allCorrect) {
      let parsedPayload: IPayload;
      try {
        parsedPayload =
          typeof payload === "string" ? JSON.parse(payload) : payload;

        console.log(parsedPayload.id, "this is the end?????");

        const res = await markLesson(lesson.id, parsedPayload.id);
        console.log(res, "Lesson marked as completed");
        setIsCompleted(true);
        const nextLessonId = getNextLessonById(allLessons, lesson.id);
        setOpenModal(false);
        router.push(nextLessonId);
      } catch (error) {
        console.error(
          "Failed to parse payload or mark lesson as completed",
          error
        );
      }
    } else {
      alert(
        "Algunas respuestas son incorrectas. Por favor, revise sus respuestas."
      );
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => setOpenModal(true)}
        className="bg-yellowMain my-10 px-4 py-2 rounded-lg text-purpleMain text-lg font-normal"
      >
        {lesson.order + 1 <= allLessons.length
          ? "Siguiente Lección"
          : "Finalizar"}
      </button>

      <FlowbiteModal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <FlowbiteModal.Header />
        <FlowbiteModal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Responde las siguientes preguntas para completar la lección
            </h3>
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={index}>
                  <p className="text-md font-medium text-gray-700 dark:text-gray-300">
                    {question.question}
                  </p>
                  <div className="flex flex-col space-y-2 mt-2">
                    {question.options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={selectedAnswers[index] === option}
                          onChange={() => handleAnswerChange(index, option)}
                          className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        />
                        <span className="text-gray-600 dark:text-gray-400">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <Button color="failure" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
              <Button color="success" onClick={handleConfirm}>
                Confirmar
              </Button>
            </div>
          </div>
        </FlowbiteModal.Body>
      </FlowbiteModal>
    </div>
  );
};

export default NextLessonButton;
