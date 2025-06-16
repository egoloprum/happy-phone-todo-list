'use client'

import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode: 'primary' | 'secondary' | 'danger' | 'ghost'
  children: ReactNode
  className?: string
}

export const Button: FC<ButtonProps> = ({
  mode,
  children,
  className = '',
  ...rest
}) => {
  const modes = {
    primary: 'bg-green-300 hover:bg-green-400 active:bg-green-500',
    secondary: 'bg-blue-300 hover:bg-blue-400 active:bg-blue-500',
    danger: 'bg-red-300 hover:bg-red-400 active:bg-red-500',
    ghost:
      'bg-white hover:bg-gray-200 active:bg-gray-300 border border-gray-200'
  }

  return (
    <button
      type="button"
      className={`rounded-xl flex min-w-fit gap-2 items-center px-4 py-2 cursor-pointer outline-0 ${modes[mode]} ${className}`}
      {...rest}>
      {children}
    </button>
  )
}
