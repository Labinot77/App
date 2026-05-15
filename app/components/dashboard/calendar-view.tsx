"use client"

import { Calendar } from "@/components/ui/calendar"

type Props = {
  selected: Date
  onSelect: (date: Date) => void
}

export function CalendarView({ selected, onSelect }: Props) {
  return (
    <div
      className="rounded-2xl self-start sticky top-8 border border-border bg-card/40 backdrop-blur-sm p-5"
      style={{
        "--background": "transparent",
        "--foreground": "var(--foreground)",
        "--muted": "oklch(1 0 0 / 6%)",
        "--muted-foreground": "oklch(1 0 0 / 45%)",
        "--primary": "oklch(0.95 0 0)",
        "--primary-foreground": "oklch(0.13 0.015 240)",
        "--accent": "oklch(1 0 0 / 8%)",
        "--accent-foreground": "oklch(0.95 0 0)",
        "--border": "oklch(1 0 0 / 8%)",
        "--ring": "oklch(0.95 0 0)",
      } as React.CSSProperties}
    >
      <Calendar
        mode="single"
        selected={selected}
        onSelect={(date) => {
          if (date) onSelect(date)
        }}
        className="rounded-md w-full"
      />
    </div>
  )
}