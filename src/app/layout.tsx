import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// Load Inter with ALL weights used in the Figma design
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Hospital Meal System',
  description: 'Hospital meal management dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
      </body>
    </html>
  )
}
