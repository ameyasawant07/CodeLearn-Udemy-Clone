import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CodeLearn - Learn & Practice Coding',
  description: 'The ultimate platform for learning coding through courses and practicing with coding problems',
}

import { ThemeProvider } from '@/components/ThemeProvider'
import { AiBot } from '@/components/AiBot'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-[url('/global-bg.png')] bg-cover bg-center bg-fixed">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Top right theme toggle for global access if no navbar exists yet, or just to ensure it's there per requirements */}
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          {children}
          <AiBot />
        </ThemeProvider>
      </body>
    </html>
  )
}

