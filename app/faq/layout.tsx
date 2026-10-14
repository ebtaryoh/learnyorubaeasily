import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ — LearnYorubaEasily',
  description: 'Frequently asked questions about our Yorùbá classes, registration process, pricing, and online learning format.',
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
