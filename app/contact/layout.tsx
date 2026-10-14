import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — LearnYorubaEasily',
  description: 'Get in touch with LearnYorubaEasily. Ask questions, inquire about classes, or reach out via email and WhatsApp.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
