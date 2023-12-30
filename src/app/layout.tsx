import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SessionProv from './_components/SessionProv'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'soondong',
  description: 'Welcome to soondong',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProv>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </SessionProv>
  )
}
