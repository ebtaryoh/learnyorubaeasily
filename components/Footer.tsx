'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()
  
  if (pathname === '/register') return null

  return (
    <footer className="border-t border-[#19352b]/10 px-5 py-10 lg:px-8">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-xl">LearnYoruba<span className="text-[#bd674b]">Easily</span></p>
          <p className="mt-2 text-xs text-[#19352b]/50">Learn Yorùbá. Speak it. Live it.</p>
        </div>
        <div className="flex gap-6 text-sm text-[#19352b]/60">
          <Link href="/classes">Classes</Link>
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <p className="text-xs text-[#19352b]/45">© 2026 LearnYorubaEasily</p>
      </div>
    </footer>
  )
}
