"use client"

import { useLocalStorage } from "../hooks/useLocalStorage"
import { DayData, Task } from "@/lib/types"

export function useTasks() {
  const [days, setDays] = useLocalStorage<Record<string, DayData>>(
    "tracker-data",
    {}
  )

  function createDay(date: string) {
    if (!days[date]) {
      setDays({
        ...days,
        [date]: { date, tasks: [], journal: "" },
      })
    }
  }

  function addTask(date: string, task: Task) {
    createDay(date)
    setDays((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        tasks: [...(prev[date]?.tasks ?? []), task],
      },
    }))
  }

  function updateTask(date: string, updatedTask: Task) {
    setDays((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        tasks: prev[date].tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        ),
      },
    }))
  }

  function deleteTask(date: string, taskId: string) {
    setDays((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        tasks: prev[date].tasks.filter((task) => task.id !== taskId),
      },
    }))
  }

  function updateJournal(date: string, journal: string) {
    createDay(date)
    setDays((prev) => ({
      ...prev,
      [date]: { ...prev[date], journal },
    }))
  }

  return { days, addTask, updateTask, deleteTask, updateJournal }
}