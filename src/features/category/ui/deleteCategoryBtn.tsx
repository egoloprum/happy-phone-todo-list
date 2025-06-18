'use client'

import { X } from 'lucide-react'
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

import { DeleteCategoryModal } from './deleteCategoryModal'

interface DeleteCategoryBtnProps {
  className?: string
  category: Category
  setTasks: Dispatch<SetStateAction<Task[]>>
  setCategories: Dispatch<SetStateAction<Category[]>>
}

export const DeleteCategoryBtn: FC<DeleteCategoryBtnProps> = ({
  className,
  category,
  setTasks,
  setCategories
}) => {
  const dialogRef = useRef<{ showModal: () => void; close: () => void } | null>(
    null
  )
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => setIsClient(true), [])

  const openDialog = () => dialogRef.current?.showModal()
  const closeDialog = () => dialogRef.current?.close()

  const handleDeleteCategory = (deletedCategory: Category) => {
    setCategories(prev => prev.filter(c => c.id !== deletedCategory.id))
    setTasks(prev => prev.filter(t => t.category !== deletedCategory.type))
  }

  return (
    <>
      <button
        type="button"
        className={`w-10 h-10 rounded-xl flex min-w-fit gap-2 items-center p-2 cursor-pointer outline-0 bg-white hover:bg-gray-200 active:bg-gray-300 border border-gray-200 ${className}`}
        onClick={openDialog}>
        <X />
      </button>
      {isClient &&
        createPortal(
          <DeleteCategoryModal
            onClose={closeDialog}
            ref={dialogRef}
            category={category}
            onDelete={handleDeleteCategory}
          />,
          document.body
        )}
    </>
  )
}
