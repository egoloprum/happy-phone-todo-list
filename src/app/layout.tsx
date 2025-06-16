import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const groteskSans = Space_Grotesk({
  weight: '500',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'To-do list',
  description: 'Happy phone test task'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${groteskSans.className} antialiased min-v-[100h]`}>
        {children}
      </body>
    </html>
  )
}
