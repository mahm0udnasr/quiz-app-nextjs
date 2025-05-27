"use client"

import { CheckCircle, XCircle } from "lucide-react"
import type { Question } from "@/data/quiz-data"

interface QuestionDisplayProps {
  question: Question
  userAnswer: boolean | number | undefined
  onAnswer: (answer: boolean | number) => void
}

export const QuestionDisplay = ({ question, userAnswer, onAnswer }: QuestionDisplayProps) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 leading-relaxed">{question.question}</h2>
      </div>

      <div className="space-y-4 mb-8">
        {question.type === "truefalse" ? (
          <>
            <button
              onClick={() => onAnswer(true)}
              className={`w-full p-6 text-right rounded-2xl border-2 transition-all duration-300 transform hover:scale-102 ${
                userAnswer === true
                  ? "border-green-500 bg-green-50 text-green-800 shadow-lg scale-102"
                  : "border-gray-200 hover:border-green-300 hover:bg-green-50 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">صحيح</span>
                <CheckCircle className={`w-6 h-6 ${userAnswer === true ? "text-green-500" : "text-gray-300"}`} />
              </div>
            </button>

            <button
              onClick={() => onAnswer(false)}
              className={`w-full p-6 text-right rounded-2xl border-2 transition-all duration-300 transform hover:scale-102 ${
                userAnswer === false
                  ? "border-red-500 bg-red-50 text-red-800 shadow-lg scale-102"
                  : "border-gray-200 hover:border-red-300 hover:bg-red-50 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">خطأ</span>
                <XCircle className={`w-6 h-6 ${userAnswer === false ? "text-red-500" : "text-gray-300"}`} />
              </div>
            </button>
          </>
        ) : (
          question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(index)}
              className={`w-full p-6 text-right rounded-2xl border-2 transition-all duration-300 transform hover:scale-102 ${
                userAnswer === index
                  ? "border-blue-500 bg-blue-50 text-blue-800 shadow-lg scale-102"
                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">{option}</span>
                <div
                  className={`w-6 h-6 rounded-full border-2 ${
                    userAnswer === index ? "border-blue-500 bg-blue-500" : "border-gray-300"
                  }`}
                >
                  {userAnswer === index && (
                    <div className="w-full h-full bg-white rounded-full transform scale-50"></div>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
