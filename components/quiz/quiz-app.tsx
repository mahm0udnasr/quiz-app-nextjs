"use client"

import { AlertTriangle } from "lucide-react"
import { quizData } from "@/data/quiz-data"
import { useQuiz } from "@/hooks/use-quiz"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { LoadingSpinner } from "@/components/animations/loading-spinner"
import { QuizHeader } from "./quiz-header"
import { QuestionDisplay } from "./question-display"
import { QuizNavigation } from "./quiz-navigation"
import { QuizResults } from "./quiz-results"
import type { QuizResult } from "@/hooks/use-quiz"

export default function QuizApp() {
  const {
    currentQuestion,
    userAnswers,
    isQuizCompleted,
    showResults,
    isLoading,
    error,
    timeElapsed,
    handleAnswer,
    nextQuestion,
    prevQuestion,
    calculateScore,
    resetQuiz,
  } = useQuiz(quizData.questions)

  const [quizHistory, setQuizHistory] = useLocalStorage<QuizResult[]>("quizHistory", [])

  const score = calculateScore()
  const currentQ = quizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100
  const isAnswered = userAnswers.hasOwnProperty(currentQuestion)

  // Save result when quiz is completed
  if (isQuizCompleted && showResults && !quizHistory.some((h) => h.date === new Date().toISOString().split("T")[0])) {
    const quizResult: QuizResult = {
      date: new Date().toISOString(),
      score: score.percentage,
      timeElapsed,
      passed: score.percentage >= 50,
    }
    setQuizHistory((prev) => [quizResult, ...prev.slice(0, 9)])
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner />
          <p className="text-gray-600 text-lg">جاري حساب النتائج...</p>
        </div>
      </div>
    )
  }

  if (showResults) {
    return <QuizResults score={score} timeElapsed={timeElapsed} onReset={resetQuiz} history={quizHistory} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      <QuizHeader
        title={quizData.title}
        currentQuestion={currentQuestion}
        totalQuestions={quizData.questions.length}
        timeElapsed={timeElapsed}
        progress={progress}
      />

      {error && (
        <div className="max-w-4xl mx-auto px-6 pt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 animate-pulse">
            <AlertTriangle size={20} />
            {error}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-6">
        <QuestionDisplay question={currentQ} userAnswer={userAnswers[currentQuestion]} onAnswer={handleAnswer} />

        <div className="mt-8">
          <QuizNavigation
            currentQuestion={currentQuestion}
            totalQuestions={quizData.questions.length}
            answeredCount={Object.keys(userAnswers).length}
            isAnswered={isAnswered}
            onPrevious={prevQuestion}
            onNext={nextQuestion}
          />
        </div>
      </div>
    </div>
  )
}
