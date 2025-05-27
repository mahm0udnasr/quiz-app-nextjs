export interface Question {
  id: number
  type: "truefalse" | "multiple"
  question: string
  options?: string[]
  correctAnswer: boolean | number
}

export interface QuizData {
  title: string
  description: string
  questions: Question[]
}

export interface QuizResult {
  date: string
  score: number
  timeElapsed: number
  passed: boolean
}

export interface Score {
  correct: number
  total: number
  percentage: number
}
