"use client"

import { motion } from "motion/react"
import { Star } from "lucide-react"
import { Input } from "@/components/ui/input"

type Props = {
  rating: number
  improvementNotes: string
  onRatingChange: (rating: number) => void
  onImprovementNotesChange: (notes: string) => void
}

export function DayRatingSection({
  rating,
  improvementNotes,
  onRatingChange,
  onImprovementNotesChange,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.4 }}
      className="flex flex-col rounded-2xl bg-card border border-border shadow-sm p-4 gap-4"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Rate Your Day
        </p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              onClick={() => onRatingChange(rating === star ? 0 : star)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="transition-transform"
            >
              <Star
                className={`w-6 h-6 transition-all ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground hover:text-yellow-400"
                }`}
              />
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          What could be better?
        </p>
        <Input
          placeholder="Type something you wish you did better or didn't do today…"
          value={improvementNotes}
          onChange={(e) => onImprovementNotesChange(e.target.value)}
          className="bg-background/60 h-9 text-sm"
        />
      </div>
    </motion.div>
  )
}
