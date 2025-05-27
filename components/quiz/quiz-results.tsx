"use client"

import { RotateCcw, Trophy, CheckCircle, XCircle, Clock, BookOpen } from "lucide-react"
import { SuccessAnimation, FailureAnimation } from "./animations"
import type { Score, QuizResult } from "@/types/quiz"

interface QuizResultsProps {
  score: Score
  timeElapsed: number
  totalQuestions: number
  quizHistory: QuizResult[]
  onReset: () => void
}

export const QuizResults = ({ score, timeElapsed, totalQuestions, quizHistory, onReset }: QuizResultsProps) => {
  const passed = score.percentage >= 50

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">نتائج الاختبار</h1>
          <div className="flex items-center justify-center space-x-4 text-gray-600">
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {formatTime(timeElapsed)}
            </span>
            <span className="flex items-center gap-2">
              <BookOpen size={16} />
              {totalQuestions} سؤال
            </span>
          </div>
        </div>

        {/* Result Card */}
        <div
          className={`bg-white rounded-3xl shadow-2xl p-8 text-center transform transition-all duration-500 ${
            passed ? "border-4 border-green-200" : "border-4 border-red-200"
          }`}
        >
          {/* Score */}
          <div className="mb-6">
            <div className={`text-8xl font-bold mb-4 ${passed ? "text-green-600" : "text-red-600"}`}>
              {score.percentage}%
            </div>
            <h2 className={`text-3xl font-bold mb-2 ${passed ? "text-green-800" : "text-red-800"}`}>
              {passed ? "نجحت في الاختبار! " : "لم تنجح في الاختبار "}
            </h2>
            <p className="text-gray-600 text-lg">
              أجبت بشكل صحيح على {score.correct} من أصل {score.total} سؤال
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onReset}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
            >
              <RotateCcw size={20} />
              إعادة المحاولة
            </button>
          </div>
        </div>

        {/* Quiz History */}
        {quizHistory.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Trophy size={20} />
              سجل المحاولات السابقة
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {quizHistory.slice(0, 5).map((attempt, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">{new Date(attempt.date).toLocaleDateString("ar")}</span>
                  <div className="flex items-center gap-3">
                    <span className={`font-semibold ${attempt.passed ? "text-green-600" : "text-red-600"}`}>
                      {attempt.score}%
                    </span>
                    <span className="text-gray-500 text-sm">{formatTime(attempt.timeElapsed)}</span>
                    {attempt.passed ? (
                      <CheckCircle className="text-green-500" size={16} />
                    ) : (
                      <XCircle className="text-red-500" size={16} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
