import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Loading from './loading/Loading'
import Star from './stars/Star'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Archery Target',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`relative h-screen w-full flex justify-center overflow-hidden ${inter.className} bg-[#2C2F36]`}
      >
        <Loading />

        <Star count={90} />

        {children}
      </body>
    </html>
  )
}
