'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight, ChevronDown, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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

const curriculum = [
  {
    module: "Module 1",
    title: "The Foundation: Alphabet & Tones",
    description: "Master the unique Yorùbá alphabet and the critical three-tone system (Do-Re-Mi) that fundamentally changes the meaning of words.",
    topics: ["Vowels and Consonants", "Tone Marks (Àmì Ohùn)", "Greetings & Politeness"]
  },
  {
    module: "Module 2",
    title: "Building Connections: Family & Self",
    description: "Learn how to introduce yourself confidently, talk about your family lineage, and navigate social relationships in Yorùbá culture.",
    topics: ["Self-Introduction", "Family Vocabulary", "Numbers 1-20"]
  },
  {
    module: "Module 3",
    title: "Everyday Life: Food, Market & Time",
    description: "Navigate daily scenarios like buying items at the market, ordering traditional food, and telling time.",
    topics: ["Bargaining at the Market", "Food & Dining", "Days of the Week"]
  },
  {
    module: "Module 4",
    title: "Expression: Verbs & Sentence Structure",
    description: "Start putting it all together by learning basic verbs and how to construct simple, grammatically correct sentences.",
    topics: ["Common Action Words", "Present & Past Tense Markers", "Asking Questions"]
  }
]

const pricingTiers = [
  {
    name: "Adult Private Class",
    price: "$25",
    period: "/ hour",
    description: "Personalized one-on-one instruction tailored to your specific goals and pace.",
    features: [
      "1-on-1 private tutoring",
      "Flexible scheduling",
      "Customized learning path",
      "Direct tutor access"
    ],
    highlighted: false,
    cta: "Book a Session"
  },
  {
    name: "Child Private Class",
    price: "$20",
    period: "/ hour",
    description: "Dedicated 1-on-1 attention for your child with lessons customized to their learning style.",
    features: [
      "1-on-1 private tutoring",
      "Paced for younger learners",
      "Interactive & engaging methods",
      "Flexible parent scheduling"
    ],
    highlighted: false,
    cta: "Book a Session"
  },
  {
    name: "Adult Group Class",
    price: "$350",
    period: "/ 3 months",
    description: "Learn alongside other adults with live expert guidance and conversational practice.",
    features: [
      "12-week comprehensive curriculum",
      "Weekly live group classes",
      "Interactive conversational practice",
      "Access to adult WhatsApp community"
    ],
    highlighted: true,
    cta: "Join Next Cohort"
  },
  {
    name: "Kids Group Class",
    price: "$250",
    period: "/ 3 months",
    description: "Engaging lessons designed to make learning enjoyable and meaningful for children.",
    features: [
      "12-week child-friendly curriculum",
      "Weekly interactive group sessions",
      "Fun learning games & flashcards",
      "Parent progress reports"
    ],
    highlighted: false,
    cta: "Enroll Your Child"
  }
]

export default function ClassesPage() {
  const [openModule, setOpenModule] = useState<number | null>(0)

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

      {/* Curriculum Section */}
      <section className="border-t border-[#19352b]/10 bg-white px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-16 lg:grid-cols-2">
            
            {/* Left side: Sticky Header */}
            <motion.div 
              className="lg:sticky lg:top-32 h-fit"
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }} 
              variants={staggerContainer}
            >
              <motion.p variants={fadeUpVariants} className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#EAB308]">Inside the Classroom</motion.p>
              <motion.h2 variants={fadeUpVariants} className="font-serif text-4xl leading-tight tracking-[-.04em] text-[#19352b] sm:text-5xl">Sample Curriculum Structure</motion.h2>
              <motion.p variants={fadeUpVariants} className="mt-6 text-lg text-[#19352b]/70">
                While each path is uniquely tailored, our core adult curriculum follows a structured progression to get you speaking confidently as quickly as possible.
              </motion.p>
              
              <motion.div variants={fadeUpVariants} className="mt-10">
                <Link href="/register" className="inline-flex rounded-full bg-[#19352b] px-8 py-4 text-sm font-semibold text-[#f8f6f0] transition-transform hover:-translate-y-1">
                  Start Learning Today
                </Link>
              </motion.div>
            </motion.div>

            {/* Right side: Accordion */}
            <motion.div 
              className="flex flex-col gap-4"
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }} 
              variants={staggerContainer}
            >
              {curriculum.map((curr, idx) => {
                const isOpen = openModule === idx;
                return (
                  <motion.div 
                    key={idx} 
                    variants={fadeUpVariants}
                    className={`rounded-2xl border ${isOpen ? 'border-[#19352b]/20 bg-[#f8f6f0]' : 'border-[#19352b]/10 bg-white'} overflow-hidden transition-colors duration-300`}
                  >
                    <button 
                      onClick={() => setOpenModule(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-6 text-left sm:p-8"
                    >
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EAB308]">{curr.module}</span>
                        <h3 className="mt-2 font-serif text-2xl tracking-tight text-[#19352b] sm:text-3xl">{curr.title}</h3>
                      </div>
                      <div className={`ml-4 flex size-10 shrink-0 items-center justify-center rounded-full border border-[#19352b]/10 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#19352b] text-white' : 'bg-transparent text-[#19352b]'}`}>
                        <ChevronDown className="size-5" />
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-8 pt-0 sm:px-8">
                            <p className="text-[#19352b]/70 leading-relaxed mb-6">
                              {curr.description}
                            </p>
                            <div className="space-y-3">
                              {curr.topics.map((topic, i) => (
                                <div key={i} className="flex items-center gap-3">
                                  <CheckCircle2 className="size-5 text-[#EAB308]" />
                                  <span className="font-medium text-[#19352b]">{topic}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-[#19352b] px-5 py-24 text-[#f8f6f0] lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <motion.div 
            className="mb-16 text-center"
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={staggerContainer}
          >
            <motion.p variants={fadeUpVariants} className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#EAB308]">
              <span className="h-px w-10 bg-[#EAB308]" /> Investment <span className="h-px w-10 bg-[#EAB308]" />
            </motion.p>
            <motion.h2 variants={fadeUpVariants} className="font-serif text-4xl leading-tight tracking-[-.04em] sm:text-5xl">
              Simple, transparent pricing.
            </motion.h2>
            <motion.p variants={fadeUpVariants} className="mx-auto mt-6 max-w-[600px] text-lg text-white/70">
              No hidden fees or long-term contracts. Choose the plan that fits your learning style and schedule.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid gap-6 md:grid-cols-2 lg:gap-8"
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={staggerContainer}
          >
            {pricingTiers.map((tier, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUpVariants}
                className={`relative flex flex-col rounded-3xl p-8 lg:p-10 ${tier.highlighted ? 'bg-[#f8f6f0] text-[#19352b]' : 'border border-white/10 bg-white/5'}`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#EAB308] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#19352b]">
                    Most Popular
                  </span>
                )}
                
                <h3 className="font-serif text-2xl">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tight">{tier.price}</span>
                  <span className={`text-sm ${tier.highlighted ? 'text-[#19352b]/60' : 'text-white/60'}`}>{tier.period}</span>
                </div>
                <p className={`mt-6 text-sm leading-relaxed ${tier.highlighted ? 'text-[#19352b]/80' : 'text-white/80'}`}>
                  {tier.description}
                </p>
                
                <div className={`my-8 h-px w-full ${tier.highlighted ? 'bg-[#19352b]/10' : 'bg-white/10'}`} />
                
                <ul className="mb-10 flex flex-1 flex-col gap-4">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className={`size-5 shrink-0 ${tier.highlighted ? 'text-[#EAB308]' : 'text-[#EAB308]'}`} />
                      <span className={`text-sm ${tier.highlighted ? 'text-[#19352b]' : 'text-white/90'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/register" 
                  className={`w-full rounded-full py-4 text-center text-sm font-semibold transition-transform hover:-translate-y-1 ${
                    tier.highlighted 
                      ? 'bg-[#19352b] text-white shadow-xl shadow-[#19352b]/10' 
                      : 'bg-white text-[#19352b]'
                  }`}
                >
                  {tier.cta}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
