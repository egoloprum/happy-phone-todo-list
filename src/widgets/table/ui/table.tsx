'use client'

import Link from 'next/link'
import { FC } from 'react'

import { Task } from '@/entities/task'

interface TableProps {
  tasks: Task[]
}

export const Table: FC<TableProps> = ({ tasks }) => {
  return (
    <div className="px-4 lg:px-20 py-4 pb-24">
      <table className="border-x-1 border-gray-200 w-full">
        <thead>
          <tr className="border-1 border-gray-200 text-sm md:text-base">
            <th className="p-2 md:p-4 text-start">Content</th>
            <th className="p-2 md:p-4 text-start">Status</th>
            <th className="p-2 md:p-4 text-start">Category</th>
            <th className="p-2 md:p-4 text-start">Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: Task, index) => (
            <tr
              key={index}
              className="border-b-1 border-gray-200 text-sm md:text-base">
              <td className="p-2 md:p-4">
                <Link href={`/task/${task.id}`} className="hover:underline">
                  {task.content}
                </Link>
              </td>
              <td className="p-2 md:p-4">{task.status}</td>
              <td className="p-2 md:p-4">{task.category}</td>
              <td className="p-2 md:p-4">{task.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
