import './globals.css'
import type { Metadata } from 'next'
import NextAuthSession from '@/components/providers/session'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/providers/theme'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import SideBar from '@/components/layouts/sideBar'
import SingInBanner from '@/components/auth/singInBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevChats',
  description: 'A Place where devs units',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSession >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className="flex h-screen">
              {session?.user.id
                ? <SideBar />
                : <SingInBanner />
              }
              <aside className='max-h-screen w-full'>
                {children}
              </aside>
            </main>
          </ThemeProvider>
          <Toaster />
        </NextAuthSession>
      </body>
    </html>
  )
}
