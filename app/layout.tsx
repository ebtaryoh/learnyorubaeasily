import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
export const metadata: Metadata = {
  metadataBase: new URL('https://learnyorubaeasily.com'),
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
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-[#19352b] focus:px-6 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#f8f6f0] focus:shadow-lg">Skip to content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'LearnYorubaEasily',
              url: 'https://learnyorubaeasily.com',
              logo: 'https://learnyorubaeasily.com/logo.jpg',
              description: 'Practical, engaging Yorùbá classes for adults, children, families, and learners around the world.',
              sameAs: ['https://chat.whatsapp.com/BaZKdym3lFzC4Genqg43Rh'],
              offers: [
                { '@type': 'Offer', category: 'Adult Yorùbá Classes' },
                { '@type': 'Offer', category: "Children's Yorùbá Curriculum" },
                { '@type': 'Offer', category: 'Private 1-on-1 Lessons' },
              ],
            }),
          }}
        />
        <Header />
        <main id="main-content" className="flex-1 pt-[76px]">
          {children}
        </main>
        <WhatsAppButton />
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
