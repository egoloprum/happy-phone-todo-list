'use client'

import { SquareKanban, TableProperties } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/shared/ui'

export const SwitchView = ({}) => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <>
      <Button
        mode="ghost"
        onClick={() => router.push(`${pathname}?view=table`)}>
        <TableProperties />
        Table view
      </Button>
      <Button
        mode="ghost"
        onClick={() => router.push(`${pathname}?view=kanban`)}>
        <SquareKanban />
        Kanban board
      </Button>
    </>
  )
}
