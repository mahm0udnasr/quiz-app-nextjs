"use client"

import { useState, useEffect, useCallback } from "react"
import type { Question } from "@/data/quiz-data"

export interface QuizResult {
  date: string
  score: number
  timeElapsed: number
  passed: boolean
}

export const useQuiz = (questions: Question[]) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, boolean | number>>({})
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [quizStartTime] = useState(Date.now())

  // Timer Effect
  useEffect(() => {
    if (!isQuizCompleted && !showResults) {
      const timer = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - quizStartTime) / 1000))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isQuizCompleted, showResults, quizStartTime])

  const handleAnswer = useCallback(
    (answer: boolean | number) => {
      setUserAnswers((prev) => ({
        ...prev,
        [currentQuestion]: answer,
      }))
    },
    [currentQuestion],
  )

  const nextQuestion = useCallback(() => {
    if (userAnswers[currentQuestion] === undefined) {
      setError("يرجى اختيار إجابة قبل المتابعة")
      setTimeout(() => setError(null), 3000)
      return
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setIsLoading(true)
      setTimeout(() => {
        setIsQuizCompleted(true)
        setShowResults(true)
        setIsLoading(false)
      }, 1500)
    }
  }, [currentQuestion, questions.length, userAnswers])

  const prevQuestion = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }, [currentQuestion])

  const calculateScore = useCallback(() => {
    let correct = 0
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correct++
      }
    })
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    }
  }, [questions, userAnswers])

  const resetQuiz = useCallback(() => {
    setCurrentQuestion(0)
    setUserAnswers({})
    setIsQuizCompleted(false)
    setShowResults(false)
    setError(null)
    setTimeElapsed(0)
  }, [])

  return {
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
  }
}
