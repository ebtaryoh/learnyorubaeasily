import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
export const metadata: Metadata = {
  metadataBase: new URL('https://learnyorubaeasily.com'), // Replace with your actual domain when you have one
  title: 'LearnYorubaEasily — Learn Yorùbá with confidence',
  description: 'Practical, engaging Yorùbá classes for adults, children, families, and learners around the world. Reconnect with your heritage.',
  keywords: ['Yoruba', 'learn Yoruba', 'Yoruba language', 'Yoruba classes online', 'speak Yoruba', 'Yoruba for kids', 'Yoruba tutor'],
  openGraph: {
    title: 'LearnYorubaEasily — Learn Yorùbá with confidence',
    description: 'Practical, engaging Yorùbá classes for adults, children, families, and learners around the world.',
    type: 'website',
    siteName: 'LearnYorubaEasily',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LearnYorubaEasily — Learn Yorùbá with confidence',
    description: 'Practical, engaging Yorùbá classes for adults, children, families, and learners around the world.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#f8f6f0] text-[#19352b] flex flex-col">
        <Header />
        <main className="flex-1 pt-[76px]">
          {children}
        </main>
        <WhatsAppButton />
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
