'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Volume2, Copy, Check, Share2, RefreshCw, Heart, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { speakYorubaPhrase } from '@/lib/audio'

export interface YorubaName {
  name: string
  phonetic: string
  tones: string
  meaning: string
  breakdown: string
  gender: 'Unisex' | 'Male' | 'Female'
  category: 'Joy' | 'Royalty & Crown' | 'Wealth' | 'Gratitude & Faith' | 'Honor & Destiny'
  story: string
}

const YORUBA_NAMES: YorubaName[] = [
  {
    name: 'Ayọ̀kúnlé',
    phonetic: 'Ah-yor-koon-lay',
    tones: 'Dò - Re - High (\\ — /)',
    meaning: 'Joy fills the entire home',
    breakdown: 'Ayọ̀ (Joy) + kún (fills) + ilé (the house)',
    gender: 'Unisex',
    category: 'Joy',
    story: 'Given to a child whose birth brings immense happiness, relief, and abundance to the household.'
  },
  {
    name: 'Adérónkẹ́',
    phonetic: 'Ah-day-ron-kay',
    tones: 'Re - High - High (— / /)',
    meaning: 'The crown has found someone to cherish',
    breakdown: 'Adé (Crown) + rí (finds) + ẹni (someone) + kẹ́ (to pamper/care for)',
    gender: 'Female',
    category: 'Royalty & Crown',
    story: 'Bestowed on cherished daughters of noble or royal lineage who are destined to be loved and celebrated.'
  },
  {
    name: 'Ọlọ́ládé',
    phonetic: 'Oh-law-lah-day',
    tones: 'Re - High - High - High (— / / /)',
    meaning: 'The wealthy and honorable one has arrived',
    breakdown: 'Ọlọ́lá (Owner of wealth/honor) + dé (arrived)',
    gender: 'Unisex',
    category: 'Wealth',
    story: 'Marks the arrival of a child believed to carry prosperous fortune and prestige into the family lineage.'
  },
  {
    name: 'Tèmítọ́pẹ́',
    phonetic: 'Tay-mee-taw-pay',
    tones: 'Re - High - Re - High (— / — /)',
    meaning: 'My situation is worthy of thanksgiving',
    breakdown: 'Tèmi (Mine) + tó (is worthy) + ọpẹ́ (gratitude/thanks)',
    gender: 'Unisex',
    category: 'Gratitude & Faith',
    story: 'Expressed by parents who overcame hurdles or prayers to have this child, celebrating divine grace.'
  },
  {
    name: 'Babátúndé',
    phonetic: 'Bah-bah-toon-day',
    tones: 'Re - High - High (— / /)',
    meaning: 'Father has returned',
    breakdown: 'Bàbá (Father) + tún (again) + dé (arrived)',
    gender: 'Male',
    category: 'Honor & Destiny',
    story: 'A beloved ancestral name given to a male child born shortly after the passing of a grandfather or patriarch.'
  },
  {
    name: 'Ayọ̀mídé',
    phonetic: 'Ah-yor-mee-day',
    tones: 'Re - Dò - High - High (— \\ / /)',
    meaning: 'My joy has arrived',
    breakdown: 'Ayọ̀ (Joy) + mi (my) + dé (has arrived)',
    gender: 'Unisex',
    category: 'Joy',
    story: 'A heartwarming declaration that this child marks the dawn of peace, laughter, and personal fulfillment.'
  },
  {
    name: 'Adéwálé',
    phonetic: 'Ah-day-wah-lay',
    tones: 'Re - High - High - High (— / / /)',
    meaning: 'The crown has come home',
    breakdown: 'Adé (Crown) + wá (came) + ilé (home)',
    gender: 'Male',
    category: 'Royalty & Crown',
    story: 'Signifies reclaiming royalty, nobility, or honoring royal ancestors who bring honor back to the homestead.'
  },
  {
    name: 'Fọláṣadé',
    phonetic: 'Faw-lah-shah-day',
    tones: 'Re - High - Re - High (— / — /)',
    meaning: 'Use wealth as a crown',
    breakdown: 'Fi (Use) + ọlá (wealth/honor) + ṣe (make/wear as) + adé (crown)',
    gender: 'Female',
    category: 'Wealth',
    story: 'Given to a daughter who is prophesied to live gracefully, adorned with nobility and dignity.'
  },
  {
    name: 'Olúwaṣeun',
    phonetic: 'Oh-loo-wah-shay-oon',
    tones: 'Re - High - Re - Re (— / — —)',
    meaning: 'God has done wonderfully',
    breakdown: 'Olúwa (The Lord/God) + ṣe (did) + ohun (this wonderful thing)',
    gender: 'Unisex',
    category: 'Gratitude & Faith',
    story: 'One of the most cherished thanksgiving names in Yorubaland, celebrating an answered prayer.'
  },
  {
    name: 'Àbíkẹ́',
    phonetic: 'Ah-bee-kay',
    tones: 'Dò - High - High (\\ / /)',
    meaning: 'Born to be pampered, loved, and cherished',
    breakdown: 'Àbí (Born) + kẹ́ (to cherish/pamper)',
    gender: 'Female',
    category: 'Honor & Destiny',
    story: 'An affectionate oríkì (praise name) given to precious daughters who are protected and adored.'
  },
  {
    name: 'Damilọ́lá',
    phonetic: 'Dah-mee-law-lah',
    tones: 'Re - Re - High - High (— — / /)',
    meaning: 'Prosper me with honor and abundance',
    breakdown: 'Dá (Create/Endow) + mi (me) + ní (with) + ọlá (wealth/honor)',
    gender: 'Unisex',
    category: 'Wealth',
    story: 'A prayer that this child’s life will be saturated with genuine respect, influence, and fruitful endeavors.'
  },
  {
    name: 'Ìfẹ́olúwa',
    phonetic: 'Ee-fay-oh-loo-wah',
    tones: 'Dò - High - Re - High - Re (\\ / — / —)',
    meaning: 'The love of God',
    breakdown: 'Ìfẹ́ (Love) + Olúwa (God / The Almighty)',
    gender: 'Unisex',
    category: 'Gratitude & Faith',
    story: 'A reminder that love is the greatest spiritual bond connecting family, heritage, and the Creator.'
  },
  {
    name: 'Tìwalọlá',
    phonetic: 'Tee-wah-law-lah',
    tones: 'Re - Re - Re - High (— — — /)',
    meaning: 'Nobility and honor belong to us',
    breakdown: 'Tìwa (Ours) + ni (is) + ọlá (honor/prestige)',
    gender: 'Unisex',
    category: 'Royalty & Crown',
    story: 'Affirms that the family’s heritage is rooted in self-worth, cultural pride, and dignified living.'
  },
  {
    name: 'Káyọ̀dé',
    phonetic: 'Kah-yor-day',
    tones: 'High - Dò - High (/ \\ /)',
    meaning: 'Bring forth joy and jubilation',
    breakdown: 'Kó (Gather/Bring) + ayọ̀ (joy) + dé (arrived)',
    gender: 'Male',
    category: 'Joy',
    story: 'Celebrating a son whose arrival turned sorrows into dancing and restored celebration.'
  },
  {
    name: 'Moróunmúbọ̀',
    phonetic: 'Moh-rohn-moo-baw',
    tones: 'Re - High - Re - High - Dò (— / — / \\)',
    meaning: 'I have brought back something of priceless value',
    breakdown: 'Mo (I) + rí (saw/found) + ohun (a treasure) + mú (bring) + bọ̀ (home)',
    gender: 'Female',
    category: 'Honor & Destiny',
    story: 'Reflects deep pride: parents returning home with an incomparable treasure of a child.'
  }
]

const CATEGORIES = ['All', 'Joy', 'Royalty & Crown', 'Wealth', 'Gratitude & Faith', 'Honor & Destiny'] as const

export function YorubaNameGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedGender, setSelectedGender] = useState<'All' | 'Male' | 'Female' | 'Unisex'>('All')
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [copied, setCopied] = useState(false)

  const filteredNames = YORUBA_NAMES.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesGender = selectedGender === 'All' || item.gender === selectedGender || item.gender === 'Unisex'
    return matchesCategory && matchesGender
  })

  const currentName = filteredNames[currentIndex % (filteredNames.length || 1)] || YORUBA_NAMES[0]

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % filteredNames.length)
  }

  const handleCopy = () => {
    if (!currentName) return
    const text = `${currentName.name} (${currentName.phonetic})\nMeaning: ${currentName.meaning}\nBreakdown: ${currentName.breakdown}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareWhatsApp = () => {
    if (!currentName) return
    const message = encodeURIComponent(`I just discovered the meaning of the Yorùbá name *${currentName.name}*!\n\nMeaning: "${currentName.meaning}"\nLiteral breakdown: ${currentName.breakdown}\n\nExplore your Yorùbá heritage with live classes: https://learnyorubaeasily.com`)
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank')
  }

  return (
    <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#19352b] via-[#1f4236] to-[#0f241c] p-8 md:p-14 text-[#f8f6f0] shadow-2xl">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-[#EAB308]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-[#577565]/20 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#FDE047] backdrop-blur-md border border-white/10">
            <Sparkles className="size-3.5 text-[#EAB308]" /> Orúkọ Yorùbá Explorer
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl leading-tight tracking-tight">
            Discover Your <em className="text-[#EAB308] italic">Yorùbá Name</em> & Meaning
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#f8f6f0]/75">
            In Yorùbá tradition, every name is a poetic destiny, a prayer, and a deep family history. Filter by the blessing you wish for your life:
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat)
                setCurrentIndex(0)
              }}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#EAB308] text-[#19352b] shadow-lg scale-105'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gender Filter */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs">
          <span className="text-[#f8f6f0]/50">Show:</span>
          {(['All', 'Female', 'Male', 'Unisex'] as const).map(g => (
            <button
              key={g}
              onClick={() => {
                setSelectedGender(g)
                setCurrentIndex(0)
              }}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedGender === g ? 'bg-white/25 text-white font-semibold' : 'text-[#f8f6f0]/60 hover:text-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* The Name Card */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentName.name}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-3xl bg-white/10 p-7 sm:p-10 backdrop-blur-xl border border-white/15 shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="inline-block rounded-full bg-[#EAB308]/20 px-3 py-1 text-xs font-semibold text-[#FDE047] border border-[#EAB308]/30">
                      {currentName.category}
                    </span>
                    <span className="text-xs text-[#f8f6f0]/60 font-medium">
                      {currentName.gender} Name
                    </span>
                  </div>

                  <h3 className="mt-3 font-serif text-4xl sm:text-6xl tracking-tight text-white flex items-center gap-4 flex-wrap">
                    {currentName.name}
                    <button
                      onClick={() => speakYorubaPhrase(currentName.name)}
                      className="inline-flex size-11 items-center justify-center rounded-full bg-[#EAB308] text-[#19352b] transition-transform hover:scale-110 active:scale-95 shadow-md"
                      title="Listen to native pronunciation"
                      aria-label="Listen to pronunciation"
                    >
                      <Volume2 className="size-5" />
                    </button>
                  </h3>

                  <p className="mt-1 font-mono text-sm text-[#EAB308]">
                    Pronunciation: &ldquo;{currentName.phonetic}&rdquo; • Tone: {currentName.tones}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold text-white/90 hover:bg-white/20 transition-all border border-white/10"
                    title="Copy name and breakdown"
                  >
                    {copied ? <Check className="size-3.5 text-green-400" /> : <Copy className="size-3.5" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>

                  <button
                    onClick={handleShareWhatsApp}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/20 px-3.5 py-2 text-xs font-semibold text-[#25D366] hover:bg-[#25D366]/30 transition-all border border-[#25D366]/30"
                    title="Share to WhatsApp"
                  >
                    <Share2 className="size-3.5" /> Share
                  </button>
                </div>
              </div>

              {/* Meaning & Breakdown */}
              <div className="mt-6 grid gap-4 rounded-2xl bg-black/25 p-5 border border-white/10 text-sm">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#EAB308] font-bold">English Meaning</span>
                  <p className="mt-1 font-serif text-xl sm:text-2xl text-white italic">
                    &ldquo;{currentName.meaning}&rdquo;
                  </p>
                </div>

                <div className="border-t border-white/10 pt-3">
                  <span className="text-xs uppercase tracking-wider text-[#f8f6f0]/60 font-semibold">Word-by-Word Breakdown</span>
                  <p className="mt-1 font-mono text-xs sm:text-sm text-[#FDE047]">
                    {currentName.breakdown}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-3">
                  <span className="text-xs uppercase tracking-wider text-[#f8f6f0]/60 font-semibold">Cultural Context</span>
                  <p className="mt-1 text-xs sm:text-sm text-[#f8f6f0]/85 leading-relaxed">
                    {currentName.story}
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white hover:bg-white/25 transition-all border border-white/10"
                >
                  <RefreshCw className="size-4" /> Next Name ({((currentIndex % filteredNames.length) + 1)} of {filteredNames.length})
                </button>

                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-[#EAB308] px-6 py-3 text-sm font-bold text-[#19352b] transition-transform hover:-translate-y-0.5 shadow-lg"
                >
                  Learn to speak Yorùbá <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
