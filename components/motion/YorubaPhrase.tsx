'use client'

import { motion } from 'framer-motion'
import { EASING, DURATION } from '@/lib/animations'

interface YorubaPhraseProps {
  yoruba: string;
  english: string;
  className?: string;
}

export function YorubaPhrase({ yoruba, english, className = '' }: YorubaPhraseProps) {
  return (
    <motion.div 
      className={`group relative inline-flex flex-col items-center justify-center ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.span 
        className="font-serif text-2xl font-medium text-[#f8f6f0]"
        variants={{
          hidden: { opacity: 0, y: 15 },
          visible: { opacity: 1, y: 0, transition: { duration: DURATION.large, ease: EASING.standard } }
        }}
      >
        “{yoruba}”
      </motion.span>
      <motion.span 
        className="mt-1 text-sm text-[#EAB308] font-semibold tracking-wide"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 0.6, duration: DURATION.medium, ease: EASING.smooth } }
        }}
      >
        {english}
      </motion.span>
    </motion.div>
  )
}
