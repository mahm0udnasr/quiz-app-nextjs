"use client"

import { useState, useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { quizData } from "@/data/quiz-data"
import { QuizHeader } from "@/components/quiz/quiz-header"
import { QuestionCard } from "@/components/quiz/question-card"
import { QuizNavigation } from "@/components/quiz/quiz-navigation"
import { QuizResults } from "@/components/quiz/quiz-results"
import { LoadingSpinner } from "@/components/quiz/animations"
import type { QuizResult, Score } from "@/types/quiz"

export default function ModernQuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, boolean | number>>({})
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [quizStartTime] = useState(Date.now())

  const [quizHistory, setQuizHistory] = useLocalStorage<QuizResult[]>("quizHistory", [])

  // Timer Effect
  useEffect(() => {
    if (!isQuizCompleted && !showResults) {
      const timer = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - quizStartTime) / 1000))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isQuizCompleted, showResults, quizStartTime])

  const handleAnswer = (answer: boolean | number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }))
  }

  const nextQuestion = () => {
    const currentQ = quizData.questions[currentQuestion]
    if (userAnswers[currentQuestion] === undefined) {
      setError("يرجى اختيار إجابة قبل المتابعة")
      setTimeout(() => setError(null), 3000)
      return
    }

    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      completeQuiz()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const calculateScore = (): Score => {
    let correct = 0
    quizData.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correct++
      }
    })
    return {
      correct,
      total: quizData.questions.length,
      percentage: Math.round((correct / quizData.questions.length) * 100),
    }
  }

  const completeQuiz = () => {
    setIsLoading(true)

    setTimeout(() => {
      const score = calculateScore()
      const quizResult: QuizResult = {
        date: new Date().toISOString(),
        score: score.percentage,
        timeElapsed,
        passed: score.percentage >= 50,
      }

      setQuizHistory((prev) => [quizResult, ...prev.slice(0, 9)])
      setIsQuizCompleted(true)
      setShowResults(true)
      setIsLoading(false)
    }, 1500)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setUserAnswers({})
    setIsQuizCompleted(false)
    setShowResults(false)
    setError(null)
    setTimeElapsed(0)
  }

  const score = calculateScore()
  const currentQ = quizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100
  const isAnswered = userAnswers.hasOwnProperty(currentQuestion)

  // Loading State
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

  // Results Screen
  if (showResults) {
    return (
      <QuizResults
        score={score}
        timeElapsed={timeElapsed}
        totalQuestions={quizData.questions.length}
        quizHistory={quizHistory}
        onReset={resetQuiz}
      />
    )
  }

  // Quiz Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      <QuizHeader
        title={quizData.title}
        currentQuestion={currentQuestion}
        totalQuestions={quizData.questions.length}
        timeElapsed={timeElapsed}
        progress={progress}
      />

      {/* Error Message */}
      {error && (
        <div className="max-w-4xl mx-auto px-6 pt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 animate-pulse">
            <AlertTriangle size={20} />
            {error}
          </div>
        </div>
      )}

      {/* Question Section */}
      <div className="max-w-4xl mx-auto p-6">
        <QuestionCard question={currentQ} userAnswer={userAnswers[currentQuestion]} onAnswer={handleAnswer} />

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
