'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUpVariants, staggerContainer, cardHoverVariants, imageZoomVariants, revealMaskVariants } from '@/lib/animations'
import { AnimatedCounter } from '@/components/motion/AnimatedCounter'
import { YorubaPhrase } from '@/components/motion/YorubaPhrase'
import { VocabularyMarquee } from '@/components/motion/VocabularyMarquee'
import { ProverbCard } from '@/components/motion/ProverbCard'
import { ParallaxImage } from '@/components/motion/ParallaxImage'

export default function HomePage() {
  return (
    <>
      <section id="top" className="relative mx-auto grid min-h-[760px] max-w-[1240px] items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:pt-20">
        <motion.div className="relative z-10 max-w-[650px]" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p variants={fadeUpVariants} className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#EAB308]"><span className="h-px w-10 bg-[#EAB308]" /> Language. Heritage. Belonging.</motion.p>
          <motion.h1 variants={fadeUpVariants} className="max-w-[680px] font-serif text-[clamp(3.5rem,8vw,7.25rem)] leading-[.9] tracking-[-0.065em]">Learn Yorùbá <em className="font-light text-[#EAB308]">with</em> confidence.</motion.h1>
          <motion.p variants={fadeUpVariants} className="mt-8 max-w-[510px] text-lg leading-8 text-[#19352b]/70">Practical, engaging Yorùbá classes for adults, children, families, and learners around the world.</motion.p>
          <motion.div variants={fadeUpVariants} className="mt-9 flex flex-wrap items-center gap-4"><Link href="/classes" className="rounded-full bg-[#19352b] px-6 py-4 text-sm font-semibold text-[#f8f6f0] transition-transform hover:-translate-y-1">Explore classes <ArrowUpRight className="ml-2 inline size-4" /></Link><Link href="/register" className="rounded-full border border-[#19352b]/25 px-6 py-4 text-sm font-semibold transition-colors hover:bg-[#e6eee5]">Register now</Link></motion.div>
          <motion.div variants={fadeUpVariants} className="mt-14 flex items-center gap-4 text-sm text-[#19352b]/60"><span className="flex -space-x-2"><span className="size-8 rounded-full border-2 border-[#f8f6f0] bg-[#EAB308]" /><span className="size-8 rounded-full border-2 border-[#f8f6f0] bg-[#FDE047]" /><span className="size-8 rounded-full border-2 border-[#f8f6f0] bg-[#577565]" /></span><span>Made for learners<br /><strong className="font-semibold text-[#19352b]">everywhere.</strong></span></motion.div>
        </motion.div>
        <motion.div className="relative mx-auto w-full max-w-[500px] lg:mt-12" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}>
          <div className="absolute -left-10 -top-10 size-28 rounded-full border border-[#EAB308]/40" />
          <motion.div className="absolute -bottom-9 -right-8 z-20 flex size-28 rotate-6 flex-col items-center justify-center rounded-full bg-[#FDE047] text-center text-xs font-semibold text-[#19352b] shadow-xl" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
            <Sparkles className="mb-1 size-4" /> Learn<br />together
          </motion.div>
          <ParallaxImage src="/yoruba-learning-hero.png" alt="Mother and daughter learning Yorùbá together" priority className="relative aspect-[.82] rounded-[180px_180px_18px_18px] shadow-2xl" />
          <div className="absolute -bottom-6 -left-6 hidden max-w-[220px] rounded-2xl bg-[#19352b] p-6 text-[#f8f6f0] shadow-xl sm:block">
            <YorubaPhrase yoruba="Ẹ káàbọ̀" english="Welcome to your journey" />
          </div>
        </motion.div>
      </section>

      <VocabularyMarquee />

      <section className="bg-white">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-8 px-5 py-8 lg:px-8">
          <div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-full bg-[#e6eee5] text-xl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-[#19352b]"><path d="M6 4c4 4 4 12 0 16h12c-4-4-4-12 0-16z" /><path d="M7 6l10 2 M7 10l10 0 M7 14l10-2" opacity="0.4" /></svg></div><div className="text-sm"><p className="font-semibold text-[#19352b]"><AnimatedCounter value={15} suffix="+" /> Countries</p><p className="text-[#19352b]/60">Global Community</p></div></div>
          <div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-full bg-[#f2e5d8] text-xl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-[#19352b]"><path d="M4 10c0 6.6 4 10 8 10s8-3.4 8-10" /><path d="M3 10h18" /><path d="M12 4v2" /><path d="M8 6c0-2 8-2 8 0" /></svg></div><div className="text-sm"><p className="font-semibold text-[#19352b]"><AnimatedCounter value={500} suffix="+" /> Active Learners</p><p className="text-[#19352b]/60">Growing daily</p></div></div>
          <div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-full bg-[#e9e5ef] text-xl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-[#19352b]"><path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M4.9 19.1l14.2-14.2" opacity="0.3"/><circle cx="12" cy="12" r="4" fill="currentColor" /></svg></div><div className="text-sm"><p className="font-semibold text-[#19352b]">4.9/5 Average Rating</p><p className="text-[#19352b]/60">From our students</p></div></div>
          <div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-full bg-[#f8f6f0] border border-[#19352b]/10 text-xl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-[#19352b]"><path d="M12 2C8 2 6 7 6 12s2 10 6 10 6-5 6-10S16 2 12 2z" /><path d="M12 4v16" opacity="0.4" /><path d="M10 8h4 M10 12h4 M10 16h4" opacity="0.4" /></svg></div><div className="text-sm"><p className="font-semibold text-[#19352b]">Expert Tutors</p><p className="text-[#19352b]/60">Native speakers</p></div></div>
        </div>
      </section>

      <section className="border-y border-[#19352b]/10 bg-[#e6eee5] px-5 py-20 lg:px-8">
        <motion.div className="mx-auto max-w-[1240px]" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <motion.div variants={fadeUpVariants}><p className="eyebrow">Why Yorùbá</p><h2 className="mt-5 max-w-[400px] font-serif text-5xl leading-[.95] tracking-[-.05em]">More than a language. <em className="text-[#EAB308]">A connection.</em></h2></motion.div>
            <div className="grid gap-8 sm:grid-cols-2">
              {[['01','SPEAK','Build practical conversational skills.'],['02','CONNECT','Connect with family, heritage, and culture.'],['03','BELONG','Keep Yorùbá alive across generations and borders.'],['04','LEARN TOGETHER','A learning experience for individuals and families.']].map(([n,t,d]) => (
                <motion.div key={n} variants={fadeUpVariants} className="border-t border-[#19352b]/20 pt-5"><span className="text-xs text-[#EAB308]">{n}</span><h3 className="mt-8 text-lg font-semibold tracking-wide">{t}</h3><p className="mt-3 max-w-[220px] text-sm leading-6 text-[#19352b]/65">{d}</p></motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Programs */}
      <section className="px-5 py-24 lg:px-8 bg-[#f8f6f0]">
        <motion.div className="mx-auto max-w-[1240px]" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <motion.p variants={fadeUpVariants} className="eyebrow">Our Curriculum</motion.p>
              <motion.h2 variants={fadeUpVariants} className="mt-4 font-serif text-4xl sm:text-5xl tracking-[-.04em] max-w-[400px] leading-[.95]">Classes for every <em className="text-[#EAB308]">learner.</em></motion.h2>
            </div>
            <motion.div variants={fadeUpVariants}>
              <Link href="/classes" className="inline-flex items-center text-sm font-semibold hover:text-[#EAB308] transition-colors">View all programs <ArrowUpRight className="ml-1 size-4" /></Link>
            </motion.div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { t: 'Adult Group Class', d: 'Interactive sessions for adults to build practical vocabulary and fluency.', img: '/online-group-class.jpg', c: 'bg-[#e6eee5]' },
              { t: 'Children’s Curriculum', d: 'Engaging lessons designed to make learning enjoyable for younger minds.', img: '/child-learning.jpg', c: 'bg-[#f2e5d8]' },
              { t: 'Private Lessons', d: 'Personalized one-on-one instruction shaped exactly around your goals.', img: '/online-class-woman.jpg', c: 'bg-[#e9e5ef]' }
            ].map((p, i) => (
              <motion.div key={i} variants={fadeUpVariants} className="h-full">
                <motion.div variants={cardHoverVariants} initial="rest" whileHover="hover" className={`rounded-3xl ${p.c} flex flex-col overflow-hidden h-full cursor-pointer`}>
                  <div className="relative h-48 w-full overflow-hidden">
                    <motion.div variants={imageZoomVariants} className="h-full w-full relative">
                      <Image src={p.img} alt={p.t} fill className="object-cover" />
                    </motion.div>
                  </div>
                  <div className="p-8 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-serif text-2xl mb-3">{p.t}</h3>
                      <p className="text-[#19352b]/70 text-sm leading-relaxed max-w-[250px]">{p.d}</p>
                    </div>
                    <Link href="/register" className="mt-8 inline-flex items-center text-sm font-semibold transition-colors hover:text-[#EAB308]">Enroll now <ArrowUpRight className="ml-2 size-4" /></Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-5 py-24 lg:px-8 border-t border-[#19352b]/10 bg-white">
        <motion.div className="mx-auto max-w-[1240px]" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <motion.div variants={fadeUpVariants}><p className="eyebrow">Your journey</p><h2 className="mt-4 max-w-[380px] font-serif text-5xl leading-none tracking-[-.05em]">Start where you are.</h2></motion.div>
            <div className="grid gap-8">
              {[['01','Choose your class','Find the program that fits your goals.'],['02','Register','Tell us about yourself and what you want to learn.'],['03','Start learning','Begin your Yorùbá journey online.']].map(([n,t,d],i) => (
                <motion.div key={n} variants={fadeUpVariants} className="flex gap-6 border-t border-[#19352b]/20 pt-6"><span className="font-serif text-3xl text-[#EAB308]">{n}</span><div><h3 className="text-xl font-semibold">{t}</h3><p className="mt-2 text-[#19352b]/60">{d}</p></div>{i < 2 && <Check className="ml-auto hidden size-5 text-[#EAB308] sm:block" />}</motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <ProverbCard />

      {/* Meet the Instructors */}
      <section className="px-5 py-24 bg-[#f8f6f0] lg:px-8">
        <motion.div className="mx-auto max-w-[1240px]" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUpVariants}>
              <ParallaxImage 
                src="/cultural-immersion.jpg" 
                alt="Student taking notes in Yorùbá class" 
                className="aspect-square md:aspect-[4/3] lg:aspect-square rounded-3xl border border-[#19352b]/5 shadow-xl" 
              />
            </motion.div>
            <motion.div variants={fadeUpVariants} className="max-w-[500px]">
              <p className="eyebrow">Our Methodology</p>
              <h2 className="mt-5 font-serif text-4xl sm:text-5xl leading-[.95] tracking-[-.04em]">Taught by native speakers who <em className="text-[#EAB308]">care.</em></h2>
              <div className="mt-8 space-y-5 text-[#19352b]/70 text-lg leading-relaxed">
                <p>Language is more than just grammar rules and vocabulary lists. It is the vessel for our culture, our history, and our identity.</p>
                <p>Our instructors are native speakers who understand the nuances of the Yorùbá language. We focus on getting you speaking from day one, breaking down complex tones and structures into bite-sized, practical lessons.</p>
              </div>
              <div className="mt-10">
                <Link href="/about" className="inline-flex items-center justify-center rounded-full border border-[#19352b]/20 px-8 py-4 font-semibold text-[#19352b] transition-colors hover:bg-white">
                  Read our full story
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Community Section */}
      <section className="border-t border-[#19352b]/10 bg-white px-5 py-24 lg:px-8">
        <motion.div className="mx-auto max-w-[1240px]" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <div className="rounded-[32px] bg-[#e6eee5] p-8 md:p-16 flex flex-col items-center text-center">
            <motion.div variants={fadeUpVariants} className="flex size-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
            </motion.div>
            <motion.p variants={fadeUpVariants} className="eyebrow text-[#19352b]">Join our community</motion.p>
            <motion.h2 variants={fadeUpVariants} className="mt-4 max-w-[600px] font-serif text-4xl leading-tight tracking-[-.04em] sm:text-5xl">
              Practice makes perfect. <em className="text-[#EAB308]">Practice together.</em>
            </motion.h2>
            <motion.p variants={fadeUpVariants} className="mt-6 max-w-[500px] text-lg text-[#19352b]/70">
              Join our free WhatsApp study group to practice speaking, ask questions, and connect with other Yorùbá learners worldwide.
            </motion.p>
            <motion.div variants={fadeUpVariants} className="mt-10">
              <a href="https://chat.whatsapp.com/BaZKdym3lFzC4Genqg43Rh" target="_blank" className="inline-flex items-center justify-center rounded-full bg-[#19352b] px-8 py-4 font-semibold text-white transition-transform hover:-translate-y-1">
                Join WhatsApp Group <ArrowUpRight className="ml-2 size-5" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#19352b] px-5 py-24 text-[#f8f6f0] lg:px-8">
        <motion.div className="mx-auto max-w-[1240px]" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <div className="mb-16 text-center">
            <motion.p variants={fadeUpVariants} className="eyebrow mx-auto justify-center text-[#FDE047]">
              Student Stories
            </motion.p>
            <motion.h2 variants={fadeUpVariants} className="mt-4 font-serif text-4xl leading-tight tracking-[-.04em] sm:text-5xl">
              Don’t just take our word for it.
            </motion.h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUpVariants} className="flex flex-col justify-between rounded-3xl bg-white/5 p-8 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <p className="text-lg leading-relaxed text-[#f8f6f0]/90">"{t.quote}"</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#EAB308] text-sm font-semibold">
                    {t.initial}
                  </div>
                  <div>
                    <h4 className="font-semibold">{t.name}</h4>
                    <p className="text-xs text-[#f8f6f0]/60">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div variants={fadeUpVariants} className="mt-16 text-center">
            <Link href="/register" className="inline-flex items-center justify-center rounded-full bg-[#f8f6f0] px-8 py-4 font-semibold text-[#19352b] transition-transform hover:-translate-y-1">
              Start your own journey <ArrowUpRight className="ml-2 size-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}

const testimonials = [
  {
    quote: "I’ve tried learning Yorùbá before, but it always felt overwhelming. This platform broke it down so beautifully. For the first time, I can actually speak with my grandmother without feeling embarrassed.",
    name: "Bisi A.",
    role: "Heritage Learner, London",
    initial: "B"
  },
  {
    quote: "The children’s curriculum is fantastic. My 7-year-old looks forward to her classes every week. She's already singing Yorùbá songs and greeting us in the morning. Truly a blessing for our family.",
    name: "Michael T.",
    role: "Parent, Toronto",
    initial: "M"
  },
  {
    quote: "As an adult learning from scratch, I wanted a structured, professional environment. The conversational practice sessions are incredible. Highly recommend to anyone serious about fluency.",
    name: "Folake O.",
    role: "Adult Learner, Lagos",
    initial: "F"
  }
]
