import './globals.css'
import type { Metadata } from 'next'
import NextAuthSession from '@/components/providers/session'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/providers/theme'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevChats',
  description: 'A Place where devs units',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSession >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
          <Toaster />
        </NextAuthSession>
      </body>
    </html>
  )
}
