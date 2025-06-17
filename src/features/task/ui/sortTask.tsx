'use client'

import { ArrowUpDown } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useRef, useState } from 'react'

import { Button } from '@/shared/ui'

export const SortTask = () => {
  const [toggle, setToggle] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setToggle(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSort = (sortType: 'date' | 'alphabet' | 'status') => {
    const params = new URLSearchParams(searchParams.toString())

    if (params.get('sort') === sortType) {
      params.delete('sort')
    } else {
      params.set('sort', sortType)
    }

    router.push(`${pathname}?${params.toString()}`)
    setToggle(false)
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="relative w-full" ref={dropdownRef}>
        <Button
          ref={buttonRef}
          type="button"
          mode="ghost"
          onClick={() => setToggle(!toggle)}
          className="h-full w-full"
          aria-expanded={toggle}>
          <ArrowUpDown />
          <span className="ml-2">Sorting</span>
        </Button>

        {toggle && (
          <div className="border border-gray-200 mt-2 absolute left-0 rounded-xl gap-2 p-1 bg-white z-10 shadow-lg min-w-[140px]">
            <button
              className="text-nowrap text-start hover:bg-gray-100 px-4 py-2 rounded-md cursor-pointer w-full text-sm"
              onClick={() => handleSort('date')}>
              By Date
            </button>
            <button
              className="text-nowrap text-start hover:bg-gray-100 px-4 py-2 rounded-md cursor-pointer w-full text-sm"
              onClick={() => handleSort('alphabet')}>
              By Alphabet
            </button>
            <button
              className="text-nowrap text-start hover:bg-gray-100 px-4 py-2 rounded-md cursor-pointer w-full text-sm"
              onClick={() => handleSort('status')}>
              By Status
            </button>
          </div>
        )}
      </div>
    </Suspense>
  )
}
