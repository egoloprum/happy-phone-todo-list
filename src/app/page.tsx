'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useMemo, useState } from 'react'

import { InitialCategories, Category } from '@/entities/categories'
import { StatusList } from '@/entities/status'
import { InitialTasks, Task } from '@/entities/task'
import { Header } from '@/widgets/header'
import { Kanban } from '@/widgets/kanban'
import { Table } from '@/widgets/table'

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuspendedComponent />
    </Suspense>
  )
}

function SuspendedComponent() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const searchParams = useSearchParams()
  const viewMode = searchParams.get('view') || 'table'
  const sortMode = searchParams.get('sort')

  const filterByStatus = searchParams.get('status')
  const filterByCategory = searchParams.get('category')

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

  const filteredAndSortedTasks = useMemo(() => {
    let filteredTasks = [...tasks]

    if (filterByStatus) {
      filteredTasks = filteredTasks.filter(
        task => task.status === filterByStatus
      )
    }

    if (filterByCategory) {
      filteredTasks = filteredTasks.filter(
        task => task.category === filterByCategory
      )
    }

    if (sortMode) {
      filteredTasks.sort((a, b) => {
        switch (sortMode) {
          case 'date':
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            )

          case 'alphabet':
            return a.content.localeCompare(b.content, undefined, {
              sensitivity: 'base'
            })

          case 'status':
            const statusOrder = StatusList.reduce(
              (acc, status, index) => {
                acc[status] = index
                return acc
              },
              {} as Record<string, number>
            )
            return statusOrder[a.status] - statusOrder[b.status]

          default:
            return 0
        }
      })
    }

    return filteredTasks
  }, [tasks, sortMode, filterByStatus, filterByCategory])

  return (
    <div className="min-h-[100vh]">
      <Header
        categories={categories}
        setTasks={setTasks}
        setCategories={setCategories}
      />
      {viewMode === 'table' ? (
        <Table tasks={filteredAndSortedTasks} />
      ) : (
        <Kanban
          tasks={filteredAndSortedTasks}
          setTasks={setTasks}
          categories={categories}
          setCategories={setCategories}
        />
      )}
    </div>
  )
}
