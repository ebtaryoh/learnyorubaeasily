'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center">
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex flex-col items-center justify-center gap-6"
      >
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#19352b] text-sm font-semibold text-[#f8f6f0]">LY</span>
          <span className="font-serif text-[19px] tracking-[-0.03em]">LearnYoruba<span className="text-[#bd674b]">Easily</span></span>
        </div>
        <div className="relative flex size-12 items-center justify-center rounded-full border-4 border-[#19352b]/10">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-1 rounded-full border-4 border-transparent border-t-[#bd674b]"
          />
          <div className="size-1.5 rounded-full bg-[#19352b]" />
        </div>
      </motion.div>
    </div>
  )
}
