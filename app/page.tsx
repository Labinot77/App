"use client"

import { useState } from "react"
import { CalendarView } from "./components/dashboard/calendar-view"
import { DayView } from "./components/dashboard/day-view"
import { useTasks } from "../lib/use-tasks"
import { formatDate } from "@/lib/date"
import { Task } from "@/lib/types"

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const { days, addTask, updateTask, updateJournal } =
    useTasks()

  const formattedDate = formatDate(selectedDate)

  const currentDay = days[formattedDate]

  function handleAddTask(title: string, description: string) {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      reflection: "",
      createdAt: new Date().toISOString(),
    }

    addTask(formattedDate, task)
  }

  return (
    <main className="min-h-screen bg-zinc-100">
      <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
        <CalendarView
          selected={selectedDate}
          onSelect={setSelectedDate}
        />

        <DayView
          tasks={currentDay?.tasks || []}
          journal={currentDay?.journal || ""}
          onAddTask={handleAddTask}
          onUpdateTask={(task) =>
            updateTask(formattedDate, task)
          }
          onJournalChange={(journal) =>
            updateJournal(formattedDate, journal)
          }
        />
      </div>
    </main>
  )
}