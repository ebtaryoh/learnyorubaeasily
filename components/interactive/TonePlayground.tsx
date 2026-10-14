'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Volume2, Sparkles, ArrowRight, Info } from 'lucide-react'
import { playTalkingDrum, playDrumPhrase, speakYorubaPhrase } from '@/lib/audio'

interface WordVariant {
  word: string
  mark: string
  tonePattern: ('do' | 're' | 'mi')[]
  toneNames: string
  meaning: string
  icon: string
  sampleSentence: string
}

interface WordFamily {
  base: string
  title: string
  description: string
  variants: WordVariant[]
}

const WORD_FAMILIES: WordFamily[] = [
  {
    base: 'OWO',
    title: 'The Famous "OWO" Family',
    description: 'Four words spelled almost identically, but tones change their meaning completely.',
    variants: [
      {
        word: 'Owó',
        mark: 'Mí - Mí',
        tonePattern: ['mi', 'mi'],
        toneNames: 'High - High',
        meaning: 'Money / Wealth',
        icon: '💵',
        sampleSentence: 'Owó ní ń jẹ́ bẹ́ẹ̀ ni (Money makes things possible)'
      },
      {
        word: 'Ọwọ́',
        mark: 'Re - Mí',
        tonePattern: ['re', 'mi'],
        toneNames: 'Mid - High',
        meaning: 'Hand / Respect',
        icon: '✋',
        sampleSentence: 'Ọwọ́ ọ̀tún (Right hand) • Fi ọwọ́ fún (Give respect)'
      },
      {
        word: 'Owo',
        mark: 'Re - Re',
        tonePattern: ['re', 're'],
        toneNames: 'Mid - Mid',
        meaning: 'Broom / Bundle',
        icon: '🧹',
        sampleSentence: 'Owo ìgbálẹ̀ (A broom for sweeping)'
      },
      {
        word: 'Òwò',
        mark: 'Dò - Dò',
        tonePattern: ['do', 'do'],
        toneNames: 'Low - Low',
        meaning: 'Trade / Business / Commerce',
        icon: '💼',
        sampleSentence: 'Mo fẹ́ ṣe òwò (I want to do business)'
      }
    ]
  },
  {
    base: 'IGBA',
    title: 'The "IGBA" Quadruplets',
    description: 'Listen carefully: the same letters can mean a bowl, a number, a rope, or time itself!',
    variants: [
      {
        word: 'Igbá',
        mark: 'Re - Mí',
        tonePattern: ['re', 'mi'],
        toneNames: 'Mid - High',
        meaning: 'Calabash / Carved Gourd',
        icon: '🥣',
        sampleSentence: 'Igbá ẹja (Calabash of fish)'
      },
      {
        word: 'Igba',
        mark: 'Re - Re',
        tonePattern: ['re', 're'],
        toneNames: 'Mid - Mid',
        meaning: 'Two Hundred (200)',
        icon: '💯',
        sampleSentence: 'Igba ènìyàn (200 people)'
      },
      {
        word: 'Ìgbà',
        mark: 'Dò - Dò',
        tonePattern: ['do', 'do'],
        toneNames: 'Low - Low',
        meaning: 'Time / Season / Era',
        icon: '⏳',
        sampleSentence: 'Ní ìgbà àtijọ́ (In ancient times)'
      },
      {
        word: 'Igbà',
        mark: 'Re - Dò',
        tonePattern: ['re', 'do'],
        toneNames: 'Mid - Low',
        meaning: 'Climber\'s Palm Rope',
        icon: '🪢',
        sampleSentence: 'Igbà tí a fi ń gun ọ̀pẹ (Rope used for palm climbing)'
      }
    ]
  },
  {
    base: 'EGBE',
    title: 'The "ẸGBẸ́" Trio',
    description: 'One tonal mark differentiates society from physical side or eternal loss.',
    variants: [
      {
        word: 'Ẹgbẹ́',
        mark: 'Re - Mí',
        tonePattern: ['re', 'mi'],
        toneNames: 'Mid - High',
        meaning: 'Society / Club / Peer Group',
        icon: '👥',
        sampleSentence: 'Ẹgbẹ́ ọ̀rẹ́ (Group of friends)'
      },
      {
        word: 'Ẹ̀gbẹ́',
        mark: 'Dò - Mí',
        tonePattern: ['do', 'mi'],
        toneNames: 'Low - High',
        meaning: 'Side / Flank / By the side',
        icon: '🧭',
        sampleSentence: 'Wá sí ẹ̀gbẹ́ mi (Come to my side)'
      },
      {
        word: 'Egbe',
        mark: 'Re - Re',
        tonePattern: ['re', 're'],
        toneNames: 'Mid - Mid',
        meaning: 'Loss / Perishing / Void',
        icon: '🍂',
        sampleSentence: 'Egbe ni fún ibi (Perishing to evil)'
      }
    ]
  }
]

export function TonePlayground() {
  const [activeFamilyIndex, setActiveFamilyIndex] = useState(0)
  const [activeTone, setActiveTone] = useState<'do' | 're' | 'mi' | null>(null)
  const [playingWord, setPlayingWord] = useState<string | null>(null)

  const activeFamily = WORD_FAMILIES[activeFamilyIndex]

  const playSingleTone = (tone: 'do' | 're' | 'mi') => {
    setActiveTone(tone)
    const toneWord = tone === 'do' ? 'Dò' : tone === 're' ? 'Re' : 'Mí'
    speakYorubaPhrase(toneWord, {
      onEnd: () => setActiveTone(null)
    })
    setTimeout(() => setActiveTone(null), 1200)
  }

  const playWordAudio = (variant: WordVariant) => {
    setPlayingWord(variant.word)
    speakYorubaPhrase(variant.word, {
      onEnd: () => setPlayingWord(null)
    })
  }

  return (
    <section className="relative overflow-hidden rounded-[36px] bg-[#f8f6f0] p-8 md:p-14 border border-[#19352b]/10 shadow-lg text-[#19352b]">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#19352b]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#19352b] border border-[#19352b]/10">
            <Music className="size-3.5 text-[#EAB308]" /> Musical Tonality of Yorùbá
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl tracking-tight">
            The 3 Tones: <em className="text-[#EAB308] italic">Dò – Re – Mí</em>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#19352b]/70">
            Yorùbá is musical. Tap each tone to hear its pitch, then see how changing the melody transforms the word completely!
          </p>
        </div>

        {/* 3 Tone Interactive Pitch Keys */}
        <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg mx-auto">
          {/* Low tone: Dò */}
          <button
            onClick={() => playSingleTone('do')}
            className={`group relative flex flex-col items-center justify-center rounded-2xl p-5 sm:p-6 transition-all border shadow-sm ${
              activeTone === 'do'
                ? 'bg-[#19352b] text-white border-[#19352b] scale-95 shadow-inner'
                : 'bg-white hover:border-[#19352b]/30 hover:shadow-md'
            }`}
          >
            <span className="font-mono text-3xl sm:text-4xl font-bold text-[#EAB308]">\</span>
            <span className="mt-1 font-serif text-xl sm:text-2xl font-bold">Dò</span>
            <span className="mt-1 text-[11px] uppercase tracking-wider text-[#19352b]/60 group-hover:text-[#19352b]">Low Pitch</span>
            <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-[#EAB308]">
              <Volume2 className="size-3" /> Tap to hear
            </div>
          </button>

          {/* Mid tone: Re */}
          <button
            onClick={() => playSingleTone('re')}
            className={`group relative flex flex-col items-center justify-center rounded-2xl p-5 sm:p-6 transition-all border shadow-sm ${
              activeTone === 're'
                ? 'bg-[#19352b] text-white border-[#19352b] scale-95 shadow-inner'
                : 'bg-white hover:border-[#19352b]/30 hover:shadow-md'
            }`}
          >
            <span className="font-mono text-3xl sm:text-4xl font-bold text-[#577565]">—</span>
            <span className="mt-1 font-serif text-xl sm:text-2xl font-bold">Re</span>
            <span className="mt-1 text-[11px] uppercase tracking-wider text-[#19352b]/60 group-hover:text-[#19352b]">Mid Pitch</span>
            <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-[#577565]">
              <Volume2 className="size-3" /> Tap to hear
            </div>
          </button>

          {/* High tone: Mí */}
          <button
            onClick={() => playSingleTone('mi')}
            className={`group relative flex flex-col items-center justify-center rounded-2xl p-5 sm:p-6 transition-all border shadow-sm ${
              activeTone === 'mi'
                ? 'bg-[#19352b] text-white border-[#19352b] scale-95 shadow-inner'
                : 'bg-white hover:border-[#19352b]/30 hover:shadow-md'
            }`}
          >
            <span className="font-mono text-3xl sm:text-4xl font-bold text-[#EAB308]">/</span>
            <span className="mt-1 font-serif text-xl sm:text-2xl font-bold">Mí</span>
            <span className="mt-1 text-[11px] uppercase tracking-wider text-[#19352b]/60 group-hover:text-[#19352b]">High Pitch</span>
            <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-[#EAB308]">
              <Volume2 className="size-3" /> Tap to hear
            </div>
          </button>
        </div>

        {/* Word Family Selector Tabs */}
        <div className="mt-14 border-t border-[#19352b]/10 pt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl font-semibold">The Chameleon Words</h3>
              <p className="text-xs sm:text-sm text-[#19352b]/60 mt-0.5">Click each tile below to hear how the melody shifts the definition</p>
            </div>

            <div className="flex items-center gap-2">
              {WORD_FAMILIES.map((fam, idx) => (
                <button
                  key={fam.base}
                  onClick={() => setActiveFamilyIndex(idx)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    activeFamilyIndex === idx
                      ? 'bg-[#19352b] text-white shadow-sm'
                      : 'bg-white border border-[#19352b]/15 text-[#19352b]/70 hover:bg-white/80 hover:text-[#19352b]'
                  }`}
                >
                  {fam.base}
                </button>
              ))}
            </div>
          </div>

          {/* Variants Grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="wait">
              {activeFamily.variants.map((variant) => {
                const isPlaying = playingWord === variant.word
                return (
                  <motion.button
                    key={variant.word}
                    onClick={() => playWordAudio(variant)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex flex-col justify-between text-left rounded-2xl p-5 transition-all border bg-white ${
                      isPlaying
                        ? 'border-[#EAB308] ring-2 ring-[#EAB308]/40 shadow-lg'
                        : 'border-[#19352b]/10 hover:border-[#19352b]/25 shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{variant.icon}</span>
                        <div className={`flex size-8 items-center justify-center rounded-full transition-colors ${
                          isPlaying ? 'bg-[#EAB308] text-[#19352b]' : 'bg-[#19352b]/5 text-[#19352b]/60'
                        }`}>
                          <Volume2 className="size-4" />
                        </div>
                      </div>

                      <h4 className="mt-4 font-serif text-3xl font-bold tracking-tight">
                        {variant.word}
                      </h4>

                      <div className="mt-1 flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#EAB308] bg-[#EAB308]/15 px-2 py-0.5 rounded">
                          {variant.mark}
                        </span>
                        <span className="text-[11px] text-[#19352b]/50 font-medium">
                          ({variant.toneNames})
                        </span>
                      </div>

                      <p className="mt-3 text-sm font-semibold text-[#19352b]">
                        {variant.meaning}
                      </p>
                    </div>

                    <p className="mt-4 border-t border-[#19352b]/5 pt-3 text-[11px] text-[#19352b]/55 italic line-clamp-2">
                      &ldquo;{variant.sampleSentence}&rdquo;
                    </p>
                  </motion.button>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Why this matters callout */}
        <div className="mt-10 rounded-2xl bg-[#e6eee5] p-5 sm:p-6 flex items-start gap-4 border border-[#577565]/20">
          <Info className="size-5 text-[#577565] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#19352b]/80 leading-relaxed">
            <strong className="font-semibold text-[#19352b]">Why learning tones with a live tutor is key:</strong> Unlike apps that rely only on text, our live 1-on-1 and small group tutors train your ear and voice in real time so you are understood naturally from day one.
          </div>
        </div>

      </div>
    </section>
  )
}
