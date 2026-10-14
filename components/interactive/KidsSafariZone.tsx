'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Volume2, Smile, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { playTonePitch, speakYorubaPhrase } from '@/lib/audio'

interface Animal {
  yoruba: string
  english: string
  phonetic: string
  emoji: string
  funFact: string
}

const ANIMALS: Animal[] = [
  { yoruba: 'Kìnìún', english: 'Lion', phonetic: 'Kee-nee-oon', emoji: '🦁', funFact: 'The fearless king of the forest.' },
  { yoruba: 'Erin', english: 'Elephant', phonetic: 'Eh-reen', emoji: '🐘', funFact: 'Yorùbá say: “A kì í rí erin lẹ́ẹ̀kọ̀ọ̀kan” (One never mistakes the elephant’s greatness).' },
  { yoruba: 'Ẹkùn', english: 'Leopard', phonetic: 'Eh-koon', emoji: '🐆', funFact: 'Swift, dignified, and regal.' },
  { yoruba: 'Ẹdun', english: 'Monkey', phonetic: 'Eh-doon', emoji: '🐒', funFact: 'Famous for acrobatic tree swings.' },
  { yoruba: 'Ìjàpá', english: 'Tortoise', phonetic: 'Ee-jah-pah', emoji: '🐢', funFact: 'The famously clever hero of all ancient Yorùbá folktales (Àlọ́)!' },
  { yoruba: 'Ẹyẹ', english: 'Bird', phonetic: 'Eh-yeh', emoji: '🦜', funFact: 'Sings cheerful melodies at dawn.' },
  { yoruba: 'Ẹja', english: 'Fish', phonetic: 'Eh-jah', emoji: '🐟', funFact: 'Dances gracefully through cool river waters.' },
  { yoruba: 'Aguntan', english: 'Sheep', phonetic: 'Ah-goon-tahn', emoji: '🐑', funFact: 'Gentle, patient, and soft.' }
]

const NUMBERS = [
  { num: 1, yoruba: 'Ení', phonetic: 'Eh-nee', emoji: '☝️' },
  { num: 2, yoruba: 'Èjì', phonetic: 'Ay-jee', emoji: '✌️' },
  { num: 3, yoruba: 'Ẹta', phonetic: 'Eh-tah', emoji: '🤟' },
  { num: 4, yoruba: 'Ẹ̀rin', phonetic: 'Eh-reen', emoji: '🍀' },
  { num: 5, yoruba: 'Àrún', phonetic: 'Ah-roon', emoji: '🖐️' },
  { num: 6, yoruba: 'Ẹ̀fà', phonetic: 'Eh-fah', emoji: '🎲' },
  { num: 7, yoruba: 'Èje', phonetic: 'Ay-jeh', emoji: '🌈' },
  { num: 8, yoruba: 'Ẹjọ', phonetic: 'Eh-jaw', emoji: '🐙' },
  { num: 9, yoruba: 'Ẹ̀sán', phonetic: 'Eh-sahn', emoji: '🎈' },
  { num: 10, yoruba: 'Ẹ̀wá', phonetic: 'Eh-wah', emoji: '🌟' }
]

export function KidsSafariZone() {
  const [tab, setTab] = useState<'animals' | 'numbers'>('animals')
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const handleAnimalClick = (animal: Animal) => {
    setActiveItem(animal.yoruba)
    speakYorubaPhrase(animal.yoruba)
  }

  const handleNumberClick = (item: typeof NUMBERS[0]) => {
    setActiveItem(item.yoruba)
    speakYorubaPhrase(item.yoruba)
  }

  return (
    <section className="relative overflow-hidden rounded-[36px] bg-[#fffdfa] p-8 md:p-14 border-2 border-[#EAB308]/30 shadow-xl text-[#19352b]">
      {/* Playful shapes */}
      <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-[#FDE047]/20 blur-2xl" />
      <div className="pointer-events-none absolute -left-12 -bottom-12 size-48 rounded-full bg-[#25D366]/15 blur-2xl" />

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EAB308]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#19352b]">
            <Smile className="size-4 text-[#EAB308]" /> Kids Yorùbá Playground
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl tracking-tight">
            Animals & Numbers <em className="text-[#EAB308] italic">Safari!</em>
          </h2>
          <p className="mt-2 text-sm text-[#19352b]/70">
            Click any card to hear how to say it in Yorùbá. Designed to make language fun and memorable for children!
          </p>

          {/* Toggle buttons */}
          <div className="mt-6 inline-flex p-1.5 rounded-full bg-[#19352b]/5 border border-[#19352b]/10">
            <button
              onClick={() => setTab('animals')}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                tab === 'animals' ? 'bg-[#19352b] text-white shadow-sm' : 'text-[#19352b]/70 hover:text-[#19352b]'
              }`}
            >
              🦁 Animals Safari
            </button>
            <button
              onClick={() => setTab('numbers')}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                tab === 'numbers' ? 'bg-[#19352b] text-white shadow-sm' : 'text-[#19352b]/70 hover:text-[#19352b]'
              }`}
            >
              🔢 Count 1 to 10
            </button>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            {tab === 'animals' ? (
              <motion.div
                key="animals"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {ANIMALS.map((animal) => {
                  const isActive = activeItem === animal.yoruba
                  return (
                    <motion.button
                      key={animal.yoruba}
                      onClick={() => handleAnimalClick(animal)}
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative flex flex-col items-center text-center p-5 rounded-3xl border-2 transition-all bg-white ${
                        isActive
                          ? 'border-[#EAB308] bg-[#FDE047]/10 shadow-lg ring-2 ring-[#EAB308]/40'
                          : 'border-[#19352b]/10 hover:border-[#EAB308]/60 shadow-sm'
                      }`}
                    >
                      <span className="text-5xl">{animal.emoji}</span>
                      <h4 className="mt-3 font-serif text-xl font-bold text-[#19352b]">
                        {animal.yoruba}
                      </h4>
                      <span className="font-mono text-xs text-[#EAB308] font-semibold">
                        &ldquo;{animal.phonetic}&rdquo;
                      </span>
                      <span className="mt-1 text-xs font-medium text-[#19352b]/60">
                        {animal.english}
                      </span>
                      <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#577565]">
                        <Volume2 className="size-3" /> Tap to hear
                      </div>
                    </motion.button>
                  )
                })}
              </motion.div>
            ) : (
              <motion.div
                key="numbers"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4"
              >
                {NUMBERS.map((item) => {
                  const isActive = activeItem === item.yoruba
                  return (
                    <motion.button
                      key={item.num}
                      onClick={() => handleNumberClick(item)}
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex flex-col items-center justify-center p-5 rounded-3xl border-2 transition-all bg-white ${
                        isActive
                          ? 'border-[#EAB308] bg-[#FDE047]/15 shadow-lg ring-2 ring-[#EAB308]/40'
                          : 'border-[#19352b]/10 hover:border-[#EAB308]/60 shadow-sm'
                      }`}
                    >
                      <span className="font-serif text-4xl font-extrabold text-[#EAB308]">
                        {item.num}
                      </span>
                      <h4 className="mt-2 font-serif text-lg font-bold text-[#19352b]">
                        {item.yoruba}
                      </h4>
                      <span className="font-mono text-xs text-[#577565]">
                        {item.phonetic}
                      </span>
                      <span className="mt-2 text-xl">{item.emoji}</span>
                    </motion.button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA banner */}
        <div className="mt-10 rounded-2xl bg-[#e6eee5] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#577565]/20">
          <div>
            <h4 className="font-serif text-lg font-bold text-[#19352b]">
              Give your child the lifelong gift of their mother tongue
            </h4>
            <p className="text-xs sm:text-sm text-[#19352b]/70 mt-0.5">
              Interactive songs, storytelling, and patient 1-on-1 tutoring starting from age 3.
            </p>
          </div>
          <Link
            href="/register"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#19352b] px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#19352b]/90 transition-transform active:scale-95 shadow-md"
          >
            Enroll Your Child <ArrowRight className="size-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
