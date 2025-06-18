'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'

import { Task } from '@/entities/task'
import { Button } from '@/shared/ui'

interface DeleteCategoryProps {
  onClose?: () => void
  taskId: number
  onDelete: () => void
}

type DeleteCategoryRef = {
  showModal: () => void
  close: () => void
}

export const DeleteTaskModal = forwardRef<
  DeleteCategoryRef,
  DeleteCategoryProps
>(({ onClose = () => {}, taskId, onDelete }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useImperativeHandle(ref, () => ({
    showModal: () => {
      dialogRef.current?.classList.remove('closing')
      dialogRef.current?.classList.add('opening')
      dialogRef.current?.showModal()
    },
    close: () => {
      dialogRef.current?.classList.remove('opening')
      dialogRef.current?.classList.add('closing')
      setTimeout(() => {
        dialogRef.current?.close()
        dialogRef.current?.classList.remove('closing')
      }, 500)
    }
  }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const storedTasks = localStorage.getItem('tasks')
    const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : []

    const updatedTasks = tasks.filter(task => task.id !== taskId)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))

    onDelete()
    onClose()
  }

  return (
    <dialog
      className="w-[95%] max-w-[500px] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] outline-0 border-0 rounded-xl"
      ref={dialogRef}
      onClick={e => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
      onCancel={e => {
        e.preventDefault()
        onClose()
      }}>
      <form action="" onSubmit={handleSubmit} className="p-4">
        <p className="text-xl font-bold mb-4">Delete Task</p>
        <div className="mb-4">
          <p className="">
            Are you sure you want to delete this task?
            <br />
            You can not retrieve it after this action.
          </p>
        </div>
        <div className="flex gap-2">
          <Button type="submit" mode="danger">
            Continue
          </Button>
          <Button type="button" mode="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
    </dialog>
  )
})

DeleteTaskModal.displayName = 'DeleteTaskModal'
