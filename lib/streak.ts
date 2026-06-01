import { DayData } from "./types"
import { formatDate } from "./date"

export function calcStreak(days: Record<string, DayData>): number {
  const today = new Date()
  let streak = 0
 
  // Walk backwards from today until we find a day that breaks the streak
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const key = formatDate(d)
    const day = days[key]
 
    const isComplete =
      day && day.tasks.length > 0 && day.tasks.every((t) => t.completed)
 
    if (isComplete) {
      streak++
    } else {
      // Allow today to be incomplete without breaking (the day isn't over yet)
      if (i === 0) continue
      break
    }
  }
 
  return streak
}