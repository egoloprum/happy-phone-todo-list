'use client'

import { Button } from '@/shared/ui'
import { SquarePlus } from 'lucide-react'
import { FC, useEffect, useRef, useState } from 'react'
import { AddCategoryModal } from './addCategoryModal'
import { createPortal } from 'react-dom'

interface AddCategoryBtnProps {}

export const AddCategoryBtn: FC<AddCategoryBtnProps> = ({}) => {
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
