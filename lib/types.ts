export type Task = {
  id: string
  title: string
  description: string
  completed: boolean
  reflection?: string
  createdAt: string
}

export type DayData = {
  date: string
  tasks: Task[]
  journal: string
  dayRating?: number
  improvementNotes?: string
}
