'use client'

import { FC, SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  mode: 'primary' | 'secondary' | 'danger' | 'ghost'
  className?: string
  label?: string
  error?: string
  placeholder?: string
  options: string[]
}

export const Select: FC<SelectProps> = ({
  mode,
  className,
  label,
  error,
  options,
  id,
  placeholder,
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
      <select
        id={id}
        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${modes[mode]} ${className}`}
        {...rest}>
        <option value="" className="text-gray-500" disabled>
          -- {placeholder} --
        </option>
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
