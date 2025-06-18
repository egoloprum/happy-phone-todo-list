'use client'

import { X } from 'lucide-react'
import { FC } from 'react'

import { Button } from '@/shared/ui'

interface DeleteTaskBtnProps {
  taskId: number
}

export const DeleteTaskBtn: FC<DeleteTaskBtnProps> = ({ taskId }) => {
  return (
    <Button type="button" mode="danger">
      <X />
      Delete
    </Button>
  )
}
