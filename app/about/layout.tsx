import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — LearnYorubaEasily',
  description: 'Our story, philosophy, and mission — bridging generations, cultures, and continents through the beauty of the Yorùbá language.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
