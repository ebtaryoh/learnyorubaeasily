'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, Sparkles, Music, Play, RotateCcw } from 'lucide-react'
import { playTalkingDrum, playDrumPhrase, speakYorubaPhrase } from '@/lib/audio'

interface DrumPhrase {
  title: string
  yoruba: string
  english: string
  pattern: ('do' | 're' | 'mi' | 'bend-up' | 'bend-down')[]
  tones: string
  description: string
}

const DRUM_PHRASES: DrumPhrase[] = [
  {
    title: 'Warm Welcome',
    yoruba: 'Káàbọ̀ o!',
    english: 'Welcome to you!',
    pattern: ['re', 'bend-up', 'do'],
    tones: 'Re - Mí - Dò (— / \\)',
    description: 'Drummed at palace entries and home gates to welcome arriving guests with honor.'
  },
  {
    title: 'Morning Greeting',
    yoruba: 'Ẹ kú àárọ̀ o',
    english: 'Good morning to all',
    pattern: ['re', 'mi', 'do', 're'],
    tones: 'Re - Mí - Dò - Re (— / \\ —)',
    description: 'Traditional dawn salute played by court drummers to greet elders and community.'
  },
  {
    title: 'Royal Salute (Kábíyèsí)',
    yoruba: 'Kábíyèsí o!',
    english: 'All hail the King! (Honoring royalty and honored leaders)',
    pattern: ['mi', 'bend-up', 'mi', 'do', 're'],
    tones: 'Mí - Mí - Mí - Dò - Re (/ / / \\ —)',
    description: 'The majestic royal anthem drummed across Yorùbá land to announce monarchs and distinguished dignitaries.'
  },
  {
    title: 'Proverb of Unity',
    yoruba: 'Ká rìn ká pọ̀, yíyẹ ní ń yẹ ni',
    english: 'Walking together brings dignity and glory',
    pattern: ['mi', 'do', 'mi', 'do', 'bend-up', 'mi', 're'],
    tones: 'Mí - Dò - Mí - Dò - Mí - Re',
    description: 'A famous communal proverb warning against isolation and celebrating togetherness.'
  }
]

export function TalkingDrum() {
  const [isStriking, setIsStriking] = useState(false)
  const [playingPhrase, setPlayingPhrase] = useState<string | null>(null)
  const [lastStrikeTone, setLastStrikeTone] = useState<string>('Strike me!')

  const handleDrumTap = (tone: 'do' | 're' | 'mi' | 'bend-up' | 'bend-down') => {
    setIsStriking(true)
    playTalkingDrum(tone)
    const toneLabels = {
      'do': 'Low Dò tone (\\)',
      're': 'Mid Re tone (—)',
      'mi': 'High Mí tone (/)',
      'bend-up': 'Pitch squeeze (Glide Up)',
      'bend-down': 'Pitch release (Glide Down)',
      'bounce': 'Resonant strike'
    }
    setLastStrikeTone(toneLabels[tone] || 'Strike!')
    setTimeout(() => setIsStriking(false), 220)
  }

  const handlePlayPhrase = (phrase: DrumPhrase) => {
    setPlayingPhrase(phrase.title)
    playDrumPhrase(phrase.pattern, 280)
    setTimeout(() => {
      setPlayingPhrase(null)
    }, phrase.pattern.length * 280 + 200)
  }

  return (
    <section className="relative overflow-hidden rounded-[36px] bg-[#19352b] p-8 md:p-14 text-[#f8f6f0] shadow-2xl">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full bg-[#EAB308]/10 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#FDE047] border border-white/10">
            <Sparkles className="size-3.5 text-[#EAB308]" /> Traditional Yorùbá Gángan
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl tracking-tight">
            The Interactive <em className="text-[#EAB308] italic">Talking Drum</em>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#f8f6f0]/75">
            The Yorùbá talking drum doesn’t just play rhythm — it literally speaks sentences. Tap the drum to squeeze its pitch, or listen to the phrases below!
          </p>
        </div>

        {/* The Drum Centerpiece */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2 items-center">
          
          {/* Drum Visualizer & Interactive Strike Zone */}
          <div className="flex flex-col items-center justify-center rounded-3xl bg-white/5 p-6 sm:p-10 border border-white/10 backdrop-blur-md">
            
            {/* The SVG Drum */}
            <motion.div
              animate={isStriking ? { scale: [1, 1.05, 0.98, 1], rotate: [0, -2, 2, 0] } : {}}
              transition={{ duration: 0.22 }}
              onClick={() => handleDrumTap('bend-up')}
              className="relative cursor-pointer select-none group"
              title="Click to strike the drum!"
            >
              {/* Drum Graphic */}
              <svg width="220" height="240" viewBox="0 0 220 240" className="drop-shadow-2xl">
                {/* Upper Rim / Head */}
                <ellipse cx="110" cy="35" rx="65" ry="20" fill="#EAB308" />
                <ellipse cx="110" cy="35" rx="55" ry="15" fill="#f8f6f0" opacity="0.9" />
                <ellipse cx="110" cy="35" rx="42" ry="10" fill="#e6d5b8" />

                {/* Hourglass Body */}
                <path
                  d="M50 38 Q110 115 55 200 L165 200 Q110 115 170 38 Z"
                  fill="url(#woodGradient)"
                  stroke="#2c1a0e"
                  strokeWidth="2"
                />

                {/* Leather Tension Cords */}
                <g stroke="#e2c89f" strokeWidth="2.5" opacity="0.85">
                  <line x1="58" y1="42" x2="100" y2="115" />
                  <line x1="100" y1="115" x2="62" y2="198" />
                  
                  <line x1="80" y1="48" x2="105" y2="115" />
                  <line x1="105" y1="115" x2="85" y2="202" />

                  <line x1="110" y1="52" x2="110" y2="198" />

                  <line x1="140" y1="48" x2="115" y2="115" />
                  <line x1="115" y1="115" x2="135" y2="202" />

                  <line x1="162" y1="42" x2="120" y2="115" />
                  <line x1="120" y1="115" x2="158" y2="198" />
                </g>

                {/* Central Tension Band (Under the arm squeeze) */}
                <rect x="92" y="105" width="36" height="20" rx="6" fill="#8B4513" stroke="#e2c89f" strokeWidth="2" />

                {/* Lower Rim / Base */}
                <ellipse cx="110" cy="202" rx="65" ry="20" fill="#EAB308" />
                <ellipse cx="110" cy="202" rx="55" ry="15" fill="#2c1a0e" />

                {/* Gradients */}
                <defs>
                  <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B4513" />
                    <stop offset="50%" stopColor="#5c2e0b" />
                    <stop offset="100%" stopColor="#3d1f07" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Tap pulse indicator */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full bg-[#EAB308] px-3 py-1 text-[11px] font-bold text-[#19352b] shadow-md flex items-center gap-1 group-hover:scale-105 transition-transform">
                <Sparkles className="size-3" /> Tap to Strike
              </div>
            </motion.div>

            {/* Quick Squeeze Controls */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => handleDrumTap('do')}
                className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20 transition-colors border border-white/10"
              >
                Low Dò (\)
              </button>
              <button
                onClick={() => handleDrumTap('re')}
                className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20 transition-colors border border-white/10"
              >
                Mid Re (—)
              </button>
              <button
                onClick={() => handleDrumTap('mi')}
                className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20 transition-colors border border-white/10"
              >
                High Mí (/)
              </button>
              <button
                onClick={() => handleDrumTap('bend-up')}
                className="rounded-full bg-[#EAB308] px-3 py-1.5 text-xs font-bold text-[#19352b] hover:bg-[#FDE047] transition-colors"
              >
                Squeeze Glide (⤴)
              </button>
            </div>

            <p className="mt-3 text-xs text-[#EAB308] font-mono">
              Status: {lastStrikeTone}
            </p>
          </div>

          {/* Phrases Soundboard */}
          <div className="space-y-3">
            <h3 className="font-serif text-2xl font-semibold text-white">
              Phrases the Drum Can Speak
            </h3>
            <p className="text-xs text-[#f8f6f0]/70">
              In Yorùbá culture, listeners decode these melodies word-for-word across market squares and celebrations:
            </p>

            <div className="mt-4 space-y-3">
              {DRUM_PHRASES.map((phrase) => {
                const isPlaying = playingPhrase === phrase.title
                return (
                  <div
                    key={phrase.title}
                    onClick={() => handlePlayPhrase(phrase)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handlePlayPhrase(phrase)
                      }
                    }}
                    className={`w-full text-left rounded-2xl p-4 transition-all border cursor-pointer ${
                      isPlaying
                        ? 'bg-[#EAB308]/20 border-[#EAB308] shadow-lg scale-[1.01]'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-lg font-bold text-white">
                            {phrase.yoruba}
                          </span>
                          <span className="font-mono text-xs text-[#EAB308] bg-black/30 px-2 py-0.5 rounded">
                            {phrase.tones}
                          </span>
                        </div>
                        <p className="text-xs text-[#FDE047] mt-0.5 font-medium">
                          &ldquo;{phrase.english}&rdquo;
                        </p>
                        <p className="text-[11px] text-[#f8f6f0]/60 mt-1 line-clamp-1">
                          {phrase.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            speakYorubaPhrase(phrase.yoruba)
                          }}
                          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-[#EAB308]/30 hover:text-[#FDE047] text-white transition-all border border-white/10"
                          title="Hear Nigerian Yoruba Male Voice"
                        >
                          <Volume2 className="size-4" />
                        </button>
                        <div className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-transform ${
                          isPlaying ? 'bg-[#EAB308] text-[#19352b] scale-110' : 'bg-white/15 text-white'
                        }`}>
                          {isPlaying ? <Music className="size-4 animate-spin" /> : <Play className="size-4 ml-0.5" />}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
