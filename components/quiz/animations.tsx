import { Trophy, Star, Heart } from "lucide-react"

export const SuccessAnimation = () => (
  <div className="flex flex-col items-center justify-center space-y-4 animate-bounce">
    <div className="relative">
      <Trophy className="text-yellow-500 w-20 h-20 animate-pulse" />
      <div className="absolute -top-2 -right-2 animate-spin">
        <Star className="text-yellow-400 w-8 h-8" />
      </div>
    </div>
    <div className="flex space-x-2">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="text-yellow-400 w-6 h-6 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
    </div>
  </div>
)

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

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
)
