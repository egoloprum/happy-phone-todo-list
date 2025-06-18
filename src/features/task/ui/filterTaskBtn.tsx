'use client'

import { Funnel } from 'lucide-react'
import { FC, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Category } from '@/entities/categories'
import { Button } from '@/shared/ui'

import { FilterTaskModal } from './filterTaskModal'

interface FilterTaskBtnProps {
  categories: Category[]
}

export const FilterTaskBtn: FC<FilterTaskBtnProps> = ({ categories }) => {
  const dialogRef = useRef<{ showModal: () => void; close: () => void } | null>(
    null
  )
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => setIsClient(true), [])

  const openDialog = () => dialogRef.current?.showModal()
  const closeDialog = () => dialogRef.current?.close()

  return (
    <>
      <Button
        type="button"
        mode="ghost"
        className="w-full"
        onClick={openDialog}>
        <Funnel />
        <span>Filter</span>
      </Button>
      {isClient &&
        createPortal(
          <FilterTaskModal
            onClose={closeDialog}
            ref={dialogRef}
            categories={categories}
          />,
          document.body
        )}
    </>
  )
}
