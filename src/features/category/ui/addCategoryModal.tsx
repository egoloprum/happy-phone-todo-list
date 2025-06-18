'use client'

import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import { Category } from '@/entities/categories'
import { Button, Input } from '@/shared/ui'

interface AddCategoryProps {
  onClose?: () => void
  onAddCategory: (newCategory: Category) => void
}

type AddCategoryRef = {
  showModal: () => void
  close: () => void
}

export const AddCategoryModal = forwardRef<AddCategoryRef, AddCategoryProps>(
  ({ onClose = () => {}, onAddCategory }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [categoryType, setCategoryType] = useState<string>('')
    const [error, setError] = useState<string>('')

    useImperativeHandle(ref, () => ({
      showModal: () => {
        setCategoryType('')
        setError('')
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

      if (!categoryType.trim()) {
        setError('Category name is required')
        return
      }

      const storedCategories = localStorage.getItem('categories')
      const existingCategories: Category[] = storedCategories
        ? JSON.parse(storedCategories)
        : []
      const newId =
        existingCategories.length > 0
          ? Math.max(...existingCategories.map(category => category.id)) + 1
          : 1

      const newCategory: Category = {
        id: newId,
        type: categoryType.charAt(0).toUpperCase() + categoryType.slice(1)
      }

      onAddCategory(newCategory)
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
        <form action="" onSubmit={handleSubmit} className="p-6">
          <p className="text-xl font-bold mb-6">Add New Category</p>
          <div className="space-y-4 mb-6">
            <Input
              type="text"
              id="taskDate"
              mode="secondary"
              label="Category Name"
              placeholder="Enter category name"
              value={categoryType}
              onChange={e => {
                setCategoryType(e.target.value)
                setError('')
              }}
              error={error}
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="button" mode="ghost" onClick={onClose}>
              Close
            </Button>
            <Button type="submit" mode="secondary">
              Continue
            </Button>
          </div>
        </form>
      </dialog>
    )
  }
)

AddCategoryModal.displayName = 'AddCategoryModal'
