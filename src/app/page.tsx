'use client'

import { Category } from '@/entities/categories/type'
import { Task } from '@/entities/task/type'
import { InitialCategories, InitialTasks } from '@/shared/lib/data'
import { Header } from '@/widgets/header'
import { Kanban } from '@/widgets/kanban'
import { Table } from '@/widgets/table'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const searchParams = useSearchParams()
  let viewMode = searchParams.get('view')

  if (!viewMode) {
    viewMode = 'table'
  }

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    const storedCategories = localStorage.getItem('categories')

    if (storedTasks && storedCategories) {
      setTasks(JSON.parse(storedTasks))
      setCategories(JSON.parse(storedCategories))
    } else {
      localStorage.setItem('tasks', JSON.stringify(InitialTasks))
      setTasks(InitialTasks)
      localStorage.setItem('categories', JSON.stringify(InitialCategories))
      setCategories(InitialCategories)
    }
  }, [])

  useEffect(() => {
    if (tasks.length) {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks])

  useEffect(() => {
    if (categories.length) {
      localStorage.setItem('categories', JSON.stringify(categories))
    }
  }, [categories])

  return (
    <div className="min-h-[100vh]">
      <Header categories={categories} tasks={tasks} setTasks={setTasks} />

      {viewMode === 'table' ? (
        <Table tasks={tasks} />
      ) : (
        <Kanban tasks={tasks} setTasks={setTasks} />
      )}
    </div>
  )
}
