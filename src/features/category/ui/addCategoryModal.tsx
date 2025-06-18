'use client'

import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import { Category } from '@/entities/categories'
import { Button } from '@/shared/ui'

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
        <form action="" onSubmit={handleSubmit} className="p-4">
          <p className="text-xl font-bold mb-4">Add New Category</p>
          <div className="mb-4">
            <label
              htmlFor="categoryType"
              className="block text-sm font-medium mb-1">
              Category Name
            </label>
            <input
              type="text"
              id="categoryType"
              value={categoryType}
              onChange={e => {
                setCategoryType(e.target.value)
                setError('')
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category name"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="flex gap-2">
            <Button type="submit" mode="secondary">
              Add Category
            </Button>
            <Button type="button" mode="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </form>
      </dialog>
    )
  }
)

AddCategoryModal.displayName = 'AddCategoryModal'
