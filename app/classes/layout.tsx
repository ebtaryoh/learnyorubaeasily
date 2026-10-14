import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Classes — LearnYorubaEasily',
  description: 'Explore our Yorùbá language programs: adult classes, children\'s curriculum, private lessons, conversational practice, cultural immersion, and family packages.',
}

export default function ClassesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
