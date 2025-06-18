'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'

import { Category } from '@/entities/categories'
import { Task } from '@/entities/task'
import { Button } from '@/shared/ui'

interface DeleteCategoryProps {
  onClose?: () => void
  category: Category
  onDelete: (deletedCategory: Category) => void
}

type DeleteCategoryRef = {
  showModal: () => void
  close: () => void
}

export const DeleteCategoryModal = forwardRef<
  DeleteCategoryRef,
  DeleteCategoryProps
>(({ onClose = () => {}, category, onDelete }, ref) => {
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

    const storedCategories = localStorage.getItem('categories')
    const categories: Category[] = storedCategories
      ? JSON.parse(storedCategories)
      : []

    const categoryToDelete = categories.find(c => c.id === category.id)
    if (!categoryToDelete) return

    const storedTasks = localStorage.getItem('tasks')
    const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : []

    const updatedCategories = categories.filter(c => c.id !== category.id)
    const updatedTasks = tasks.filter(t => t.category !== categoryToDelete.type)

    localStorage.setItem('categories', JSON.stringify(updatedCategories))
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))

    onDelete(categoryToDelete)

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
        <p className="text-xl font-bold mb-4">Delete Category</p>
        <div className="mb-4">
          <p className="">
            Are you sure you want to delete this category ({category.type})?
            <br />
            This will also delete all tasks in this category.
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

DeleteCategoryModal.displayName = 'DeleteCategoryModal'
