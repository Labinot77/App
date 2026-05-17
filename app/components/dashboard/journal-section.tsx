"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Textarea } from "@/components/ui/textarea"
import { TEMPLATE } from "@/app/constant/template"
import { Button } from "@/components/ui/button"
import { FileTextIcon, XIcon } from "lucide-react"

type Props = {
  value: string
  onChange: (value: string) => void
}

export function JournalSection({ value, onChange }: Props) {
  const [showConfirm, setShowConfirm] = useState(false)

  function applyTemplate() {
    if (value.trim()) {
      setShowConfirm(true)
    } else {
      onChange(TEMPLATE)
    }
  }

  function confirmApply() {
    onChange(TEMPLATE)
    setShowConfirm(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.35 }}
      className="flex flex-col flex-1 min-h-0 rounded-2xl bg-card border border-border shadow-sm p-4 gap-3"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 shrink-0">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
            Daily Journal
          </p>
          <h2 className="text-base font-bold tracking-tight text-foreground">
            Reflect on your day
          </h2>
        </div>

        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={applyTemplate}
            className="shrink-0 text-xs h-7 gap-1.5"
          >
            <FileTextIcon className="size-3" />
            Use template
          </Button>

          {/* Confirm overlay */}
          <AnimatePresence>
            {showConfirm && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-9 z-10 w-56 rounded-xl border border-border bg-card shadow-lg p-3 space-y-2"
              >
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This will replace your current journal entry. Continue?
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 h-7 text-xs"
                    onClick={confirmApply}
                  >
                    Replace
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => setShowConfirm(false)}
                  >
                    <XIcon className="size-3" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Textarea
        className="flex-1 min-h-0 resize-none bg-background/60 leading-relaxed text-sm font-mono"
        placeholder="Reflect on your day here."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </motion.div>
  )
}