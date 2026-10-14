'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, Sparkles, RefreshCw, Share2, Quote, Bookmark } from 'lucide-react'
import { speakYorubaPhrase } from '@/lib/audio'

interface Proverb {
  yoruba: string
  phonetic: string
  literal: string
  meaning: string
  theme: string
}

const YORUBA_PROVERBS: Proverb[] = [
  {
    yoruba: 'Àgbájọ ọwọ́ la fi ń sọ̀yà; àjèjé ọwọ́ kan kò gbégbá dé orí.',
    phonetic: 'Ah-gbah-jaw aw-waw lah fee n saw-yah; ah-jay-jay aw-waw kahn kaw gbay-gbah day aw-ree',
    literal: 'A fist is made of joined fingers; a single hand cannot lift a heavy calabash onto the head.',
    meaning: 'True strength lies in unity and family solidarity. No monumental triumph is achieved alone.',
    theme: 'Community & Unity'
  },
  {
    yoruba: 'Ilé la ti ń kọ́ ẹ̀ṣọ́ ròde.',
    phonetic: 'Ee-lay lah tee n kaw eh-shaw raw-day',
    literal: 'Charity and decorum are practiced at home before taking them to the public square.',
    meaning: 'True nobility, manners, and integrity start within one’s own family hearth.',
    theme: 'Character & Family'
  },
  {
    yoruba: 'Bí ẹ̀mí bá wà, ìrètí ń bẹ.',
    phonetic: 'Bee eh-mee bah wah, ee-ray-tee n beh',
    literal: 'As long as there is life and breath, there is unfailing hope.',
    meaning: 'Never succumb to despair. Every new sunrise brings a pathway to renewal and purpose.',
    theme: 'Resilience & Hope'
  },
  {
    yoruba: 'Ọmọ tí a kò kọ́, ni yóò gbé ilé tí a kọ́ tà.',
    phonetic: 'Aw-maw tee ah kaw kaw, nee yaw gbay ee-lay tee ah kaw tah',
    literal: 'The child we fail to teach will eventually sell the house we toiled to build.',
    meaning: 'The greatest legacy a parent can build is investing in the mind, language, and culture of the child.',
    theme: 'Education & Heritage'
  },
  {
    yoruba: 'Ọwọ́ ọmọdé kò tó pẹpẹ, ti àgbàlagbà kò wọ kèrègbè.',
    phonetic: 'Aw-waw aw-maw-day kaw taw peh-peh, tee ah-gbah-lah-gbah kaw waw kay-ray-gbay',
    literal: 'A child’s hand cannot reach the high shelf, while an elder’s hand cannot fit inside the gourd bottle.',
    meaning: 'Both children and elders possess unique wisdom. Society thrives when both are embraced.',
    theme: 'Mutual Respect'
  },
  {
    yoruba: 'A kì í fi ojú olójú ríran.',
    phonetic: 'Ah kee ee fee oh-joo oh-law-joo ree-rahn',
    literal: 'One cannot see the world clearly through another person’s eyes.',
    meaning: 'Trust your own journey, intuition, and direct experience rather than secondhand assumptions.',
    theme: 'Self-Knowledge'
  }
]

export function ProverbWheel() {
  const [index, setIndex] = useState(0)

  const proverb = YORUBA_PROVERBS[index]

  const handleNext = () => {
    setIndex(prev => (prev + 1) % YORUBA_PROVERBS.length)
  }

  const handleShare = () => {
    const text = encodeURIComponent(`"Òwe Yorùbá: ${proverb.yoruba}"\n\nMeaning: ${proverb.meaning}\n\nLearn authentic Yorùbá language & wisdom with live classes at https://learnyorubaeasily.com`)
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank')
  }

  return (
    <section className="relative overflow-hidden rounded-[36px] bg-[#e6eee5] p-8 md:p-14 border border-[#577565]/20 text-[#19352b] shadow-md">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#577565] border border-[#577565]/20 backdrop-blur-sm">
            <Quote className="size-3.5 text-[#EAB308]" /> Òwe Yorùbá • Ancient Wisdom
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl tracking-tight">
            Proverb of the <em className="text-[#EAB308] italic">Day</em>
          </h2>
          <p className="mt-2 text-sm text-[#19352b]/70">
            Yorùbá say: <em>“Òwe lẹṣin ọ̀rọ̀”</em> (Proverbs are the horse of speech — when conversation is lost, proverbs find it).
          </p>
        </div>

        {/* The Proverb Card */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={proverb.yoruba}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-white p-7 sm:p-10 shadow-sm border border-[#19352b]/10"
            >
              <div className="flex items-center justify-between gap-4 border-b border-[#19352b]/10 pb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAB308]/20 px-3 py-1 text-xs font-bold text-[#19352b]">
                  <Bookmark className="size-3.5 text-[#EAB308]" /> {proverb.theme}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speakYorubaPhrase(proverb.yoruba)}
                    className="flex size-9 items-center justify-center rounded-full bg-[#19352b]/5 text-[#19352b] hover:bg-[#EAB308] transition-colors"
                    title="Hear native pronunciation"
                  >
                    <Volume2 className="size-4" />
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex size-9 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/30 transition-colors"
                    title="Share to WhatsApp"
                  >
                    <Share2 className="size-4" />
                  </button>
                </div>
              </div>

              {/* The Text */}
              <div className="mt-6">
                <p className="font-serif text-2xl sm:text-3xl font-bold leading-snug text-[#19352b]">
                  &ldquo;{proverb.yoruba}&rdquo;
                </p>

                <p className="mt-3 font-mono text-xs text-[#577565]">
                  Phonetics: {proverb.phonetic}
                </p>
              </div>

              {/* Literal & Moral */}
              <div className="mt-6 grid gap-4 rounded-2xl bg-[#f8f6f0] p-5 text-sm">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#19352b]/50">
                    Literal Translation
                  </span>
                  <p className="mt-1 text-sm text-[#19352b]/80 italic">
                    {proverb.literal}
                  </p>
                </div>

                <div className="border-t border-[#19352b]/10 pt-3">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#EAB308]">
                    Ancestral Wisdom / Life Lesson
                  </span>
                  <p className="mt-1 text-sm font-semibold text-[#19352b]">
                    {proverb.meaning}
                  </p>
                </div>
              </div>

              {/* Next Proverb Button */}
              <div className="mt-6 flex justify-between items-center pt-2">
                <span className="text-xs text-[#19352b]/50 font-medium">
                  Wisdom {index + 1} of {YORUBA_PROVERBS.length}
                </span>

                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-full bg-[#19352b] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#19352b]/90 transition-transform active:scale-95 shadow-sm"
                >
                  <RefreshCw className="size-3.5" /> Next Wisdom
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
