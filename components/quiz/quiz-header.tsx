import { Clock } from "lucide-react"

interface QuizHeaderProps {
  title: string
  currentQuestion: number
  totalQuestions: number
  timeElapsed: number
  progress: number
}

export const QuizHeader = ({ title, currentQuestion, totalQuestions, timeElapsed, progress }: QuizHeaderProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4">{title}</h1>

        <div className="flex items-center justify-between mb-4">
          <span className="text-blue-100">
            السؤال {currentQuestion + 1} من {totalQuestions}
          </span>
          <div className="flex items-center gap-4 text-blue-100">
            <span className="flex items-center gap-1">
              <Clock size={16} />
              {formatTime(timeElapsed)}
            </span>
          </div>
        </div>

        <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
          <div
            className="bg-white h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
