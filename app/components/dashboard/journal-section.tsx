"use client"

import { Textarea } from "@/components/ui/textarea"

type Props = {
  value: string
  onChange: (value: string) => void
}

export function JournalSection({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">
        Daily Journal
      </h2>

      <Textarea
        className="min-h-[220px]"
        placeholder="How was your day?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}