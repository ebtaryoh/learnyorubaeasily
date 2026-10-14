// Safe Web Audio API synthesizer & Nigerian Yoruba Male Voice Engine for LearnYorubaEasily

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

// MASTER PUBLIC AUDIO MUTE:
// Mutes all synthetic oscillator beeps and AI voice fallbacks across the public application
// until real native tutor audio is recorded in the Tutor Voice Studio.
export const IS_PUBLIC_AUDIO_MUTED = true

// 1. PURE TONAL PITCHES (Dò - Re - Mí)
export const TONE_FREQUENCIES = {
  do: 196.0,  // Low tone (G3) - Dò (\)
  re: 261.63, // Mid tone (C4) - Re (—)
  mi: 329.63, // High tone (E4) - Mí (/)
}

export function playTonePitch(tone: 'do' | 're' | 'mi', duration = 0.5) {
  if (IS_PUBLIC_AUDIO_MUTED) return
  const ctx = getAudioContext()
  if (!ctx) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(TONE_FREQUENCIES[tone], ctx.currentTime)

  // Soft warm envelope
  gain.gain.setValueAtTime(0.001, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.05)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + duration)
}

// 2. TALKING DRUM (Gángan) MEMBRANOPHONE SYNTHESIZER
export function playTalkingDrum(toneType: 'do' | 're' | 'mi' | 'bend-up' | 'bend-down' | 'bounce') {
  if (IS_PUBLIC_AUDIO_MUTED) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime

  const osc = ctx.createOscillator()
  const overtone = ctx.createOscillator()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()

  osc.type = 'sine'
  overtone.type = 'triangle'
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(800, now)

  let baseFreq = 150
  if (toneType === 'do') baseFreq = 110
  else if (toneType === 're') baseFreq = 150
  else if (toneType === 'mi') baseFreq = 210
  else if (toneType === 'bend-up') baseFreq = 120
  else if (toneType === 'bend-down') baseFreq = 220
  else if (toneType === 'bounce') baseFreq = 160

  osc.frequency.setValueAtTime(baseFreq, now)
  overtone.frequency.setValueAtTime(baseFreq * 2.1, now)

  if (toneType === 'bend-up') {
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.28)
    overtone.frequency.exponentialRampToValueAtTime(500, now + 0.28)
  } else if (toneType === 'bend-down') {
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.32)
    overtone.frequency.exponentialRampToValueAtTime(230, now + 0.32)
  } else if (toneType === 'bounce') {
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, now + 0.08)
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + 0.25)
  }

  gain.gain.setValueAtTime(0.001, now)
  gain.gain.linearRampToValueAtTime(0.5, now + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38)

  osc.connect(gain)
  overtone.connect(gain)
  gain.connect(filter)
  filter.connect(ctx.destination)

  osc.start(now)
  overtone.start(now)
  osc.stop(now + 0.4)
  overtone.stop(now + 0.4)
}

// 3. PLAY A SEQUENCE OF DRUM BEATS
export function playDrumPhrase(tones: ('do' | 're' | 'mi' | 'bend-up' | 'bend-down')[], intervalMs = 260) {
  if (IS_PUBLIC_AUDIO_MUTED) return
  tones.forEach((t, i) => {
    setTimeout(() => {
      playTalkingDrum(t)
    }, i * intervalMs)
  })
}

// 4. AUTHENTIC NIGERIAN YORUBA MALE PHONETIC DICTIONARY
// Ensures non-Yoruba speech engines articulate words with exact Nigerian Yoruba male phonology
const YORUBA_PHONETIC_MAP: Record<string, string> = {
  // Greetings
  'báwo ni': 'bah-woh nee',
  'báwo ni?': 'bah-woh nee',
  'báwo': 'bah-woh',
  'ẹ káàárọ̀': 'eh kah-ah-roh',
  'ẹ káàárọ̀ o': 'eh kah-ah-roh oh',
  'ẹ káàsán': 'eh kah-ah-sahn',
  'ẹ káalẹ́': 'eh kah-ah-leh',
  'o dábọ̀': 'oh dah-baw',
  'ó dàbọ̀': 'oh dah-baw',
  'ẹ kúulé': 'eh koo-oo-lay',
  'ẹ káàbọ̀': 'eh kah-ah-baw',
  'ẹ káàbọ̀ o!': 'eh kah-ah-baw oh',
  'o dárọ̀': 'oh dah-roh',
  'pẹ̀lẹ́': 'peh-leh',
  'ṣé dáadáa ni?': 'shay dah-dah nee',
  'ṣé àlàáfíà ni?': 'shay ah-lah-fee-ah nee',
  'àlàáfíà ni': 'ah-lah-fee-ah nee',

  // Politeness & Common Expressions
  'ẹ ṣé': 'eh shay',
  'o ṣé': 'oh shay',
  'ẹ ṣeun': 'eh shay-oon',
  'ẹ ṣeun o': 'eh shay-oon oh',
  'ẹ ṣeun o.': 'eh shay-oon oh',
  'jọ̀wọ́': 'jaw-waw',
  'ẹ pẹ̀lẹ́': 'eh peh-leh',
  'mi o bínú': 'mee oh bee-noo',
  'kò tọ́pẹ́': 'koh taw-peh',
  'ẹ má bínú': 'eh mah bee-noo',
  'ẹ kú iṣẹ́': 'eh koo ee-sheh',
  'mo dúpẹ́': 'moh doo-peh',
  'inú mi dùn': 'ee-noo mee doon',
  'bẹ́ẹ̀ni': 'beh-eh-nee',
  'rárá': 'rah-rah',
  'kí ni?': 'kee nee',
  'níbo?': 'nee-boh',
  'ta ni?': 'tah nee',
  'nígbà wo?': 'nee-gbah woh',
  'kí nìdí?': 'kee nee-dee',
  'ó kéré': 'oh keh-reh',
  'ó pọ̀': 'oh paw',
  'omi': 'oh-mee',
  'oúnjẹ': 'oh-oon-jeh',
  'ọjà': 'aw-jah',
  'ilé': 'ee-lay',
  'owó': 'oh-woh',
  'ọwọ́': 'aw-waw',
  'owo': 'oh-woh',
  'òwò': 'oh-woh',
  'aṣọ': 'ah-shaw',
  'bàtà': 'bah-tah',
  'oòrùn': 'oh-oh-roon',
  'òjò': 'oh-joh',
  'ilẹ̀': 'ee-leh',
  'ọ̀rẹ́': 'aw-reh',
  'ìyá': 'ee-yah',
  'bàbá': 'bah-bah',
  'ẹ̀gbọ́n': 'eh-gbawn',
  'àbúrò': 'ah-boo-roh',
  'ọkọ': 'aw-kaw',
  'aya': 'ah-yah',
  'ọmọ': 'aw-maw',
  'ẹbí': 'eh-bee',
  'orí': 'oh-ree',
  'ojú': 'oh-joo',
  'imú': 'ee-moo',
  'ẹnu': 'eh-noo',
  'etí': 'eh-tee',
  'ẹsẹ̀': 'eh-seh',
  'inú': 'ee-noo',
  'ọkàn': 'aw-kahn',
  'ẹ̀jẹ̀': 'eh-jeh',

  // Animals
  'kìnìún': 'kee-nee-oon',
  'erin': 'eh-reen',
  'ẹkùn': 'eh-koon',
  'ẹdun': 'eh-doon',
  'ìjàpá': 'ee-jah-pah',
  'ẹyẹ': 'eh-yeh',
  'ẹja': 'eh-jah',
  'aguntan': 'ah-goon-tahn',

  // Numbers
  'ení': 'eh-nee',
  'oókan': 'oh-oh-kahn',
  'èjì': 'ay-jee',
  'ẹta': 'eh-tah',
  'ẹ̀rin': 'eh-reen',
  'àrún': 'ah-roon',
  'ẹ̀fà': 'eh-fah',
  'èje': 'ay-jeh',
  'ẹjọ': 'eh-jaw',
  'ẹ̀sán': 'eh-sahn',
  'ẹ̀wá': 'eh-wah',

  // Names
  'ayọ̀kúnlé': 'ah-yor-koon-lay',
  'adérónkẹ́': 'ah-day-ron-kay',
  'ọlọ́ládé': 'aw-law-lah-day',
  'tèmítọ́pẹ́': 'tay-mee-taw-pay',
  'babátúndé': 'bah-bah-toon-day',
  'ayọ̀mídé': 'ah-yor-mee-day',
  'adéwálé': 'ah-day-wah-lay',
  'fọláṣadé': 'faw-lah-shah-day',
  'olúwaṣeun': 'oh-loo-wah-shay-oon',
  'àbíkẹ́': 'ah-bee-kay',
  'damilọ́lá': 'dah-mee-law-lah',
  'ìfẹ́olúwa': 'ee-fay-oh-loo-wah',
  'tìwalọlá': 'tee-wah-law-lah',
  'káyọ̀dé': 'kah-yor-day',
  'moróunmúbọ̀': 'moh-rohn-moo-baw',

  // Proverbs
  'àgbájọ ọwọ́ la fi ń sọ̀yà; àjèjé ọwọ́ kan kò gbégbá dé orí.': 'Ah-gbah-jaw aw-waw lah fee n saw-yah; ah-jay-jay aw-waw kahn kaw gbay-gbah day oh-ree.',
  'ilé la ti ń kọ́ ẹ̀ṣọ́ ròde.': 'Ee-lay lah tee n kaw eh-shaw raw-day.',
  'bí ẹ̀mí bá wà, ìrètí ń bẹ.': 'Bee eh-mee bah wah, ee-ray-tee n beh.',
  'ọmọ tí a kò kọ́, ni yóò gbé ilé tí a kọ́ tà.': 'Aw-maw tee ah kaw kaw, nee yaw gbay ee-lay tee ah kaw tah.',
  'ọwọ́ ọmọdé kò tó pẹpẹ, ti àgbàlagbà kò wọ kèrègbè.': 'Aw-waw aw-maw-day kaw taw peh-peh, tee ah-gbah-lah-gbah kaw waw kay-ray-gbay.',
  'a kì í fi ojú olójú ríran.': 'Ah kee ee fee oh-joo oh-law-joo ree-rahn.'
}

export function transliterateYorubaToNigerianMalePhonetics(input: string): string {
  const clean = input.trim()
  const lower = clean.toLowerCase()
  if (YORUBA_PHONETIC_MAP[lower]) {
    return YORUBA_PHONETIC_MAP[lower]
  }

  return clean
    .split(/\s+/)
    .map(word => {
      const punctMatch = word.match(/^([^\wáàéèẹ́ẹ̀íìóòọ́ọ̀úùṣ]*)(.*?)([^\wáàéèẹ́ẹ̀íìóòọ́ọ̀úùṣ]*)$/i)
      const leading = punctMatch ? punctMatch[1] : ''
      const core = punctMatch ? punctMatch[2] : word
      const trailing = punctMatch ? punctMatch[3] : ''

      const coreLower = core.toLowerCase()
      if (YORUBA_PHONETIC_MAP[coreLower]) {
        return leading + YORUBA_PHONETIC_MAP[coreLower] + trailing
      }

      // Syllable rule conversions:
      const phonetic = core
        .replace(/gb/gi, 'gb')
        .replace(/[ṣṢ]/g, 'sh')
        .replace(/[ẹẹ́ẹ̀ẸẸ́Ẹ̀]/g, 'eh')
        .replace(/[ọọ́ọ̀ỌỌ́Ọ̀]/g, 'aw')
        .replace(/[áàāÁÀ]/g, 'ah')
        .replace(/[éèēÉÈ]/g, 'ay')
        .replace(/[íìīÍÌ]/g, 'ee')
        .replace(/[óòōÓÒ]/g, 'oh')
        .replace(/[úùūÚÙ]/g, 'oo')

      return leading + phonetic + trailing
    })
    .join(' ')
}

function isFemaleVoice(name: string): boolean {
  const femaleKeywords = [
    'female', 'woman', 'girl',
    'ezinne', 'zira', 'jenny', 'hazel', 'susan', 'catherine',
    'blessing', 'victoria', 'samantha', 'karen', 'fiona', 'moira',
    'tessa', 'alice', 'elena', 'heera', 'ayanda', 'stacy', 'amy',
    'clara', 'eva', 'stephanie', 'julie', 'linda', 'sarah'
  ]
  const lower = name.toLowerCase()
  return femaleKeywords.some(kw => lower.includes(kw))
}

function selectYorubaMaleVoice(voices: SpeechSynthesisVoice[]): { voice: SpeechSynthesisVoice | null, isNativeYoruba: boolean } {
  if (!voices || voices.length === 0) return { voice: null, isNativeYoruba: false }

  // 1. Native Yoruba Male voice (e.g. Microsoft Abeo Online (Natural) - Yoruba (Nigeria) or Google Yoruba Male)
  const yorubaMale = voices.find(v => 
    (v.lang.toLowerCase().includes('yo') || v.name.toLowerCase().includes('yoruba') || v.name.toLowerCase().includes('abeo')) &&
    !isFemaleVoice(v.name)
  )
  if (yorubaMale) return { voice: yorubaMale, isNativeYoruba: true }

  // 2. Any Yoruba voice (if Abeo or similar)
  const anyYoruba = voices.find(v => v.lang.toLowerCase().includes('yo') || v.name.toLowerCase().includes('yoruba'))
  if (anyYoruba) return { voice: anyYoruba, isNativeYoruba: true }

  // 3. Nigerian Male voice (e.g. Microsoft Emeka Online (Natural) - English (Nigeria))
  const nigerianMale = voices.find(v => 
    (v.lang.toLowerCase().includes('ng') || v.name.toLowerCase().includes('nigeria') || v.name.toLowerCase().includes('emeka')) &&
    !isFemaleVoice(v.name)
  )
  if (nigerianMale) return { voice: nigerianMale, isNativeYoruba: false }

  // 4. African Male voice (e.g. en-GH, en-ZA male)
  const africanMale = voices.find(v =>
    (v.lang.toLowerCase().includes('gh') || v.lang.toLowerCase().includes('za')) &&
    !isFemaleVoice(v.name)
  )
  if (africanMale) return { voice: africanMale, isNativeYoruba: false }

  // Never fall back to Microsoft David or generic robotic English voices for Yoruba
  return { voice: null, isNativeYoruba: false }
}

export interface SpeechCallbacks {
  onStart?: () => void
  onEnd?: () => void
}

let activeAudioElement: HTMLAudioElement | null = null

// Fallback browser speech synthesis ONLY if a real Yoruba or Nigerian/African voice is available in the OS
function fallbackToSpeechSynthesis(text: string, callbacks?: SpeechCallbacks) {
  if (IS_PUBLIC_AUDIO_MUTED || typeof window === 'undefined' || !('speechSynthesis' in window)) {
    callbacks?.onEnd?.()
    return
  }

  try {
    window.speechSynthesis.cancel()
    const voices = window.speechSynthesis.getVoices()
    const { voice, isNativeYoruba } = selectYorubaMaleVoice(voices)

    // If no African/Yoruba voice is installed in the browser, DO NOT speak with robotic American/English voices
    if (!voice) {
      console.warn(`[LearnYorubaEasily] No native Nigerian/Yoruba system voice found. Suppressed robotic fallback.`)
      callbacks?.onEnd?.()
      return
    }

    const textToSpeak = isNativeYoruba ? text : transliterateYorubaToNigerianMalePhonetics(text)
    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.voice = voice

    utterance.pitch = 0.88
    utterance.rate = 0.85
    utterance.volume = 1.0

    if (callbacks?.onStart) utterance.onstart = callbacks.onStart
    if (callbacks?.onEnd) utterance.onend = callbacks.onEnd
    utterance.onerror = () => callbacks?.onEnd?.()

    window.speechSynthesis.speak(utterance)
  } catch (err) {
    console.error('Speech synthesis fallback failed:', err)
    callbacks?.onEnd?.()
  }
}

// 5. AUTHENTIC NIGERIAN YORUBA MALE SPEECH ENGINE
// Streams and plays crystal-clear authentic Nigerian Yoruba neural audio (Abeo)
export function speakYorubaPhrase(text: string, callbacks?: SpeechCallbacks) {
  if (typeof window === 'undefined') return

  // Complete mute on public app pending Tutor Voice Studio recording completion
  if (IS_PUBLIC_AUDIO_MUTED) {
    callbacks?.onEnd?.()
    return
  }

  const clean = text.trim()
  if (!clean) {
    callbacks?.onEnd?.()
    return
  }

  // Stop any currently playing audio
  if (activeAudioElement) {
    try {
      activeAudioElement.pause()
      activeAudioElement.currentTime = 0
    } catch {
      // Ignore pause error on inactive elements
    }
    activeAudioElement = null
  }

  // Cancel any ongoing browser speech synthesis
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel()
    } catch {
      // Ignore cancel error
    }
  }

  // Construct TTS endpoint URL for authentic Nigerian Yoruba Male Voice
  const audioUrl = `/api/tts?text=${encodeURIComponent(clean)}`
  const audio = new Audio(audioUrl)
  activeAudioElement = audio

  let hasEnded = false
  const safeEnd = () => {
    if (hasEnded) return
    hasEnded = true
    if (activeAudioElement === audio) {
      activeAudioElement = null
    }
    callbacks?.onEnd?.()
  }

  audio.onplay = () => {
    callbacks?.onStart?.()
  }

  audio.onended = () => {
    safeEnd()
  }

  audio.onerror = () => {
    // Human voice pending recording — stay completely silent without robotic fallback
    safeEnd()
  }

  const playPromise = audio.play()
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Audio pending or blocked — stay completely silent
      safeEnd()
    })
  }
}

