'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Map } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-w-md flex-col items-center"
      >
        <div className="mb-8 flex size-24 items-center justify-center rounded-full bg-[#e6eee5]">
          <Map className="size-10 text-[#19352b]" strokeWidth={1.5} />
        </div>
        
        <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-tight text-[#19352b]">
          404
        </h1>
        
        <h2 className="mt-4 font-serif text-2xl text-[#EAB308]">
          Àkíyèsí! (Notice!)
        </h2>
        
        <p className="mt-4 text-lg text-[#19352b]/70">
          We can't seem to find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10"
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 rounded-full bg-[#19352b] px-6 py-4 text-sm font-semibold text-[#f8f6f0] transition-transform hover:-translate-y-1"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
