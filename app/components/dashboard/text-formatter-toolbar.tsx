"use client"

import { Bold, Italic, Underline, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

type Props = {
  onApplyFormat: (format: string, value?: string) => void
}

const COLORS = [
  { name: "Default", value: "" },
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Yellow", value: "#eab308" },
  { name: "Green", value: "#22c55e" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Purple", value: "#a855f7" },
  { name: "Pink", value: "#ec4899" },
]

export function TextFormatterToolbar({ onApplyFormat }: Props) {
  const [showColorPicker, setShowColorPicker] = useState(false)

  return (
    <div className="flex flex-col gap-2 shrink-0">
      <div className="flex gap-1.5 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onApplyFormat("bold")}
          className="h-8 w-8 p-0 text-xs"
          title="Bold (Ctrl+B)"
        >
          <Bold className="size-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onApplyFormat("italic")}
          className="h-8 w-8 p-0 text-xs"
          title="Italic (Ctrl+I)"
        >
          <Italic className="size-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onApplyFormat("underline")}
          className="h-8 w-8 p-0 text-xs"
          title="Underline (Ctrl+U)"
        >
          <Underline className="size-4" />
        </Button>

        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="h-8 w-8 p-0"
            title="Color"
          >
            <Palette className="size-4" />
          </Button>

          <AnimatePresence>
            {showColorPicker && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg p-2 grid grid-cols-4 gap-1.5 z-10 shadow-lg"
              >
                {COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => {
                      onApplyFormat("color", color.value)
                      setShowColorPicker(false)
                    }}
                    className="group relative"
                    title={color.name}
                  >
                    <div
                      className="w-6 h-6 rounded border border-border transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: color.value || "var(--muted)",
                      }}
                    />
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="text-xs text-muted-foreground px-1">
        Use **bold**, *italic*, __underline__ or [color]text[/color]
      </p>
    </div>
  )
}
