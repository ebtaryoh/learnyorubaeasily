'use client'

import { motion } from 'framer-motion'

const VOCABULARY = [
  { yoruba: 'Ẹ káàbọ̀', english: 'Welcome' },
  { yoruba: 'Ẹ káàárọ̀', english: 'Good morning' },
  { yoruba: 'Ẹ ṣé', english: 'Thank you' },
  { yoruba: 'Báwo ni?', english: 'How are you?' },
  { yoruba: 'O dábọ̀', english: 'Goodbye' },
  { yoruba: 'Ìfẹ́', english: 'Love' },
  { yoruba: 'Ọ̀rẹ́', english: 'Friend' },
  { yoruba: 'Inú mi dùn', english: 'I am happy' },
  { yoruba: 'Ilé', english: 'House / Home' },
  { yoruba: 'Ẹ n lẹ', english: 'Hello' },
]

export function VocabularyMarquee() {
  return (
    <div className="relative flex w-full overflow-hidden border-y border-[#19352b] bg-[#19352b] py-6">
      {/* Decorative gradient masks for smooth fade on edges */}
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-[#19352b] to-transparent sm:w-32" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-[#19352b] to-transparent sm:w-32" />
      
      <motion.div
        className="flex w-fit whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 35, // Adjust for speed
        }}
      >
        {/* We duplicate the array to create a seamless loop */}
        {[...VOCABULARY, ...VOCABULARY].map((item, idx) => (
          <div key={idx} className="flex items-center px-6 sm:px-10">
            <span className="font-serif text-2xl font-medium text-[#f8f6f0]">{item.yoruba}</span>
            <span className="mx-4 text-sm font-semibold text-[#EAB308]">—</span>
            <span className="text-sm font-medium tracking-wide text-[#f8f6f0]/70 uppercase">{item.english}</span>
            <span className="ml-12 sm:ml-20 flex size-2 items-center justify-center rounded-full bg-[#f8f6f0]/20" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
