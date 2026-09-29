'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RotateCcw } from 'lucide-react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-w-md flex-col items-center"
      >
        <div className="mb-8 flex size-24 items-center justify-center rounded-full bg-[#f2e5d8]">
          <AlertTriangle className="size-10 text-[#bd674b]" strokeWidth={1.5} />
        </div>
        
        <h1 className="font-serif text-3xl font-medium tracking-tight text-[#19352b] sm:text-4xl">
          Something went wrong!
        </h1>
        
        <p className="mt-4 text-lg text-[#19352b]/70">
          We apologize, but an unexpected error occurred while loading this page.
        </p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-10"
        >
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-full bg-[#19352b] px-6 py-4 text-sm font-semibold text-[#f8f6f0] transition-transform hover:-translate-y-1"
          >
            <RotateCcw className="size-4" />
            Try again
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
