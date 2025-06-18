'use client'

import { SquarePlus } from 'lucide-react'
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
import { Button } from '@/shared/ui'

import { AddCategoryModal } from './addCategoryModal'

interface AddCategoryProps {
  setCategories: Dispatch<SetStateAction<Category[]>>
}

export const AddCategoryBtn: FC<AddCategoryProps> = ({ setCategories }) => {
  const dialogRef = useRef<{ showModal: () => void; close: () => void } | null>(
    null
  )
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => setIsClient(true), [])

  const openDialog = () => dialogRef.current?.showModal()
  const closeDialog = () => dialogRef.current?.close()

  const handleAddCategory = (newCategory: Category) => {
    setCategories(prevCategories => [...prevCategories, newCategory])
  }

  return (
    <>
      <Button type="button" mode="secondary" onClick={openDialog}>
        <SquarePlus />
        Add category
      </Button>

      {isClient &&
        createPortal(
          <AddCategoryModal
            onClose={closeDialog}
            ref={dialogRef}
            onAddCategory={handleAddCategory}
          />,
          document.body
        )}
    </>
  )
}
