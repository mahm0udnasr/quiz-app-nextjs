import { Trophy, CheckCircle, XCircle } from "lucide-react"
import { formatTime } from "@/utils/time"
import type { QuizResult } from "@/hooks/use-quiz"

interface QuizHistoryProps {
  history: QuizResult[]
}

export const QuizHistory = ({ history }: QuizHistoryProps) => {
  if (history.length === 0) return null

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Trophy size={20} />
        سجل المحاولات السابقة
      </h3>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {history.slice(0, 5).map((attempt, index) => (
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
  )
}
