"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Textarea } from "@/components/ui/textarea"
import { TextFormatterToolbar } from "./text-formatter-toolbar"
import { RenderFormattedText, parseFormattedText } from "./text-formatter-parser"

type Props = {
  value: string
  onChange: (value: string) => void
}

export function JournalSection({ value, onChange }: Props) {
  const [showPreview, setShowPreview] = useState(false)
  const [selectedText, setSelectedText] = useState("")

  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  function applyFormat(format: string, colorValue?: string) {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const selectedText = text.substring(start, end)

    if (!selectedText) return

    let formattedText = ""
    if (format === "bold") {
      formattedText = `**${selectedText}**`
    } else if (format === "italic") {
      formattedText = `*${selectedText}*`
    } else if (format === "underline") {
      formattedText = `__${selectedText}__`
    } else if (format === "color" && colorValue) {
      formattedText = `[${colorValue}]${selectedText}[/]`
    }

    const newText =
      text.substring(0, start) + formattedText + text.substring(end)
    onChange(newText)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + formattedText.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.35 }}
      className="flex flex-col flex-1 min-h-0 rounded-2xl bg-card border border-border shadow-sm p-4 gap-3"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Daily Journal
        </p>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="text-xs px-2 py-1 rounded bg-background/60 hover:bg-background/80 transition-colors text-muted-foreground hover:text-foreground"
        >
          {showPreview ? "Edit" : "Preview"}
        </button>
      </div>

      {!showPreview && (
        <>
          <TextFormatterToolbar onApplyFormat={applyFormat} />

          <Textarea
            ref={textareaRef}
            className="flex-1 min-h-0 resize-none bg-background/60 leading-relaxed text-sm font-mono"
            placeholder="What went well? What could be better? What are you grateful for?

Use **bold** for important text
Use *italic* for emphasis  
Use __underline__ for highlights
Use [#ff0000]colored text[/] for colors"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </>
      )}

      {showPreview && (
        <div className="flex-1 min-h-0 overflow-y-auto bg-background/60 rounded p-3 leading-relaxed text-sm prose prose-sm max-w-none">
          <RenderFormattedText nodes={parseFormattedText(value)} />
          {!value && (
            <span className="text-muted-foreground">Nothing to preview yet...</span>
          )}
        </div>
      )}
    </motion.div>
  )
}
