'use client'

import { Category } from '@/entities/categories/type'
import { Task } from '@/entities/task/type'
import { InitialTasks } from '@/shared/lib/data'
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
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    } else {
      localStorage.setItem('tasks', JSON.stringify(InitialTasks))
      setTasks(InitialTasks)
    }
  }, [])

  return (
    <div className="min-h-[100vh]">
      <Header />

      {viewMode === 'table' ? (
        <Table tasks={tasks} />
      ) : (
        <Kanban tasks={tasks} setTasks={setTasks} />
      )}
    </div>
  )
}
