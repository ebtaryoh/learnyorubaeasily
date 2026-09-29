'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'

const faqs = [
  ['Do I need previous Yorùbá knowledge?', 'Not at all. Our classes welcome complete beginners and meet you exactly where you are.'],
  ['Are the classes online?', 'Yes. Learn from wherever you are in the world through warm, live online sessions.'],
  ['Can people outside Nigeria join?', 'Absolutely. Our learning community spans families and curious learners across the diaspora.'],
  ['What happens after registration?', 'We will learn a little about your goals, recommend the right starting point, and share the next steps.'],
  ['Do you offer one-on-one sessions?', 'Yes! We offer private lessons tailored to your individual pace, schedule, and learning goals.'],
  ['Are the children’s classes different from the adults’?', 'Yes. Our children’s curriculum uses games, songs, and interactive storytelling to keep younger learners engaged, while adult classes focus more on conversational fluency and cultural context.']
]

export default function FaqPage() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="min-h-screen bg-[#f0e9dd]">
      <section className="px-5 py-24 pt-32 lg:px-8 lg:pt-40">
        <motion.div className="mx-auto max-w-[1000px]" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p variants={fadeUpVariants} className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#EAB308]"><span className="h-px w-10 bg-[#EAB308]" /> FAQ</motion.p>
          <motion.h1 variants={fadeUpVariants} className="font-serif text-5xl leading-[.95] tracking-[-.05em] md:text-7xl">Questions, <em className="text-[#EAB308]">answered.</em></motion.h1>
          <motion.p variants={fadeUpVariants} className="mt-8 max-w-[600px] text-lg leading-8 text-[#19352b]/70">Find answers to the most common questions about our classes, community, and learning process.</motion.p>
        </motion.div>
      </section>

      <section className="px-5 pb-24 lg:px-8">
        <motion.div className="mx-auto max-w-[1000px]" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <motion.div variants={staggerContainer} className="bg-white/40 rounded-3xl p-6 md:p-12 shadow-sm backdrop-blur-md border border-[#19352b]/5">
            {faqs.map(([q,a],i) => (
              <motion.div key={q} variants={fadeUpVariants} className="border-b border-[#19352b]/10 last:border-0">
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="flex w-full items-center justify-between py-6 text-left font-medium text-lg" aria-expanded={openFaq === i}><span>{q}</span><ChevronDown className={`size-5 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} /></button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="pb-6 pr-8 leading-7 text-[#19352b]/70">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div variants={fadeUpVariants} className="mt-16 text-center">
            <p className="text-[#19352b]/70 mb-4">Still have questions?</p>
            <Link href="/contact" className="inline-flex items-center text-sm font-semibold hover:text-[#EAB308] transition-colors">Get in touch <ArrowUpRight className="ml-2 size-4" /></Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
