"use client"

import { Task } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

type Props = {
  task: Task
  onUpdate: (task: Task) => void
}

export function TaskCard({ task, onUpdate }: Props) {
  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-muted-foreground">
            {task.description}
          </p>
        </div>

        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) =>
            onUpdate({
              ...task,
              completed: e.target.checked,
            })
          }
        />
      </div>

      <Textarea
        placeholder="Reflection after task..."
        value={task.reflection || ""}
        onChange={(e) =>
          onUpdate({
            ...task,
            reflection: e.target.value,
          })
        }
      />
    </Card>
  )
}