'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'

import Image from 'next/image'

const programs = [
  { number: '01', title: 'Adult Yorùbá Classes', text: 'Practical vocabulary, pronunciation, comprehension, and conversational confidence.', tag: 'For grown learners', color: 'bg-[#e6eee5]', img: '/online-group-class.jpg' },
  { number: '02', title: "Children's Yorùbá Classes", text: 'Engaging lessons designed to make learning enjoyable and meaningful for younger learners.', tag: 'For curious minds', color: 'bg-[#f2e5d8]', img: '/child-learning.jpg' },
  { number: '03', title: 'Private Lessons', text: 'Personalized one-on-one Yorùbá instruction, shaped around your goals and your life.', tag: 'At your pace', color: 'bg-[#e9e5ef]', img: '/online-class-woman.jpg' },
  { number: '04', title: 'Conversational Practice', text: 'Immersive speaking sessions designed to build fluency and overcome the fear of speaking.', tag: 'For active speakers', color: 'bg-[#f8f6f0] border border-[#19352b]/10', img: '/conversational-practice.jpg' },
  { number: '05', title: 'Cultural Immersion', text: 'Deep dives into Yorùbá history, proverbs, and worldview.', tag: 'Beyond words', color: 'bg-[#e6eee5]', img: '/cultural-immersion.jpg' },
  { number: '06', title: 'Family Packages', text: 'Learn together as a household with tailored curriculum for mixed age groups.', tag: 'Shared journey', color: 'bg-[#f2e5d8]', img: '/family-learning.jpg' },
]

export default function ClassesPage() {
  return (
    <div className="min-h-screen bg-[#f8f6f0]">
      {/* Hero Section */}
      <section className="px-5 py-24 pt-32 lg:px-8 lg:pt-40">
        <motion.div className="mx-auto max-w-[1240px]" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p variants={fadeUpVariants} className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#EAB308]"><span className="h-px w-10 bg-[#EAB308]" /> Our Programs</motion.p>
          <motion.h1 variants={fadeUpVariants} className="max-w-[800px] font-serif text-5xl leading-[.95] tracking-[-.05em] md:text-7xl">Find the perfect path for your <em className="text-[#EAB308]">Yorùbá</em> journey.</motion.h1>
          <motion.p variants={fadeUpVariants} className="mt-8 max-w-[600px] text-lg leading-8 text-[#19352b]/70">Whether you are starting from scratch, brushing up on your skills, or passing the language to the next generation, we have a class designed for you.</motion.p>
        </motion.div>
      </section>

      {/* Grid Section */}
      <section className="mx-auto max-w-[1240px] px-5 pb-24 lg:px-8">
        <motion.div className="grid gap-5 lg:grid-cols-3" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          {programs.map((p) => (
            <motion.article key={p.number} variants={fadeUpVariants} whileHover={{ y: -8, transition: { duration: 0.3 } }} className={`${p.color} group flex flex-col min-h-[390px] overflow-hidden rounded-2xl cursor-pointer`}>
              {p.img && (
                <div className="relative h-48 w-full border-b border-[#19352b]/10">
                  <Image src={p.img} alt={p.title} fill className="object-cover" />
                </div>
              )}
              <div className="flex flex-col justify-between flex-1 p-7">
                <div>
                  <div className="flex justify-between text-xs mb-8"><span>{p.number}</span><span className="rounded-full border border-[#19352b]/20 px-3 py-1 bg-white/40 backdrop-blur-sm">{p.tag}</span></div>
                  <h3 className="max-w-[260px] font-serif text-3xl leading-none tracking-[-.04em]">{p.title}</h3>
                  <p className="mt-4 max-w-[300px] text-sm leading-6 text-[#19352b]/65">{p.text}</p>
                </div>
                <Link href="/register" className="mt-6 inline-flex items-center text-sm font-semibold">Learn more <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </div>
  )
}
