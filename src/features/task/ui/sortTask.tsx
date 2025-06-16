'use client'

import { Button } from '@/shared/ui'
import { ArrowUpDown } from 'lucide-react'
import { FC } from 'react'

interface SortTaskProps {}

export const SortTask: FC<SortTaskProps> = ({}) => {
  return (
    <Button type="button" mode="ghost">
      <ArrowUpDown />
      Sorting
    </Button>
  )
}
