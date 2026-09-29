'use client'

import { motion } from 'framer-motion'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'

export function ProverbCard() {
  return (
    <section className="relative overflow-hidden bg-[#19352b] px-5 py-24 text-[#f8f6f0] lg:px-8 border-y border-[#19352b]">
      {/* Subtle background pattern (Adire/Batik inspired dot matrix) */}
      <div 
        className="absolute inset-0 opacity-[0.04]" 
        style={{
          backgroundImage: 'radial-gradient(#EAB308 2.5px, transparent 2.5px), radial-gradient(#EAB308 2.5px, transparent 2.5px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}
      />
      
      <motion.div 
        className="relative mx-auto max-w-[800px] text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.p variants={fadeUpVariants} className="eyebrow mx-auto justify-center text-[#EAB308] mb-8">
          Òwe Yorùbá — Proverb of the Day
        </motion.p>
        
        <motion.h2 
          variants={fadeUpVariants} 
          className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.15] tracking-tight"
        >
          “Ilé ọba t'ó jó,<br />
          <em className="font-light text-[#EAB308] block mt-2">ẹwà ló bù kún.”</em>
        </motion.h2>

        <motion.div 
          variants={fadeUpVariants}
          className="mt-12 flex flex-col items-center justify-center space-y-6"
        >
          <p className="text-lg md:text-xl font-medium text-[#f8f6f0]/90">
            "The king's palace that burned down only added to its beauty."
          </p>
          <div className="h-px w-16 bg-[#EAB308]/50" />
          <p className="max-w-[550px] text-sm md:text-base leading-relaxed text-[#f8f6f0]/70">
            Meaning: Out of every setback or challenge, something even more beautiful can be built. In our classes, we embrace mistakes as the foundation of fluency.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
