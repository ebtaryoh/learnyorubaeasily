'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Mic, Square, Play, RotateCcw, CheckCircle2, ChevronRight,
  ChevronLeft, Sparkles, Volume2, ArrowLeft, Radio,
  Filter, Check, HelpCircle, AlertCircle, Headphones
} from 'lucide-react'

interface StudioItem {
  id: string
  category: 'tones' | 'chameleon' | 'greetings' | 'kids' | 'proverbs'
  categoryLabel: string
  yoruba: string
  tones: string
  phonetic: string
  meaning: string
  tip?: string
}

const STUDIO_ITEMS: StudioItem[] = [
  // PART 1: The 3 Core Tones
  {
    id: 'tone-do',
    category: 'tones',
    categoryLabel: 'Musical Tones',
    yoruba: 'Dò',
    tones: 'Low Pitch (\\)',
    phonetic: 'Dòò (deep, settled chest pitch)',
    meaning: 'Low Tone mark — grave accent (\\)',
    tip: 'Drop your pitch low like the bottom note of a chord.'
  },
  {
    id: 'tone-re',
    category: 'tones',
    categoryLabel: 'Musical Tones',
    yoruba: 'Re',
    tones: 'Mid Pitch (—)',
    phonetic: 'Ray (natural speaking level)',
    meaning: 'Mid Tone mark — flat / unmarked (—)',
    tip: 'Speak in your comfortable everyday speaking pitch.'
  },
  {
    id: 'tone-mi',
    category: 'tones',
    categoryLabel: 'Musical Tones',
    yoruba: 'Mí',
    tones: 'High Pitch (/)',
    phonetic: 'Mee (bright, elevated head pitch)',
    meaning: 'High Tone mark — acute accent (/)',
    tip: 'Raise your pitch bright and sharp like a question mark.'
  },

  // PART 2: Chameleon Words
  {
    id: 'cham-owo-money',
    category: 'chameleon',
    categoryLabel: 'Chameleon Words',
    yoruba: 'Owó',
    tones: 'Mí - Mí (High - High)',
    phonetic: 'oh-woh (rising)',
    meaning: 'Money / Wealth',
    tip: 'Keep both syllables elevated and bright.'
  },
  {
    id: 'cham-owo-hand',
    category: 'chameleon',
    categoryLabel: 'Chameleon Words',
    yoruba: 'Ọwọ́',
    tones: 'Re - Mí (Mid - High)',
    phonetic: 'aw-waw (start mid, glide high)',
    meaning: 'Hand / Respect',
    tip: 'Notice open "ọ" sound: starts mid and jumps high.'
  },
  {
    id: 'cham-owo-broom',
    category: 'chameleon',
    categoryLabel: 'Chameleon Words',
    yoruba: 'Owo',
    tones: 'Re - Re (Mid - Mid)',
    phonetic: 'oh-woh (flat level)',
    meaning: 'Broom / Bundle',
    tip: 'Completely flat middle pitch on both syllables.'
  },
  {
    id: 'cham-owo-trade',
    category: 'chameleon',
    categoryLabel: 'Chameleon Words',
    yoruba: 'Òwò',
    tones: 'Dò - Dò (Low - Low)',
    phonetic: 'oh-woh (deep low)',
    meaning: 'Trade / Business / Commerce',
    tip: 'Both syllables low and heavy from the chest.'
  },
  {
    id: 'cham-igba-calabash',
    category: 'chameleon',
    categoryLabel: 'Chameleon Words',
    yoruba: 'Igbá',
    tones: 'Re - Mí (Mid - High)',
    phonetic: 'eeg-bah (high end)',
    meaning: 'Calabash / Carved Gourd',
    tip: 'The second syllable jumps up high.'
  },
  {
    id: 'cham-igba-200',
    category: 'chameleon',
    categoryLabel: 'Chameleon Words',
    yoruba: 'Igba',
    tones: 'Re - Re (Mid - Mid)',
    phonetic: 'eeg-bah (even pitch)',
    meaning: 'Two Hundred (200)',
    tip: 'Even, steady mid-level pitch.'
  },
  {
    id: 'cham-igba-time',
    category: 'chameleon',
    categoryLabel: 'Chameleon Words',
    yoruba: 'Ìgbà',
    tones: 'Dò - Dò (Low - Low)',
    phonetic: 'eeg-bah (deep low)',
    meaning: 'Time / Season / Era',
    tip: 'Both syllables in a relaxed low pitch.'
  },
  {
    id: 'cham-igba-rope',
    category: 'chameleon',
    categoryLabel: 'Chameleon Words',
    yoruba: 'Igbà',
    tones: 'Re - Dò (Mid - Low)',
    phonetic: 'eeg-bah (drop down)',
    meaning: "Climber's Palm Rope",
    tip: 'Starts middle and drops down on the second syllable.'
  },
  {
    id: 'cham-egbe-society',
    category: 'chameleon',
    categoryLabel: 'Chameleon Words',
    yoruba: 'Ẹgbẹ́',
    tones: 'Re - Mí (Mid - High)',
    phonetic: 'eh-gbeh (jumps high)',
    meaning: 'Society / Club / Peer Group',
    tip: 'Open "ẹ" vowel jumping up to high tone.'
  },
  {
    id: 'cham-egbe-side',
    category: 'chameleon',
    categoryLabel: 'Chameleon Words',
    yoruba: 'Ẹ̀gbẹ́',
    tones: 'Dò - Mí (Low - High)',
    phonetic: 'eh-gbeh (low to high swoop)',
    meaning: 'Side / Flank / By the side',
    tip: 'Dramatic melodic jump from low "Ẹ̀" to high "gbẹ́".'
  },
  {
    id: 'cham-egbe-loss',
    category: 'chameleon',
    categoryLabel: 'Chameleon Words',
    yoruba: 'Egbe',
    tones: 'Re - Re (Mid - Mid)',
    phonetic: 'ay-gbeh (neutral)',
    meaning: 'Loss / Perishing / Void',
    tip: 'Closed "e" vowel with neutral mid pitch.'
  },

  // PART 3: Greetings & Courtesies
  {
    id: 'greet-bawo-ni',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'Báwo ni?',
    tones: 'Mí - Re - Re',
    phonetic: 'BAH-woh nee?',
    meaning: 'How are you? / Hello',
    tip: 'The universal warm Yoruba greeting.'
  },
  {
    id: 'greet-e-kaaro',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'Ẹ káàárọ̀',
    tones: 'Re - Mí - Dò',
    phonetic: 'eh KAH-ah-roh',
    meaning: 'Good morning (respectful elder form)',
    tip: 'Respectful prefix "Ẹ" with long morning vowel.'
  },
  {
    id: 'greet-e-kaasan',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'Ẹ káàsán',
    tones: 'Re - Mí - Mí',
    phonetic: 'eh KAH-ah-sahn',
    meaning: 'Good afternoon',
    tip: 'Warm daytime greeting.'
  },
  {
    id: 'greet-e-kaale',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'Ẹ káalẹ́',
    tones: 'Re - Mí - Mí',
    phonetic: 'eh KAH-ah-leh',
    meaning: 'Good evening',
    tip: 'Evening greeting spoken with gentle dignity.'
  },
  {
    id: 'greet-o-dabo',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'Ó dàbọ̀',
    tones: 'Mí - Dò - Dò',
    phonetic: 'OH dah-baw',
    meaning: 'Goodbye / Until we meet again',
    tip: 'High "Ó" followed by two low tones.'
  },
  {
    id: 'greet-e-kuule',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'Ẹ kúulé',
    tones: 'Re - Mí - Mí',
    phonetic: 'eh KOO-oo-lay',
    meaning: 'Greeting when arriving at home',
    tip: 'Announcing your return to the household.'
  },
  {
    id: 'greet-e-kaabo',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'Ẹ káàbọ̀',
    tones: 'Re - Mí - Dò',
    phonetic: 'eh KAH-ah-baw',
    meaning: 'Welcome',
    tip: 'Greeting visitors when they arrive.'
  },
  {
    id: 'greet-e-kaabo-o',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'Ẹ káàbọ̀ o!',
    tones: 'Re - Mí - Dò - Re',
    phonetic: 'eh KAH-ah-baw oh!',
    meaning: 'Warm welcome!',
    tip: 'Affectionate emphasis with trailing "o".'
  },
  {
    id: 'greet-o-daro',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'O dárọ̀',
    tones: 'Re - Mí - Dò',
    phonetic: 'oh DAH-roh',
    meaning: 'Good night / Until morning comes',
    tip: 'Peaceful night-time departure.'
  },
  {
    id: 'greet-pele',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'Pẹ̀lẹ́',
    tones: 'Dò - Mí',
    phonetic: 'PEH-leh',
    meaning: 'Gentle / Sorry / Comfort',
    tip: 'Empathy word used constantly in Yoruba culture.'
  },
  {
    id: 'greet-se-daadaa',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'Ṣé dáadáa ni?',
    tones: 'Mí - Mí - Mí - Re',
    phonetic: 'Shay DAH-dah nee?',
    meaning: 'Is everything good with you?',
    tip: 'Friendly check-in phrase.'
  },
  {
    id: 'greet-se-alaafia',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'Ṣé àlàáfíà ni?',
    tones: 'Mí - Dò - Dò - Mí - Mí - Re',
    phonetic: 'Shay ah-lah-FEE-ah nee?',
    meaning: 'Are you in good health and peace?',
    tip: 'Inquiring about total wellbeing and harmony.'
  },
  {
    id: 'greet-alaafia-ni',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'Àlàáfíà ni',
    tones: 'Dò - Dò - Mí - Mí - Re',
    phonetic: 'Ah-lah-FEE-ah nee',
    meaning: 'All is peaceful / I am well',
    tip: 'The standard affirming reply.'
  },
  {
    id: 'greet-e-se',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'Ẹ ṣé',
    tones: 'Re - Mí',
    phonetic: 'eh SHAY',
    meaning: 'Thank you (respectful)',
    tip: 'Essential courteous expression.'
  },
  {
    id: 'greet-e-seun-o',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'Ẹ ṣeun o',
    tones: 'Re - Re - Re - Re',
    phonetic: 'eh shay-oon oh',
    meaning: 'Thank you very much indeed',
    tip: 'Deep gratitude to elders or friends.'
  },
  {
    id: 'greet-jowo',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'Jọ̀wọ́',
    tones: 'Dò - Mí',
    phonetic: 'jaw-WAW',
    meaning: 'Please',
    tip: 'Polite request word.'
  },
  {
    id: 'greet-mo-dupe',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'Mo dúpẹ́',
    tones: 'Re - Mí - Mí',
    phonetic: 'moh DOO-peh',
    meaning: 'I give thanks / I am grateful',
    tip: 'Personal expression of thanksgiving.'
  },
  {
    id: 'greet-inu-mi-dun',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'Inú mi dùn',
    tones: 'Re - Mí - Re - Dò',
    phonetic: 'ee-NOO mee doon',
    meaning: 'I am happy / My inside is sweet',
    tip: 'Literal translation: "My inside is sweet".'
  },
  {
    id: 'greet-beeni',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'Bẹ́ẹ̀ni',
    tones: 'Mí - Dò - Re',
    phonetic: 'BEH-eh-nee',
    meaning: 'Yes',
    tip: 'Clear agreement.'
  },
  {
    id: 'greet-rara',
    category: 'greetings',
    categoryLabel: 'Greetings',
    yoruba: 'Rárá',
    tones: 'Mí - Mí',
    phonetic: 'RAH-RAH',
    meaning: 'No',
    tip: 'Polite refusal or negation.'
  },

  // PART 4: Safari Animals & Numbers
  {
    id: 'safari-kiniun',
    category: 'kids',
    categoryLabel: 'Safari Kids',
    yoruba: 'Kìnìún',
    tones: 'Dò - Dò - Mí',
    phonetic: 'kee-nee-OON',
    meaning: 'Lion (King of the Forest)',
    tip: 'Animal vocabulary.'
  },
  {
    id: 'safari-erin',
    category: 'kids',
    categoryLabel: 'Safari Kids',
    yoruba: 'Erin',
    tones: 'Re - Re',
    phonetic: 'eh-reen',
    meaning: 'Elephant (Symbol of Majesty)',
    tip: 'Smooth mid pitch.'
  },
  {
    id: 'safari-ekun',
    category: 'kids',
    categoryLabel: 'Safari Kids',
    yoruba: 'Ẹkùn',
    tones: 'Re - Dò',
    phonetic: 'eh-KOON',
    meaning: 'Leopard / Tiger',
    tip: 'Drops to low pitch on "kùn".'
  },
  {
    id: 'safari-edun',
    category: 'kids',
    categoryLabel: 'Safari Kids',
    yoruba: 'Ẹdun',
    tones: 'Re - Re',
    phonetic: 'eh-doon',
    meaning: 'Colobus Monkey',
    tip: 'Even, lively tone.'
  },
  {
    id: 'safari-ijapa',
    category: 'kids',
    categoryLabel: 'Safari Kids',
    yoruba: 'Ìjàpá',
    tones: 'Dò - Dò - Mí',
    phonetic: 'ee-jah-PAH',
    meaning: 'Tortoise (Clever Folk Legend)',
    tip: 'Two low syllables ending with a high snap.'
  },
  {
    id: 'safari-eye',
    category: 'kids',
    categoryLabel: 'Safari Kids',
    yoruba: 'Ẹyẹ',
    tones: 'Re - Re',
    phonetic: 'eh-yeh',
    meaning: 'Bird',
    tip: 'Light and airy.'
  },
  {
    id: 'safari-eja',
    category: 'kids',
    categoryLabel: 'Safari Kids',
    yoruba: 'Ẹja',
    tones: 'Re - Re',
    phonetic: 'eh-jah',
    meaning: 'Fish',
    tip: 'Everyday staple vocabulary.'
  },
  {
    id: 'safari-aguntan',
    category: 'kids',
    categoryLabel: 'Safari Kids',
    yoruba: 'Aguntan',
    tones: 'Re - Re - Re',
    phonetic: 'ah-goon-tahn',
    meaning: 'Sheep',
    tip: 'Calm, gentle cadence.'
  },

  // Numbers 1 - 10
  {
    id: 'num-1-ookan',
    category: 'kids',
    categoryLabel: 'Safari Kids',
    yoruba: 'Oókan',
    tones: 'Re - Mí - Re',
    phonetic: 'oh-OH-kahn',
    meaning: 'One (1)',
    tip: 'Number count.'
  },
  {
    id: 'num-2-eji',
    category: 'kids',
    categoryLabel: 'Safari Kids',
    yoruba: 'Èjì',
    tones: 'Dò - Dò',
    phonetic: 'ay-jee',
    meaning: 'Two (2)',
    tip: 'Low, grounded pitch.'
  },
  {
    id: 'num-3-eta',
    category: 'kids',
    categoryLabel: 'Safari Kids',
    yoruba: 'Ẹta',
    tones: 'Re - Re',
    phonetic: 'eh-tah',
    meaning: 'Three (3)',
    tip: 'Neutral middle pitch.'
  },
  {
    id: 'num-4-erin',
    category: 'kids',
    categoryLabel: 'Safari Kids',
    yoruba: 'Ẹ̀rin',
    tones: 'Dò - Re',
    phonetic: 'eh-reen',
    meaning: 'Four (4)',
    tip: 'Note: open Ẹ with low tone dot.'
  },
  {
    id: 'num-5-arun',
    category: 'kids',
    categoryLabel: 'Safari Kids',
    yoruba: 'Àrún',
    tones: 'Dò - Mí',
    phonetic: 'ah-ROON',
    meaning: 'Five (5)',
    tip: 'Low to high pitch step.'
  },
  {
    id: 'num-6-efa',
    category: 'kids',
    categoryLabel: 'Safari Kids',
    yoruba: 'Ẹ̀fà',
    tones: 'Dò - Dò',
    phonetic: 'eh-fah',
    meaning: 'Six (6)',
    tip: 'Both syllables low.'
  },
  {
    id: 'num-7-eje',
    category: 'kids',
    categoryLabel: 'Safari Kids',
    yoruba: 'Èje',
    tones: 'Dò - Re',
    phonetic: 'ay-jeh',
    meaning: 'Seven (7)',
    tip: 'Low then mid.'
  },
  {
    id: 'num-8-ejo',
    category: 'kids',
    categoryLabel: 'Safari Kids',
    yoruba: 'Ẹjọ',
    tones: 'Re - Re',
    phonetic: 'eh-jaw',
    meaning: 'Eight (8)',
    tip: 'Steady mid pitch.'
  },
  {
    id: 'num-9-esan',
    category: 'kids',
    categoryLabel: 'Safari Kids',
    yoruba: 'Ẹ̀sán',
    tones: 'Dò - Mí',
    phonetic: 'eh-SAHN',
    meaning: 'Nine (9)',
    tip: 'Low to high leap.'
  },
  {
    id: 'num-10-ewa',
    category: 'kids',
    categoryLabel: 'Safari Kids',
    yoruba: 'Ẹ̀wá',
    tones: 'Dò - Mí',
    phonetic: 'eh-WAH',
    meaning: 'Ten (10)',
    tip: 'Low to high finish.'
  },

  // PART 5: Proverbs
  {
    id: 'prov-ka-rin-ka-po',
    category: 'proverbs',
    categoryLabel: 'Proverbs',
    yoruba: 'Ká rìn ká pọ̀, yíyẹ ní ń yẹ ni.',
    tones: 'Mí - Dò - Mí - Dò - Mí - Re',
    phonetic: 'Kah reen kah paw, yee-yeh nee n yeh nee.',
    meaning: 'Walking together brings dignity and glory.',
    tip: 'Read with calm, rhythmic communal pride.'
  },
  {
    id: 'prov-agbajo-owo',
    category: 'proverbs',
    categoryLabel: 'Proverbs',
    yoruba: 'Àgbájọ ọwọ́ la fi ń sọ̀yà; àjèjé ọwọ́ kan kò gbégbá dé orí.',
    tones: 'Dò - Mí - Dò ...',
    phonetic: 'Ah-gbah-jaw aw-waw lah fee n saw-yah; ah-jay-jay aw-waw kahn kaw gbay-gbah day oh-ree.',
    meaning: 'A clenched bundle of fingers strikes the chest with strength; a single hand cannot hoist a calabash onto the head.',
    tip: 'Pause slightly at the semicolon.'
  },
  {
    id: 'prov-ile-la-ti-n-ko',
    category: 'proverbs',
    categoryLabel: 'Proverbs',
    yoruba: 'Ilé la ti ń kọ́ ẹ̀ṣọ́ ròde.',
    tones: 'Re - Mí - Re ...',
    phonetic: 'Ee-lay lah tee n kaw eh-shaw raw-day.',
    meaning: 'Charity and good character must be nurtured inside the home before being displayed outside.',
    tip: 'Expressive maternal or paternal wisdom.'
  },
  {
    id: 'prov-bi-emi-ba-wa',
    category: 'proverbs',
    categoryLabel: 'Proverbs',
    yoruba: 'Bí ẹ̀mí bá wà, ìrètí ń bẹ.',
    tones: 'Mí - Dò - Mí ...',
    phonetic: 'Bee eh-mee bah wah, ee-ray-tee n beh.',
    meaning: 'Where there is life, there is hope.',
    tip: 'Gentle, uplifting delivery.'
  },
  {
    id: 'prov-omo-ti-a-ko-ko',
    category: 'proverbs',
    categoryLabel: 'Proverbs',
    yoruba: 'Ọmọ tí a kò kọ́, ni yóò gbé ilé tí a kọ́ tà.',
    tones: 'Re - Mí - Re ...',
    phonetic: 'Aw-maw tee ah kaw kaw, nee yaw gbay ee-lay tee ah kaw tah.',
    meaning: 'The child we fail to educate will eventually sell the palace we laboured to build.',
    tip: 'Serious philosophical cadence.'
  },
  {
    id: 'prov-owo-omode',
    category: 'proverbs',
    categoryLabel: 'Proverbs',
    yoruba: 'Ọwọ́ ọmọdé kò tó pẹpẹ, ti àgbàlagbà kò wọ kèrègbè.',
    tones: 'Re - Mí ...',
    phonetic: 'Aw-waw aw-maw-day kaw taw peh-peh, tee ah-gbah-lah-gbah kaw waw kay-ray-gbay.',
    meaning: "A child's hand cannot reach the high shelf, but an elder's hand cannot fit inside the narrow gourd neck. We need each other.",
    tip: 'Celebrate mutual balance.'
  }
]

export default function TutorRecordingStudioPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [humanRecordings, setHumanRecordings] = useState<Record<string, any>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [volumeLevel, setVolumeLevel] = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const timerIntervalRef = useRef<any>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const previewAudioRef = useRef<HTMLAudioElement | null>(null)

  // Filtered items
  const filteredItems = STUDIO_ITEMS.filter(item => {
    if (activeCategory === 'all') return true
    return item.category === activeCategory
  })

  const currentItem = filteredItems[currentIndex] || STUDIO_ITEMS[0]
  const currentKey = currentItem?.yoruba
  const isCurrentlyRecorded = Boolean(humanRecordings[currentKey]?.exists)

  // Load existing recorded status on mount
  useEffect(() => {
    fetchStatus()
  }, [])

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/audio/status')
      const data = await res.json()
      if (data && data.humanRecordings) {
        setHumanRecordings(data.humanRecordings)
      }
    } catch (e) {
      console.warn('Could not load recording status', e)
    }
  }

  // Reset preview audio when navigating items
  useEffect(() => {
    setAudioUrl(null)
    setSaveSuccess(false)
    setErrorMessage(null)
    if (previewAudioRef.current) {
      previewAudioRef.current.pause()
      previewAudioRef.current.currentTime = 0
    }
  }, [currentIndex, activeCategory])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return

      if (e.code === 'Space') {
        e.preventDefault()
        if (isRecording) {
          stopRecording()
        } else {
          startRecording()
        }
      } else if (e.code === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.code === 'KeyP') {
        e.preventDefault()
        playCurrentOrPreview()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isRecording, currentIndex, filteredItems, audioUrl, isCurrentlyRecorded])

  // Start live microphone recording
  const startRecording = async () => {
    try {
      setErrorMessage(null)
      setSaveSuccess(false)
      audioChunksRef.current = []

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      })
      streamRef.current = stream

      // Set up audio meter analyzer
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtxClass) {
        const audioCtx = new AudioCtxClass()
        audioContextRef.current = audioCtx
        const source = audioCtx.createMediaStreamSource(stream)
        const analyser = audioCtx.createAnalyser()
        analyser.fftSize = 64
        source.connect(analyser)
        analyserRef.current = analyser

        const dataArray = new Uint8Array(analyser.frequencyBinCount)
        const updateMeter = () => {
          if (!analyserRef.current) return
          analyserRef.current.getByteFrequencyData(dataArray)
          let sum = 0
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i]
          }
          const avg = sum / dataArray.length
          setVolumeLevel(Math.min(100, Math.round((avg / 128) * 100)))
          animFrameRef.current = requestAnimationFrame(updateMeter)
        }
        updateMeter()
      }

      // Determine best audio mime type
      let mimeType = 'audio/webm;codecs=opus'
      if (typeof MediaRecorder.isTypeSupported === 'function') {
        if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          mimeType = 'audio/webm;codecs=opus'
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4'
        } else if (MediaRecorder.isTypeSupported('audio/wav')) {
          mimeType = 'audio/wav'
        }
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType })
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const recordedBlob = new Blob(audioChunksRef.current, { type: mimeType })
        const previewUrl = URL.createObjectURL(recordedBlob)
        setAudioUrl(previewUrl)

        // Clean up audio context
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close().catch(() => {})
        }
        setVolumeLevel(0)

        // Automatically upload and save file
        await uploadRecording(recordedBlob)
      }

      mediaRecorder.start(100) // collect chunks every 100ms
      setIsRecording(true)
      setRecordingSeconds(0)

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1)
      }, 1000)

    } catch (err: any) {
      console.error('Microphone error:', err)
      setErrorMessage(
        err.name === 'NotAllowedError'
          ? 'Microphone access was denied. Please allow microphone permissions in your browser bar.'
          : `Microphone error: ${err.message || 'Could not start recording.'}`
      )
      setIsRecording(false)
    }
  }

  // Stop recording
  const stopRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }

    setIsRecording(false)
  }

  // Upload recording to backend API
  const uploadRecording = async (blob: Blob) => {
    setIsSaving(true)
    setErrorMessage(null)

    try {
      const formData = new FormData()
      formData.append('file', blob, `recording.${blob.type.includes('mp4') ? 'mp4' : 'webm'}`)
      formData.append('text', currentItem.yoruba)
      formData.append('id', currentItem.id)
      formData.append('category', currentItem.category)

      const res = await fetch('/api/audio/record', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to save recording')
      }

      setSaveSuccess(true)
      // Update local state
      setHumanRecordings(prev => ({
        ...prev,
        [currentItem.yoruba]: {
          exists: true,
          url: data.url,
          filename: data.filename,
          recordedAt: data.recordedAt
        }
      }))
    } catch (err: any) {
      console.error('Upload failed:', err)
      setErrorMessage(err.message || 'Failed to save recording')
    } finally {
      setIsSaving(false)
    }
  }

  const playCurrentOrPreview = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl)
      audio.play().catch(console.warn)
      return
    }

    if (humanRecordings[currentItem.yoruba]?.url) {
      const audio = new Audio(humanRecordings[currentItem.yoruba].url)
      audio.play().catch(console.warn)
      return
    }
  }

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  // Count overall stats
  const totalRecordedCount = Object.keys(humanRecordings).filter(
    k => humanRecordings[k]?.exists
  ).length
  const totalPercentage = Math.round((totalRecordedCount / STUDIO_ITEMS.length) * 100)

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#19352b] antialiased">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-[#19352b]/10 bg-white/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#19352b]/70 hover:text-[#19352b] transition-colors"
            >
              <ArrowLeft className="size-4" /> Back to Site
            </Link>
            <div className="h-4 w-px bg-[#19352b]/15" />
            <div className="flex items-center gap-2">
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="font-serif text-lg sm:text-xl font-bold tracking-tight">
                Tutor Voice Studio
              </h1>
            </div>
          </div>

          {/* Overall Progress Badge */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-bold text-[#19352b]">
                {totalRecordedCount} of {STUDIO_ITEMS.length} Recorded
              </span>
              <span className="text-[10px] text-[#19352b]/60 font-medium">
                {totalPercentage}% Native Studio Voice
              </span>
            </div>
            <div className="w-24 sm:w-32 h-2.5 rounded-full bg-[#19352b]/10 overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${totalPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Intro banner */}
        <div className="rounded-2xl bg-white p-5 border border-[#19352b]/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EAB308]/15 px-3 py-1 text-[11px] font-semibold text-[#19352b] uppercase tracking-wider mb-2">
              <Sparkles className="size-3 text-[#EAB308]" /> 100% Studio Human Voice
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold">
              Record Your Voice for LearnYorubaEasily
            </h2>
            <p className="text-xs sm:text-sm text-[#19352b]/70 mt-1 max-w-2xl">
              Tap the red record button, read the word naturally in your native Yoruba male voice, and tap stop. It saves directly to the live website instantly!
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#f8f6f0] p-3 rounded-xl border border-[#19352b]/10 text-xs text-[#19352b]/80 shrink-0">
            <Headphones className="size-4 text-[#577565]" />
            <span>Shortcuts: <strong>Spacebar</strong> to Record • <strong>&rarr;</strong> Next</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: `All Items (${STUDIO_ITEMS.length})` },
            { id: 'tones', label: 'Musical Tones (3)' },
            { id: 'chameleon', label: 'Chameleon Words (11)' },
            { id: 'greetings', label: 'Greetings (20)' },
            { id: 'kids', label: 'Safari Kids (18)' },
            { id: 'proverbs', label: 'Proverbs (6)' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id)
                setCurrentIndex(0)
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[#19352b] text-white shadow-sm'
                  : 'bg-white border border-[#19352b]/10 text-[#19352b]/70 hover:bg-white/80 hover:text-[#19352b]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Recording Workspace Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Teleprompter Card (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="relative rounded-3xl bg-white p-8 sm:p-12 border border-[#19352b]/10 shadow-lg overflow-hidden">
              
              {/* Category & Status Bar */}
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#19352b]/5 px-3 py-1 text-xs font-semibold text-[#19352b]">
                  {currentItem.categoryLabel} • #{currentIndex + 1} of {filteredItems.length}
                </span>

                {isCurrentlyRecorded ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 text-xs font-semibold">
                    <CheckCircle2 className="size-3.5" /> Human Voice Live
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 text-xs font-semibold">
                    <Radio className="size-3.5 text-amber-600 animate-pulse" /> Needs Native Recording
                  </span>
                )}
              </div>

              {/* Giant Prompt Typography */}
              <div className="mt-8 text-center py-6">
                <span className="font-mono text-sm uppercase tracking-widest text-[#EAB308] font-bold">
                  {currentItem.tones}
                </span>
                
                <h3 className="mt-3 font-serif text-5xl sm:text-7xl font-bold tracking-tight text-[#19352b]">
                  {currentItem.yoruba}
                </h3>

                <p className="mt-3 font-mono text-sm sm:text-base text-[#19352b]/70 italic">
                  Pronounce as: &ldquo;{currentItem.phonetic}&rdquo;
                </p>

                <div className="mt-4 inline-block bg-[#f8f6f0] px-5 py-2 rounded-xl border border-[#19352b]/10">
                  <span className="text-sm sm:text-base font-semibold text-[#19352b]">
                    {currentItem.meaning}
                  </span>
                </div>

                {currentItem.tip && (
                  <p className="mt-4 text-xs text-[#19352b]/60 max-w-md mx-auto">
                    💡 <strong>Tutor Tip:</strong> {currentItem.tip}
                  </p>
                )}
              </div>

              {/* Live Volume Wave Meter during recording */}
              {isRecording && (
                <div className="mt-4 flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center gap-1 h-8">
                    {[15, 30, 60, 90, 45, 80, 100, 70, 50, 30, 60, 85, 40, 75, 95, 60, 30].map((h, i) => {
                      const dynamicHeight = Math.max(6, Math.round((volumeLevel / 100) * h))
                      return (
                        <div
                          key={i}
                          className="w-1.5 bg-red-500 rounded-full transition-all duration-75"
                          style={{ height: `${dynamicHeight}px` }}
                        />
                      )
                    })}
                  </div>
                  <span className="text-xs font-mono font-bold text-red-600 animate-pulse">
                    RECORDING LIVE • 00:0{recordingSeconds}s
                  </span>
                </div>
              )}

              {/* Action Error or Success Banner */}
              {errorMessage && (
                <div className="mt-4 rounded-xl bg-red-50 p-4 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {saveSuccess && (
                <div className="mt-4 rounded-xl bg-emerald-50 p-4 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                    <span><strong>Saved!</strong> This phrase now uses your real human voice across the entire website!</span>
                  </div>
                  <button
                    onClick={() => playCurrentOrPreview()}
                    className="underline font-semibold text-emerald-900 hover:text-emerald-700"
                  >
                    Listen now
                  </button>
                </div>
              )}

              {/* Bottom Big Recording Buttons Bar */}
              <div className="mt-10 pt-8 border-t border-[#19352b]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                
                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-semibold text-[#19352b]/70 hover:text-[#19352b] hover:bg-[#19352b]/5 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <ChevronLeft className="size-4" /> Previous
                </button>

                {/* Big Center Record Button */}
                <div className="flex items-center gap-4">
                  {!isRecording ? (
                    <button
                      onClick={startRecording}
                      disabled={isSaving}
                      className="group relative flex size-20 items-center justify-center rounded-full bg-red-600 text-white shadow-xl hover:bg-red-700 hover:scale-105 active:scale-95 transition-all"
                      title="Press Spacebar to Record"
                    >
                      <span className="absolute -inset-2 rounded-full border-2 border-red-400/30 animate-ping pointer-events-none" />
                      <Mic className="size-8" />
                    </button>
                  ) : (
                    <button
                      onClick={stopRecording}
                      className="group relative flex size-20 items-center justify-center rounded-full bg-[#19352b] text-white shadow-xl hover:bg-black hover:scale-105 active:scale-95 transition-all animate-pulse"
                      title="Press Spacebar to Stop"
                    >
                      <Square className="size-8 fill-current" />
                    </button>
                  )}

                  {/* Playback preview if recorded or existing */}
                  {(audioUrl || isCurrentlyRecorded) && (
                    <button
                      onClick={playCurrentOrPreview}
                      className="flex size-12 items-center justify-center rounded-full bg-[#19352b]/5 text-[#19352b] hover:bg-[#19352b]/10 hover:scale-105 active:scale-95 transition-all border border-[#19352b]/10"
                      title="Play Preview"
                    >
                      <Volume2 className="size-5" />
                    </button>
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  disabled={currentIndex === filteredItems.length - 1}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#19352b] text-white px-6 py-2.5 text-xs font-semibold hover:bg-[#19352b]/90 hover:shadow-md disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  Next Phrase <ChevronRight className="size-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Right Sidebar Checklist (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-white p-6 border border-[#19352b]/10 shadow-sm flex flex-col h-[650px]">
            <div className="flex items-center justify-between pb-4 border-b border-[#19352b]/10">
              <h4 className="font-serif text-lg font-bold">Curriculum Checklist</h4>
              <span className="text-xs font-semibold text-[#19352b]/60">
                {filteredItems.length} items
              </span>
            </div>

            {/* Scrollable list */}
            <div className="mt-3 flex-1 overflow-y-auto space-y-1.5 pr-1">
              {filteredItems.map((item, idx) => {
                const isSelected = idx === currentIndex
                const isRecorded = Boolean(humanRecordings[item.yoruba]?.exists)

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-all ${
                      isSelected
                        ? 'bg-[#19352b] text-white shadow-sm font-semibold'
                        : 'hover:bg-[#19352b]/5 text-[#19352b]/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`text-[10px] font-mono ${isSelected ? 'text-white/60' : 'text-[#19352b]/40'}`}>
                        {idx + 1}.
                      </span>
                      <div className="truncate">
                        <span className="font-serif text-sm block truncate">
                          {item.yoruba}
                        </span>
                        <span className={`text-[11px] block truncate ${isSelected ? 'text-white/70' : 'text-[#19352b]/50'}`}>
                          {item.meaning}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 ml-2">
                      {isRecorded ? (
                        <div className={`flex size-6 items-center justify-center rounded-full ${isSelected ? 'bg-white text-emerald-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          <Check className="size-3.5" />
                        </div>
                      ) : (
                        <div className={`size-2.5 rounded-full border ${isSelected ? 'border-white/50' : 'border-[#19352b]/20'}`} />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Bottom summary card */}
            <div className="mt-4 pt-4 border-t border-[#19352b]/10 text-[11px] text-[#19352b]/60 flex items-center justify-between">
              <span>All changes apply instantly to the live app.</span>
              <button
                onClick={fetchStatus}
                className="font-semibold text-[#19352b] hover:underline"
              >
                Refresh
              </button>
            </div>
          </div>

        </div>

      </main>
    </div>
  )
}
