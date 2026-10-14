'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check, Sparkles, Video, Users, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUpVariants, staggerContainer, cardHoverVariants, imageZoomVariants, revealMaskVariants } from '@/lib/animations'
import { AnimatedCounter } from '@/components/motion/AnimatedCounter'
import { YorubaPhrase } from '@/components/motion/YorubaPhrase'
import { VocabularyMarquee } from '@/components/motion/VocabularyMarquee'
import { ParallaxImage } from '@/components/motion/ParallaxImage'
import { YorubaNameGenerator } from '@/components/interactive/YorubaNameGenerator'
import { TonePlayground } from '@/components/interactive/TonePlayground'
import { TalkingDrum } from '@/components/interactive/TalkingDrum'
import { FluencyQuiz } from '@/components/interactive/FluencyQuiz'
import { ProverbWheel } from '@/components/interactive/ProverbWheel'
import { KidsSafariZone } from '@/components/interactive/KidsSafariZone'

const heroClasses = [
  {
    id: 'adult-private',
    tab: 'Adult 1-on-1',
    badge: 'Adult Private • 1-on-1 Live',
    title: 'Adult 1-on-1 Lessons',
    subtitle: 'Flexible hours, personalized pace, and direct conversational practice.',
    image: '/hero-yoruba-learner.jpg',
    alt: 'Black American adult learner in live online Yorùbá video class on laptop with male tutor'
  },
  {
    id: 'adult-group',
    tab: 'Adult Group Class',
    badge: 'Adult Cohort • Small Groups',
    title: 'Adult Group Classes',
    subtitle: 'Interactive weekly sessions with fellow adults building fluency together.',
    image: '/class-adult-group-v2.jpg',
    alt: 'Adults in a live online group Yorùbá video class on Zoom'
  },
  {
    id: 'kid-private',
    tab: 'Kids 1-on-1',
    badge: 'Kids Private • Ages 3–15',
    title: 'Kids 1-on-1 Tutoring',
    subtitle: 'Patient, dedicated attention tailored to your child’s learning style.',
    image: '/class-kid-private-v2.jpg',
    alt: 'Young boy in private 1-on-1 online Yorùbá lesson attentively smiling at his male tutor on laptop'
  },
  {
    id: 'kids-group',
    tab: 'Kids Group Class',
    badge: 'Kids Cohort • Fun & Games',
    title: 'Kids Group Sessions',
    subtitle: 'Interactive songs, stories, and cultural games with peer learners.',
    image: '/class-kids-group.jpg',
    alt: 'Children in interactive group online Yorùbá class on video call'
  }
]

export default function HomePage() {
  const [activeHeroClassIndex, setActiveHeroClassIndex] = useState(0)
  const [isAutoCycling, setIsAutoCycling] = useState(true)

  useEffect(() => {
    if (!isAutoCycling) return
    const timer = setInterval(() => {
      setActiveHeroClassIndex((prev) => (prev + 1) % heroClasses.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [isAutoCycling])

  const currentHeroClass = heroClasses[activeHeroClassIndex]

  return (
    <>
      <section id="top" className="relative mx-auto grid min-h-[760px] max-w-[1240px] items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:pt-20">
        <motion.div className="relative z-10 max-w-[650px]" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={fadeUpVariants} className="mb-7 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#19352b] px-3.5 py-1 text-xs font-semibold text-[#f8f6f0]">
              <span className="size-2 rounded-full bg-[#EAB308] animate-pulse" />
              100% Online Virtual Classes
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#19352b]/15 bg-white/80 px-3 py-1 text-xs font-semibold text-[#19352b]">
              <Users className="size-3.5 text-[#EAB308]" /> For Adults & Children
            </span>
          </motion.div>
          <motion.h1 variants={fadeUpVariants} className="max-w-[680px] font-serif text-[clamp(3.5rem,8vw,7.25rem)] leading-[.9] tracking-[-0.065em]">Learn Yorùbá <em className="font-light text-[#EAB308]">with</em> confidence.</motion.h1>
          <motion.p variants={fadeUpVariants} className="mt-8 max-w-[540px] text-lg leading-8 text-[#19352b]/70">
            Tailored live virtual classes for <strong>adults</strong>, <strong>busy professionals</strong>, and <strong>children</strong>. Whether reconnecting with your heritage or learning from scratch, build conversational fluency from home.
          </motion.p>
          <motion.div variants={fadeUpVariants} className="mt-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#19352b]/5 px-3 py-1 text-xs font-medium text-[#19352b]/80">
              • Adult Evening & Weekend Cohorts
            </span>
            <span className="rounded-full bg-[#19352b]/5 px-3 py-1 text-xs font-medium text-[#19352b]/80">
              • Engaging Kids Curriculum
            </span>
            <span className="rounded-full bg-[#19352b]/5 px-3 py-1 text-xs font-medium text-[#19352b]/80">
              • Private 1-on-1 Lessons
            </span>
          </motion.div>
          <motion.div variants={fadeUpVariants} className="mt-8 flex flex-wrap items-center gap-4"><Link href="/classes" className="rounded-full bg-[#19352b] px-6 py-4 text-sm font-semibold text-[#f8f6f0] transition-transform hover:-translate-y-1">Explore classes <ArrowUpRight className="ml-2 inline size-4" /></Link><Link href="/register" className="rounded-full border border-[#19352b]/25 px-6 py-4 text-sm font-semibold transition-colors hover:bg-[#e6eee5]">Register now</Link></motion.div>
          <motion.div variants={fadeUpVariants} className="mt-12 flex items-center gap-4 text-sm text-[#19352b]/60"><span className="flex -space-x-2"><span className="size-8 rounded-full border-2 border-[#f8f6f0] bg-[#EAB308]" /><span className="size-8 rounded-full border-2 border-[#f8f6f0] bg-[#FDE047]" /><span className="size-8 rounded-full border-2 border-[#f8f6f0] bg-[#577565]" /></span><span>Live on Zoom & Google Meet<br /><strong className="font-semibold text-[#19352b]">Learn from home worldwide.</strong></span></motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[500px] lg:mt-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 }}
          onMouseEnter={() => setIsAutoCycling(false)}
          onMouseLeave={() => setIsAutoCycling(true)}
        >
          {/* Interactive Class Mode Tabs */}
          <div className="mb-4 flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
            {heroClasses.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveHeroClassIndex(idx)
                  setIsAutoCycling(false)
                }}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${activeHeroClassIndex === idx
                    ? 'bg-[#19352b] text-[#f8f6f0] shadow-md scale-[1.02]'
                    : 'bg-white/80 text-[#19352b]/80 border border-[#19352b]/15 hover:bg-white hover:text-[#19352b]'
                  }`}
              >
                {item.tab}
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute -left-10 -top-10 size-28 rounded-full border border-[#EAB308]/40" />

            <motion.div
              key={`badge-${currentHeroClass.id}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute -top-3.5 -left-3.5 z-20 hidden sm:flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 shadow-xl backdrop-blur-md border border-[#19352b]/10 text-xs font-semibold text-[#19352b]"
            >
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <Video className="size-3.5 text-[#19352b]" />
              <span>{currentHeroClass.badge}</span>
            </motion.div>

            <motion.div className="absolute -bottom-9 -right-8 z-20 flex size-28 rotate-6 flex-col items-center justify-center rounded-full bg-[#FDE047] text-center text-xs font-semibold text-[#19352b] shadow-xl" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
              <Sparkles className="mb-1 size-4" /> Learn<br />together
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentHeroClass.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
                className="relative aspect-[.82] overflow-hidden rounded-[180px_180px_18px_18px] shadow-2xl"
              >
                <ParallaxImage
                  src={currentHeroClass.image}
                  alt={currentHeroClass.alt}
                  priority
                  className="h-full w-full"
                />
              </motion.div>
            </AnimatePresence>

            <motion.div
              key={`card-${currentHeroClass.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute -bottom-6 -left-6 hidden max-w-[270px] rounded-2xl bg-[#19352b] p-4 text-[#f8f6f0] shadow-xl sm:block"
            >
              <p className="text-[11px] font-semibold text-[#EAB308] uppercase tracking-wider">{currentHeroClass.tab}</p>
              <h4 className="mt-0.5 font-serif text-base text-white">{currentHeroClass.title}</h4>
              <p className="mt-1 text-xs text-[#f8f6f0]/75 leading-relaxed">{currentHeroClass.subtitle}</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <VocabularyMarquee />

      <section className="bg-white">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-8 px-5 py-8 lg:px-8">
          <div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-full bg-[#e6eee5] text-xl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-[#19352b]"><path d="M6 4c4 4 4 12 0 16h12c-4-4-4-12 0-16z" /><path d="M7 6l10 2 M7 10l10 0 M7 14l10-2" opacity="0.4" /></svg></div><div className="text-sm"><p className="font-semibold text-[#19352b]"><AnimatedCounter value={15} suffix="+" /> Countries</p><p className="text-[#19352b]/60">Global Community</p></div></div>
          <div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-full bg-[#f2e5d8] text-xl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-[#19352b]"><path d="M4 10c0 6.6 4 10 8 10s8-3.4 8-10" /><path d="M3 10h18" /><path d="M12 4v2" /><path d="M8 6c0-2 8-2 8 0" /></svg></div><div className="text-sm"><p className="font-semibold text-[#19352b]"><AnimatedCounter value={500} suffix="+" /> Active Learners</p><p className="text-[#19352b]/60">Growing daily</p></div></div>
          <div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-full bg-[#e9e5ef] text-xl"><Video className="size-5 text-[#19352b]" /></div><div className="text-sm"><p className="font-semibold text-[#19352b]">Live Video Classes</p><p className="text-[#19352b]/60">Zoom & Google Meet</p></div></div>
          <div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-full bg-[#f8f6f0] border border-[#19352b]/10 text-xl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-[#19352b]"><path d="M12 2C8 2 6 7 6 12s2 10 6 10 6-5 6-10S16 2 12 2z" /><path d="M12 4v16" opacity="0.4" /><path d="M10 8h4 M10 12h4 M10 16h4" opacity="0.4" /></svg></div><div className="text-sm"><p className="font-semibold text-[#19352b]">Expert Tutors</p><p className="text-[#19352b]/60">Native speakers</p></div></div>
        </div>
      </section>

      <section className="border-y border-[#19352b]/10 bg-[#e6eee5] px-5 py-20 lg:px-8">
        <motion.div className="mx-auto max-w-[1240px]" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <motion.div variants={fadeUpVariants}><p className="eyebrow">Why Yorùbá</p><h2 className="mt-5 max-w-[400px] font-serif text-5xl leading-[.95] tracking-[-.05em]">More than a language. <em className="text-[#EAB308]">A connection.</em></h2></motion.div>
            <div className="grid gap-8 sm:grid-cols-2">
              {[['01', 'SPEAK', 'Build practical conversational skills.'], ['02', 'CONNECT', 'Connect with family, heritage, and culture.'], ['03', 'BELONG', 'Keep Yorùbá alive across generations and borders.'], ['04', 'LEARN TOGETHER', 'A learning experience for individuals and families.']].map(([n, t, d]) => (
                <motion.div key={n} variants={fadeUpVariants} className="border-t border-[#19352b]/20 pt-5"><span className="text-xs text-[#EAB308]">{n}</span><h3 className="mt-8 text-lg font-semibold tracking-wide">{t}</h3><p className="mt-3 max-w-[220px] text-sm leading-6 text-[#19352b]/65">{d}</p></motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Interactive Sound & Tones Studio */}
      <section className="px-5 py-24 bg-white lg:px-8 border-b border-[#19352b]/10">
        <div className="mx-auto max-w-[1240px] space-y-16">
          <TonePlayground />
          <TalkingDrum />
        </div>
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
              { t: 'Adult Group Class', badge: 'Live Online • Small Groups', d: 'Interactive live sessions for adults to build practical vocabulary and conversational fluency from home.', img: '/online-group-class.jpg', c: 'bg-[#e6eee5]' },
              { t: 'Children’s Curriculum', badge: 'Live Virtual • Engaging', d: 'Engaging lessons designed to make learning enjoyable for younger minds in an interactive online setting.', img: '/child-learning.jpg', c: 'bg-[#f2e5d8]' },
              { t: 'Private Lessons', badge: '1-on-1 • Flexible Schedule', d: 'Personalized live one-on-one virtual instruction shaped exactly around your time zone and goals.', img: '/online-class-woman.jpg', c: 'bg-[#e9e5ef]' }
            ].map((p, i) => (
              <motion.div key={i} variants={fadeUpVariants} className="h-full">
                <motion.div variants={cardHoverVariants} initial="rest" whileHover="hover" className={`rounded-3xl ${p.c} flex flex-col overflow-hidden h-full cursor-pointer relative`}>
                  <div className="relative h-48 w-full overflow-hidden">
                    <span className="absolute top-4 left-4 z-10 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-semibold text-[#19352b] shadow-sm">
                      {p.badge}
                    </span>
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

      {/* Kids Interactive Safari & Counting Zone */}
      <section className="px-5 py-20 bg-white lg:px-8 border-t border-[#19352b]/10">
        <div className="mx-auto max-w-[1240px]">
          <KidsSafariZone />
        </div>
      </section>

      <section className="px-5 py-24 lg:px-8 border-t border-[#19352b]/10 bg-[#f8f6f0]">
        <motion.div className="mx-auto max-w-[1240px]" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <motion.div variants={fadeUpVariants}><p className="eyebrow">Your journey</p><h2 className="mt-4 max-w-[380px] font-serif text-5xl leading-none tracking-[-.05em]">Start where you are.</h2></motion.div>
            <div className="grid gap-8">
              {[['01', 'Choose your class', 'Find the program that fits your goals and schedule.'], ['02', 'Register online', 'Tell us about yourself and we will match you with the right cohort.'], ['03', 'Join your live virtual classroom', 'Log in from home, meet your tutor live on video, and start speaking with confidence.']].map(([n, t, d], i) => (
                <motion.div key={n} variants={fadeUpVariants} className="flex gap-6 border-t border-[#19352b]/20 pt-6"><span className="font-serif text-3xl text-[#EAB308]">{n}</span><div><h3 className="text-xl font-semibold">{t}</h3><p className="mt-2 text-[#19352b]/60">{d}</p></div>{i < 2 && <Check className="ml-auto hidden size-5 text-[#EAB308] sm:block" />}</motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Daily Ancestral Wisdom */}
      <section className="px-5 py-20 bg-white lg:px-8 border-t border-[#19352b]/10">
        <div className="mx-auto max-w-[1240px]">
          <ProverbWheel />
        </div>
      </section>

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
                <p>Our instructors are native speakers who conduct live, interactive video classes. Every session is designed to get you speaking from day one—breaking down complex tones and structures with real-time feedback, no matter your timezone.</p>
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

      {/* Orúkọ Yorùbá Explorer */}
      <section className="px-5 py-24 bg-white lg:px-8 border-t border-[#19352b]/10">
        <div className="mx-auto max-w-[1240px]">
          <YorubaNameGenerator />
        </div>
      </section>

      {/* Community Section */}
      <section className="border-t border-[#19352b]/10 bg-[#e6eee5] px-5 py-24 lg:px-8">
        <motion.div className="mx-auto max-w-[1240px]" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <div className="rounded-[32px] bg-white p-8 md:p-16 flex flex-col items-center text-center shadow-sm border border-[#19352b]/5">
            <motion.div variants={fadeUpVariants} className="flex size-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
            </motion.div>
            <motion.p variants={fadeUpVariants} className="eyebrow text-[#19352b]">Join our community</motion.p>
            <motion.h2 variants={fadeUpVariants} className="mt-4 max-w-[600px] font-serif text-4xl leading-tight tracking-[-.04em] sm:text-5xl">
              Practice makes perfect. <em className="text-[#EAB308]">Practice together.</em>
            </motion.h2>
            <motion.p variants={fadeUpVariants} className="mt-6 max-w-[500px] text-lg text-[#19352b]/70">
              Join our free WhatsApp study group to practice speaking, ask questions, and connect with other Yorùbá learners worldwide.
            </motion.p>
            <motion.div variants={fadeUpVariants} className="mt-10">
              <a href="https://chat.whatsapp.com/BaZKdym3lFzC4Genqg43Rh" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#19352b] px-8 py-4 font-semibold text-white transition-transform hover:-translate-y-1">
                Join WhatsApp Group <ArrowUpRight className="ml-2 size-5" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 60-Second Fluency Quiz */}
      <section className="px-5 py-24 bg-[#f8f6f0] lg:px-8 border-t border-[#19352b]/10">
        <div className="mx-auto max-w-[1240px]">
          <FluencyQuiz />
        </div>
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
