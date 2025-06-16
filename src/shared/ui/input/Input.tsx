'use client'

import { FC, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mode: 'primary' | 'secondary' | 'danger' | 'ghost'
  className?: string
  error?: string
  label?: string
}

export const Input: FC<InputProps> = ({
  mode,
  className,
  error,
  label,
  id,
  ...rest
}) => {
  const modes = {
    primary: 'focus:ring-green-500',
    secondary: 'focus:ring-blue-500',
    danger: 'focus:ring-red-500',
    ghost: 'focus:ring-gray-500'
  }
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${modes[mode]} ${className}`}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
