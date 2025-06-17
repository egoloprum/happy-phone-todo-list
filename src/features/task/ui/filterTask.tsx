'use client'

import { Funnel } from 'lucide-react'

import { Button } from '@/shared/ui'

export const FilterTask = ({}) => {
  return (
    <Button type="button" mode="ghost" className="w-full">
      <Funnel />
      Filter
    </Button>
  )
}
