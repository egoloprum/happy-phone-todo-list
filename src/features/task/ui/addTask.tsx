'use client'

import { Button } from '@/shared/ui'
import { Plus } from 'lucide-react'
import { FC } from 'react'

interface AddTaskProps {}

export const AddTask: FC<AddTaskProps> = ({}) => {
  return (
    <Button type="button" mode="primary">
      <Plus />
      Add new
    </Button>
  )
}
