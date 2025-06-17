'use client'

import { Menu } from 'lucide-react'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'

interface MenuBtnProps {
  children: ReactNode
}

export const MenuBtn: FC<MenuBtnProps> = ({ children }) => {
  const [toggle, setToggle] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

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

  return (
    <div className="ml-auto relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setToggle(!toggle)}
        aria-expanded={toggle}
        aria-label="Menu"
        className="rounded-xl flex min-w-fit gap-2 items-center p-2 cursor-pointer outline-0 bg-white hover:bg-gray-200 active:bg-gray-300 border border-gray-200">
        <Menu />
      </button>
      {toggle && (
        <div
          ref={dropdownRef}
          className="border border-gray-200 mt-2 absolute right-0 rounded-xl p-1 bg-white z-10 shadow-lg min-w-[340px] grid grid-cols-2 gap-2">
          {children}
        </div>
      )}
    </div>
  )
}
