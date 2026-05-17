"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

type Props = {
  open: boolean
  title: string
  description: string
  confirmText?: string
  onConfirm: () => void
  onClose: () => void
}

export function ConfirmPopup({
  open,
  title,
  description,
  confirmText = "Confirm",
  onConfirm,
  onClose,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -4 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 top-9 z-10 w-56 rounded-xl border border-border bg-card shadow-lg p-3 space-y-2"
        >
          <div className="space-y-1">
            <h4 className="text-sm font-medium">
              {title}
            </h4>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 h-7 text-xs"
              onClick={onConfirm}
            >
              {confirmText}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2"
              onClick={onClose}
            >
              <XIcon className="size-3" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}