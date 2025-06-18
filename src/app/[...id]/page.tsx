'use client'

import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/shared/ui'

const Page = ({}) => {
  const router = useRouter()

  return (
    <main className="min-h-[100vh] p-4 flex justify-center">
      <div className="p-4 border rounded-xl border-gray-200 w-[500px] h-fit">
        <h1 className="text-2xl">Error 404</h1>
        <p className="mb-4">This page does not exist. Go back to main page.</p>
        <Button
          mode="ghost"
          className="ml-auto"
          onClick={() => router.push('/')}>
          <MoveLeft />
          <span>Return</span>
        </Button>
      </div>
    </main>
  )
}

export default Page
