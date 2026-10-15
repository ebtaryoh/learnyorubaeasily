'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()
  
  if (pathname === '/register') return null

  return (
    <footer className="border-t border-[#19352b]/10 px-5 py-10 lg:px-8">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Image src="/logo.jpg" alt="LearnYorubaEasily Logo" width={180} height={180} className="h-10 w-auto object-contain" />
          <p className="mt-4 text-xs text-[#19352b]/50">Learn Yorùbá. Speak it. Live it.</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex gap-6 text-sm text-[#19352b]/60">
            <Link href="/classes">Classes</Link>
            <Link href="/practice">Practice</Link>
            <Link href="/shop">Store</Link>
            <Link href="/about">About</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="flex gap-6 text-sm text-[#19352b]/40">
            <Link href="/privacy" className="hover:text-[#19352b]/60 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#19352b]/60 transition-colors">Terms</Link>
          </div>
        </div>
        <p className="text-xs text-[#19352b]/45">© {new Date().getFullYear()} LearnYorubaEasily</p>
      </div>
    </footer>
  )
}
