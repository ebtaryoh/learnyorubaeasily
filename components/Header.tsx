'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Classes', href: '/classes' },
    { name: 'Practice', href: '/practice' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
  ]

  if (pathname === '/register') return null

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'border-b border-[#19352b]/10 bg-[#f8f6f0]/80 shadow-sm backdrop-blur-lg' : 'bg-[#f8f6f0]/90 backdrop-blur-md'}`}>
      <div className={`mx-auto flex max-w-[1240px] items-center justify-between px-5 lg:px-8 transition-all duration-500 ${scrolled ? 'h-[64px]' : 'h-[76px]'}`}>
        <Link href="/" className="group flex items-center gap-3" aria-label="LearnYorubaEasily home">
          <Image src="/logo.jpg" alt="LearnYorubaEasily Logo" width={180} height={180} className="h-12 w-auto object-contain" priority />
        </Link>
        
        <nav className="hidden items-center gap-8 text-sm font-medium lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`transition-colors hover:text-[#EAB308] ${pathname === item.href ? 'text-[#EAB308]' : ''}`}
            >
              {item.name}
            </Link>
          ))}
          <Link href="/register" className="rounded-full bg-[#19352b] px-5 py-3 text-[#f8f6f0] transition-transform hover:-translate-y-0.5">
            Register now <ArrowUpRight className="ml-1 inline size-4" />
          </Link>
        </nav>
        
        <button className="rounded-full p-2 lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {mobileOpen && (
        <nav className="flex flex-col gap-5 border-t border-[#19352b]/10 bg-[#f8f6f0] px-5 py-6 lg:hidden">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setMobileOpen(false)} 
              className={`text-lg ${pathname === item.href ? 'text-[#EAB308] font-medium' : ''}`}
            >
              {item.name}
            </Link>
          ))}
          <Link href="/register" onClick={() => setMobileOpen(false)} className="rounded-full bg-[#19352b] px-5 py-3 text-center text-[#f8f6f0]">
            Register now
          </Link>
        </nav>
      )}
    </header>
  )
}
