"use client"

import { motion } from "motion/react"
import { Textarea } from "@/components/ui/textarea"

type Props = {
  value: string
  onChange: (value: string) => void
}

export function JournalSection({ value, onChange }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.35 }}
      className="flex flex-col flex-1 min-h-0 rounded-2xl bg-card border border-border shadow-sm p-4 gap-3"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
          Daily Journal
        </p>
      </div>

      <Textarea
        className="flex-1 min-h-0 resize-none bg-background/60 leading-relaxed text-sm"
        placeholder="What went well? What could be better? What are you grateful for?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </motion.div>
  )
}