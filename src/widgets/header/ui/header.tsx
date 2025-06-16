'use client'

import { AddCategory } from '@/features/category'
import { AddTask, FilterTask, SortTask } from '@/features/task'
import { SwitchView } from '@/features/task/ui/switchView'
import { Dispatch, FC, SetStateAction } from 'react'

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className="w-full border-1 border-gray-200 p-4 lg:px-20 flex flex-wrap gap-2 md:gap-4 justify-between">
      <div className="flex flex-wrap gap-2 md:gap-4">
        <AddTask />
        <AddCategory />
        <SwitchView />
      </div>
      <div className="flex gap-2 md:gap-4">
        <SortTask />
        <FilterTask />
      </div>
    </header>
  )
}
