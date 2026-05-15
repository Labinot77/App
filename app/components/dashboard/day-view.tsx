"use client"

import { Task } from "@/lib/types"
import { TaskCard } from "./task-card"
import { TaskModal } from "./task-modal"
import { JournalSection } from "./journal-section"

type Props = {
  tasks: Task[]
  journal: string
  onAddTask: (title: string, description: string) => void
  onUpdateTask: (task: Task) => void
  onJournalChange: (journal: string) => void
}

export function DayView({
  tasks,
  journal,
  onAddTask,
  onUpdateTask,
  onJournalChange,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Daily Planner
        </h1>

        <TaskModal onCreate={onAddTask} />
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={onUpdateTask}
          />
        ))}
      </div>

      <JournalSection
        value={journal}
        onChange={onJournalChange}
      />
    </div>
  )
}