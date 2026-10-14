import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — LearnYorubaEasily',
  description: 'Terms and conditions governing the use of LearnYorubaEasily classes, payments, cancellations, and student conduct.',
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
