import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register — LearnYorubaEasily',
  description: 'Register for Yorùbá language classes. Choose your program, tell us about your goals, and begin your learning journey.',
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
