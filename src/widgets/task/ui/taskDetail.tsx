'use client'

import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

import { Category } from '@/entities/categories'
import { Task } from '@/entities/task'
import { DeleteTaskBtn, EditTaskBtn } from '@/features/task'
import { Button } from '@/shared/ui'

interface TaskDetailProps {
  taskId: string
}

export const TaskDetail: FC<TaskDetailProps> = ({ taskId }) => {
  const [task, setTask] = useState<Task | null>(null)
  const [categories, setCategories] = useState<Category[]>([])

  const router = useRouter()

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    const storedCategories = localStorage.getItem('categories')

    if (storedTasks && storedCategories) {
      const parsedTasks: Task[] = JSON.parse(storedTasks)
      const parsedCategories: Category[] = JSON.parse(storedCategories)

      const foundTask = parsedTasks.find(task => task.id === Number(taskId))

      setTask(foundTask || null)
      setCategories(parsedCategories)
    }
  }, [taskId])

  if (!task) {
    return (
      <div className="p-4 border rounded-xl border-gray-200 w-[500px] h-fit">
        <h1 className="text-2xl">Task does not exist</h1>
        <p className="mb-4">No task found with ID: {taskId}</p>
        <Button
          mode="ghost"
          className="ml-auto"
          onClick={() => router.push('/')}>
          <MoveLeft />
          <span>Return</span>
        </Button>
      </div>
    )
  }

  const statusColor = {
    'New task': 'bg-purple-300',
    Scheduled: 'bg-yellow-300',
    'In progress': 'bg-blue-300',
    Completed: 'bg-green-300'
  }

  return (
    <div className="p-4 border rounded-xl border-gray-200 w-[500px] h-fit">
      <div className="flex gap-2 items-center">
        <h1 className="text-4xl italic">Task {task.id}</h1>
        <p
          className={`text-sm rounded-md w-fit h-fit px-2 ml-2 text-nowrap ${
            statusColor[task.status]
          }`}>
          {task.status}
        </p>
        <p className="ml-auto">{task.category}</p>
      </div>
      <p className="text-gray-500 text-sm">
        Task created at: {task.created_at}
      </p>
      <div className="mt-4">
        <h2 className="text-xl italic">Content</h2>
        <p className="text-gray-500">{task.content}</p>
      </div>

      <div className="flex gap-2 mt-4">
        <EditTaskBtn task={task} setTask={setTask} categories={categories} />
        <DeleteTaskBtn taskId={task.id} />
        <Button
          mode="ghost"
          className="ml-auto"
          onClick={() => router.push('/')}>
          <MoveLeft />
          <span>Return</span>
        </Button>
      </div>
    </div>
  )
}
