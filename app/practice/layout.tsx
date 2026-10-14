import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Practice — LearnYorubaEasily',
  description: 'Practice your Yorùbá with interactive flashcards. Learn greetings, everyday words, numbers, family terms, and more.',
}

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
