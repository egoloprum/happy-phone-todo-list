'use client'

import { Button } from '@/shared/ui'
import { Funnel } from 'lucide-react'
import { FC } from 'react'

interface FilterTaskProps {}

export const FilterTask: FC<FilterTaskProps> = ({}) => {
  return (
    <Button type="button" mode="ghost">
      <Funnel />
      Filter
    </Button>
  )
}
