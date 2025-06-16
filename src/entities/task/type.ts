export interface Task {
  id: number
  content: string
  status: 'New task' | 'Scheduled' | 'In progress' | 'Completed'
  category: string
  created_at: string
}
