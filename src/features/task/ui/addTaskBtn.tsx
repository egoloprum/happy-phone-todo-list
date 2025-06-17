'use client'

import { Plus } from 'lucide-react'
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'
import { createPortal } from 'react-dom'

import { Category } from '@/entities/categories'
import { Task } from '@/entities/task'
import { Button } from '@/shared/ui'

import { AddTaskModal } from './addTaskModal'

interface AddTaskBtnProps {
  categories: Category[]
  setTasks: Dispatch<SetStateAction<Task[]>>
}

export const AddTaskBtn: FC<AddTaskBtnProps> = ({ categories, setTasks }) => {
  const dialogRef = useRef<{ showModal: () => void; close: () => void } | null>(
    null
  )
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => setIsClient(true), [])

  const openDialog = () => dialogRef.current?.showModal()
  const closeDialog = () => dialogRef.current?.close()

  const handleAddTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask])
  }

  return (
    <>
      <Button type="button" mode="primary" onClick={openDialog}>
        <Plus />
        Add new
      </Button>

      {isClient &&
        createPortal(
          <AddTaskModal
            onClose={closeDialog}
            ref={dialogRef}
            categories={categories}
            onAddTask={handleAddTask}
          />,
          document.body
        )}
    </>
  )
}
