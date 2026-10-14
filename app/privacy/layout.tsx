import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — LearnYorubaEasily',
  description: 'How LearnYorubaEasily collects, uses, and protects your personal data when you register for our Yorùbá classes.',
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
