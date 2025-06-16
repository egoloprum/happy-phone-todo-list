'use client'

import { SquareKanban, TableProperties } from 'lucide-react'
import { Dispatch, FC, SetStateAction } from 'react'
import { Button } from '@/shared/ui'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface SwitchViewProps {}

export const SwitchView: FC<SwitchViewProps> = ({}) => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
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
    </div>
  )
}
