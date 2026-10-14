'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8f6f0]">
      {/* Hero */}
      <section className="px-5 py-24 pt-32 lg:px-8 lg:pt-40">
        <motion.div className="mx-auto max-w-[1240px]" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p variants={fadeUpVariants} className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#EAB308]"><span className="h-px w-10 bg-[#EAB308]" /> Our Story</motion.p>
          <motion.h1 variants={fadeUpVariants} className="max-w-[800px] font-serif text-5xl leading-[.95] tracking-[-.05em] md:text-7xl">Reclaiming our voice, <em className="text-[#EAB308]">together.</em></motion.h1>
          <motion.p variants={fadeUpVariants} className="mt-8 max-w-[600px] text-lg leading-8 text-[#19352b]/70">LearnYorubaEasily was born out of a desire to bridge the gap between generations, cultures, and continents through the beauty of the Yorùbá language.</motion.p>
        </motion.div>
      </section>

      <section className="bg-[#19352b] px-5 py-24 text-[#f8f6f0] lg:px-8">
        <motion.div className="mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[.9fr_1.1fr]" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <motion.div className="relative" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}>
            <div className="relative aspect-[.9] max-w-[430px] overflow-hidden rounded-[160px_160px_0_0] bg-[#EAB308]">
              <Image src="/yoruba-learning-hero.png" alt="A warm moment of shared learning" fill className="object-cover opacity-85" />
            </div>
            <motion.span className="absolute -bottom-5 -right-3 rounded-full bg-[#FDE047] px-6 py-4 text-sm font-semibold text-[#19352b]" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.5, type: "spring", stiffness: 100 }} viewport={{ once: true }}>Language is belonging.</motion.span>
          </motion.div>
          <motion.div variants={staggerContainer}>
            <motion.p variants={fadeUpVariants} className="eyebrow text-[#FDE047]">Our philosophy</motion.p>
            <motion.h2 variants={fadeUpVariants} className="mt-6 max-w-[600px] font-serif text-5xl leading-[.95] tracking-[-.05em] md:text-6xl">Language is more than words.</motion.h2>
            <motion.p variants={fadeUpVariants} className="mt-8 max-w-[540px] text-lg leading-8 text-[#f8f6f0]/65">We believe learning a language is about gaining a voice, understanding a culture, and creating meaningful connections. Our approach moves away from rigid textbook memorization and focuses on practical, conversational confidence.</motion.p>
            <motion.div variants={fadeUpVariants} className="mt-12 grid grid-cols-2 gap-8 border-t border-[#f8f6f0]/10 pt-10">
              <div>
                <h3 className="font-serif text-3xl text-[#FDE047]">500+</h3>
                <p className="mt-2 text-sm text-[#f8f6f0]/60">Students taught globally</p>
              </div>
              <div>
                <h3 className="font-serif text-3xl text-[#FDE047]">15+</h3>
                <p className="mt-2 text-sm text-[#f8f6f0]/60">Countries reached</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Values */}
      <section className="px-5 py-24 lg:px-8">
        <motion.div className="mx-auto max-w-[1240px]" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <div className="text-center max-w-[700px] mx-auto mb-16">
            <motion.p variants={fadeUpVariants} className="eyebrow mx-auto justify-center text-[#EAB308]">
              What Guides Us
            </motion.p>
            <motion.h2 variants={fadeUpVariants} className="mt-4 font-serif text-4xl leading-tight tracking-[-.04em] sm:text-5xl">
              Rooted in culture, designed for <em className="text-[#EAB308]">real life.</em>
            </motion.h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Cultural Depth',
                desc: 'Beyond vocabulary, we impart the rich proverbs (òwe), tonal beauty, and cultural context that make Yorùbá an expressive art.',
              },
              {
                title: 'Patient & Inclusive',
                desc: 'Whether you are a complete beginner, a heritage learner reconnecting, or raising bilingual children, our spaces are warm and non-judgmental.',
              },
              {
                title: 'Conversational Confidence',
                desc: 'We prioritize real-life speaking and listening from your very first lesson, giving you tools to speak with family, elders, and peers.',
              },
            ].map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUpVariants}
                className="rounded-3xl border border-[#19352b]/10 bg-white/70 p-8 shadow-sm backdrop-blur-sm"
              >
                <div className="mb-4 inline-block size-3 rounded-full bg-[#EAB308]" />
                <h3 className="font-serif text-2xl tracking-tight text-[#19352b]">{value.title}</h3>
                <p className="mt-4 leading-7 text-[#19352b]/70">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#19352b]/10 bg-[#e6eee5] px-5 py-20 lg:px-8">
        <motion.div
          className="mx-auto max-w-[900px] text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.p variants={fadeUpVariants} className="eyebrow mx-auto justify-center text-[#19352b]">
            Begin Your Journey
          </motion.p>
          <motion.h2 variants={fadeUpVariants} className="mt-4 font-serif text-4xl leading-tight tracking-[-.04em] sm:text-5xl text-[#19352b]">
            Ready to speak Yorùbá with <em className="text-[#EAB308]">pride?</em>
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="mx-auto mt-6 max-w-[540px] text-lg text-[#19352b]/75">
            Join a vibrant community of learners around the world. We offer classes for adults, kids, and private one-on-one sessions.
          </motion.p>
          <motion.div variants={fadeUpVariants} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/classes"
              className="inline-flex items-center justify-center rounded-full bg-[#19352b] px-8 py-4 font-semibold text-white transition-transform hover:-translate-y-1"
            >
              Explore Classes <ArrowUpRight className="ml-2 size-5" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-[#EAB308] px-8 py-4 font-semibold text-[#19352b] transition-transform hover:-translate-y-1"
            >
              Register Now <ArrowUpRight className="ml-2 size-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
