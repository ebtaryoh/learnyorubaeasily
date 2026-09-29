'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

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
          <Image src="/logo.jpg" alt="Loading LearnYorubaEasily" width={150} height={150} className="h-10 w-auto object-contain opacity-50 grayscale" />
        </div>
        <div className="relative flex size-12 items-center justify-center rounded-full border-4 border-[#19352b]/10">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-1 rounded-full border-4 border-transparent border-t-[#EAB308]"
          />
          <div className="size-1.5 rounded-full bg-[#19352b]" />
        </div>
      </motion.div>
    </div>
  )
}
