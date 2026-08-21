import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ThemeScript } from '@/components/theme-script'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'MoneyTrack',
    template: '%s · MoneyTrack',
  },
  description:
    "See exactly where the extra money went, and what it's costing you.",
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0B0C0E' },
    { media: '(prefers-color-scheme: light)', color: '#FAFAFA' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-dvh bg-canvas text-content">{children}</body>
    </html>
  )
}
