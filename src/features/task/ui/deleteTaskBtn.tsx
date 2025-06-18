'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Button } from '@/shared/ui'

import { DeleteTaskModal } from './deleteTaskModal'

interface DeleteTaskBtnProps {
  taskId: number
}

export const DeleteTaskBtn: FC<DeleteTaskBtnProps> = ({ taskId }) => {
  const dialogRef = useRef<{ showModal: () => void; close: () => void } | null>(
    null
  )
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => setIsClient(true), [])

  const openDialog = () => dialogRef.current?.showModal()
  const closeDialog = () => dialogRef.current?.close()

  const router = useRouter()

  const handleDeleteTask = () => {
    router.push('/')
  }

  return (
    <>
      <Button type="button" mode="danger" onClick={openDialog}>
        <X />
        <span>Delete</span>
      </Button>
      {isClient &&
        createPortal(
          <DeleteTaskModal
            onClose={closeDialog}
            ref={dialogRef}
            taskId={taskId}
            onDelete={handleDeleteTask}
          />,
          document.body
        )}
    </>
  )
}
