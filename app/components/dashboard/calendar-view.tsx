"use client"

import { Calendar } from "@/components/ui/calendar"

type Props = {
  selected: Date
  onSelect: (date: Date) => void
}

export function CalendarView({ selected, onSelect }: Props) {
  return (
    <div className="rounded-2xl border p-4 bg-white shadow-sm">
      <Calendar
        mode="single"
        selected={selected}
        onSelect={(date) => {
          if (date) onSelect(date)
        }}
        className="rounded-md"
      />
    </div>
  )
}