'use client'

import { Pencil } from 'lucide-react'
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

import { EditTaskModal } from './editTaskModal'

interface EditTaskBtnProps {
  task: Task
  setTask: Dispatch<SetStateAction<Task | null>>
  categories: Category[]
}

export const EditTaskBtn: FC<EditTaskBtnProps> = ({
  task,
  setTask,
  categories
}) => {
  const dialogRef = useRef<{ showModal: () => void; close: () => void } | null>(
    null
  )
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => setIsClient(true), [])

  const openDialog = () => dialogRef.current?.showModal()
  const closeDialog = () => dialogRef.current?.close()

  const handleEditTask = (updatedTask: Task) => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      const tasks: Task[] = JSON.parse(storedTasks)
      const updatedTasks = tasks.map(t =>
        t.id === updatedTask.id ? updatedTask : t
      )
      localStorage.setItem('tasks', JSON.stringify(updatedTasks))

      setTask(updatedTask)
    }
  }

  return (
    <>
      <Button type="button" mode="secondary" onClick={openDialog}>
        <Pencil />
        Edit
      </Button>
      {isClient &&
        createPortal(
          <EditTaskModal
            onClose={closeDialog}
            ref={dialogRef}
            categories={categories}
            task={task}
            onEditTask={handleEditTask}
          />,
          document.body
        )}
    </>
  )
}
