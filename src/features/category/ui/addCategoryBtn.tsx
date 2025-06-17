'use client'

import { SquarePlus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Button } from '@/shared/ui'

import { AddCategoryModal } from './addCategoryModal'

export const AddCategoryBtn = ({}) => {
  const dialogRef = useRef<{ showModal: () => void; close: () => void } | null>(
    null
  )
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => setIsClient(true), [])

  const openDialog = () => dialogRef.current?.showModal()
  const closeDialog = () => dialogRef.current?.close()

  return (
    <>
      <Button type="button" mode="secondary" onClick={openDialog}>
        <SquarePlus />
        Add category
      </Button>

      {isClient &&
        createPortal(
          <AddCategoryModal onClose={closeDialog} ref={dialogRef} />,
          document.body
        )}
    </>
  )
}
