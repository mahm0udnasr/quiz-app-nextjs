"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredCount: number;
  isAnswered: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export const QuizNavigation = ({
  currentQuestion,
  totalQuestions,
  answeredCount,
  isAnswered,
  onPrevious,
  onNext,
}: QuizNavigationProps) => {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
          currentQuestion === 0
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md transform hover:scale-105"
        }`}
      >
        <ArrowRight size={20} />
        السابق
      </button>

      <div className="text-center">
        <div className="text-sm text-gray-500 mb-1">تمت الإجابة على</div>
        <div className="text-lg font-semibold text-gray-700">
          {answeredCount} / {totalQuestions}
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!isAnswered}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
          !isAnswered
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : currentQuestion === totalQuestions - 1
            ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg"
            : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg"
        }`}
      >
        {currentQuestion === totalQuestions - 1 ? "إنهاء الاختبار" : "التالي"}

        <ArrowLeft size={20} />
      </button>
    </div>
  );
};
