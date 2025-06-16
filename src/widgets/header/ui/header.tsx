'use client'

import { Category } from '@/entities/categories/type'
import { Task } from '@/entities/task/type'
import { AddCategoryBtn } from '@/features/category'
import { AddTaskBtn, FilterTask, SortTask } from '@/features/task'
import { SwitchView } from '@/features/task/ui/switchView'
import { Dispatch, FC, SetStateAction } from 'react'

interface HeaderProps {
  categories: Category[]
  tasks: Task[]
  setTasks: Dispatch<SetStateAction<Task[]>>
}

export const Header: FC<HeaderProps> = ({ categories, tasks, setTasks }) => {
  return (
    <header className="w-full border-1 border-gray-200 p-4 lg:px-20 flex flex-wrap gap-2 md:gap-4 justify-between">
      <div className="flex flex-wrap gap-2 md:gap-4">
        <AddTaskBtn categories={categories} tasks={tasks} setTasks={setTasks} />
        <AddCategoryBtn />
        <SwitchView />
      </div>
      <div className="flex gap-2 md:gap-4">
        <SortTask />
        <FilterTask />
      </div>
    </header>
  )
}
