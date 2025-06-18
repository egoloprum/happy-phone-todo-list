'use client'

import { Dispatch, FC, SetStateAction } from 'react'

import { Category } from '@/entities/categories'
import { Task } from '@/entities/task'
import { AddCategoryBtn } from '@/features/category'
import { MenuBtn } from '@/features/menu'
import { AddTaskBtn, FilterTaskBtn, SortTask } from '@/features/task'
import { SwitchView } from '@/features/task/ui/switchView'

interface HeaderProps {
  categories: Category[]
  setTasks: Dispatch<SetStateAction<Task[]>>
  setCategories: Dispatch<SetStateAction<Category[]>>
}

export const Header: FC<HeaderProps> = ({
  categories,
  setTasks,
  setCategories
}) => {
  return (
    <>
      <header className="w-full border-1 border-gray-200 p-4 lg:px-20 hidden md:flex flex-wrap gap-2 md:gap-4 justify-between">
        <div className="flex flex-wrap gap-2 md:gap-4">
          <AddTaskBtn categories={categories} setTasks={setTasks} />
          <AddCategoryBtn setCategories={setCategories} />
          <SwitchView />
        </div>
        <div className="flex gap-2 md:gap-4">
          <SortTask />
          <FilterTaskBtn categories={categories} />
        </div>
      </header>
      <header>
        <div className="w-full border-1 border-gray-200 p-4 flex md:hidden gap-2 md:gap-4 text-sm">
          <AddTaskBtn categories={categories} setTasks={setTasks} />
          <AddCategoryBtn setCategories={setCategories} />
          <MenuBtn>
            <SwitchView />
            <SortTask />
            <FilterTaskBtn categories={categories} />
          </MenuBtn>
        </div>
      </header>
    </>
  )
}
