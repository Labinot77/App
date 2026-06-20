"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { CalendarView } from "./components/dashboard/calendar-view"
import { DayView } from "./components/dashboard/day-view"
import { useTasks } from "../lib/use-tasks"
import { formatDate } from "@/lib/date"
import { Task } from "@/lib/types"
import { calcStreak } from "@/lib/streak"
import { AuthStatus } from "./components/dashboard/auth-status"
import { useUser } from "@/lib/use-user"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const {
    days,
    addTask,
    updateTask,
    deleteTask,
    updateJournal,
    updateDayRating,
  } = useTasks()
  const { isLoggedIn, loading } = useUser()
  const router = useRouter()
  
  
  const formattedDate = formatDate(selectedDate)
  const currentDay = days[formattedDate]
  const streak = calcStreak(days)
  
  

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

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/login")
    }
  }, [loading, isLoggedIn, router])


  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
          >
            <AuthStatus/>
            <CalendarView
              selected={selectedDate}
              onSelect={setSelectedDate}
              days={days}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
            className="min-h-0"
          >

            <DayView
              tasks={currentDay?.tasks || []}
              journal={currentDay?.journal || ""}
              dayRating={currentDay?.dayRating || 0}
              onAddTask={handleAddTask}
              onUpdateTask={(task) => updateTask(formattedDate, task)}
              onDeleteTask={(id) => deleteTask(formattedDate, id)}
              onJournalChange={(journal) => updateJournal(formattedDate, journal)}
              onRatingChange={(rating) => updateDayRating(formattedDate, rating)}
              streak={streak}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
