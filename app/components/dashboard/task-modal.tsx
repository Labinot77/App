"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Props = {
  onCreate: (title: string, description: string) => void
}

export function TaskModal({ onCreate }: Props) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Task</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            className="w-full"
            onClick={() => {
              onCreate(title, description)

              setTitle("")
              setDescription("")
            }}
          >
            Save Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}