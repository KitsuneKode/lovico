import '@lovico/ui/globals.css'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { Providers } from '@/components/providers'

export const metadata = {
  title: 'Lovico - Build Websites with AI',
  description: 'Create stunning websites in seconds with the power of AI',
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal?: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className={`font-sans antialiased`}>
        <Providers>
          {children}
          {modal}
        </Providers>
      </body>
    </html>
  )
}
