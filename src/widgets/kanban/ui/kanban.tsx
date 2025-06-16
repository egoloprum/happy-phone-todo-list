'use client'

import { Task } from '@/entities/task/type'
import { getUniqueCategories } from '@/shared/lib/utils'
import Link from 'next/link'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

interface KanbanProps {
  tasks: Task[]
  setTasks: Dispatch<SetStateAction<Task[]>>
}

export const Kanban: FC<KanbanProps> = ({ tasks, setTasks }) => {
  const [categoryOrder, setCategoryOrder] = useState<string[]>(() =>
    getUniqueCategories(tasks)
  )

  const categories = categoryOrder.filter(cat =>
    tasks.some(task => task.category === cat)
  )

  useEffect(() => {
    const currentCategories = getUniqueCategories(tasks)
    const newCategories = currentCategories.filter(
      cat => !categoryOrder.includes(cat)
    )

    if (newCategories.length > 0) {
      setCategoryOrder(prev => [...prev, ...newCategories])
    }
  }, [tasks, categoryOrder])

  const tasksByCategory = categories.reduce((acc, category) => {
    acc[category] = tasks.filter(task => task.category === category)
    return acc
  }, {} as Record<string, Task[]>)

  const statusColor = {
    'New task': 'bg-purple-300',
    Scheduled: 'bg-yellow-300',
    'In progress': 'bg-blue-300',
    Completed: 'bg-green-300'
  }

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData('taskId', taskId.toString())
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, category: string) => {
    e.preventDefault()
    const taskId = parseInt(e.dataTransfer.getData('taskId'))

    if (!isNaN(taskId)) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, category } : task
        )
      )
    }
  }

  return (
    <div className="px-4 lg:px-20 py-4 pb-24">
      <div className="w-full flex overflow-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg mr-4 last:mr-0 min-w-[250px] w-full"
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, category)}>
            <p className="text-center p-4 border-b border-gray-200 font-semibold">
              {category}
            </p>
            <div className="min-h-[150px] p-2 flex flex-col gap-2">
              {tasksByCategory[category].map(task => (
                <Link
                  key={task.id}
                  draggable
                  onDragStart={e => handleDragStart(e, task.id)}
                  className="px-4 py-2 border rounded-xl border-gray-200 cursor-grab select-none min-w-[150px] bg-white"
                  href={`/task/${task.id}`}>
                  <p
                    className={`text-sm rounded-md w-fit px-2 ${
                      statusColor[task.status]
                    } text-nowrap`}>
                    {task.status}
                  </p>
                  <p>{task.content}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
