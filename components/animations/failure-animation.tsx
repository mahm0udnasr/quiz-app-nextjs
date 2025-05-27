import { Heart } from "lucide-react"

export const FailureAnimation = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="animate-bounce">
      <div className="text-6xl animate-pulse">😢</div>
    </div>
    <div className="animate-shake">
      <Heart className="text-red-500 w-12 h-12" />
    </div>
  </div>
)
