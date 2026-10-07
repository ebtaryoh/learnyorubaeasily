'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, RotateCcw, Volume2, Sparkles } from 'lucide-react'

// --- MOCK DATA ---
const flashcards = [
  // Greetings
  { id: 1, yoruba: "Báwo ni?", english: "How are you?", category: "Greetings", phonetic: "bah-woh nee" },
  { id: 2, yoruba: "Ẹ káàárọ̀", english: "Good morning", category: "Greetings", phonetic: "eh kah-ah-roh" },
  { id: 3, yoruba: "Ẹ káàsán", english: "Good afternoon", category: "Greetings", phonetic: "eh kah-ah-sahn" },
  { id: 4, yoruba: "Ẹ káalẹ́", english: "Good evening", category: "Greetings", phonetic: "eh kah-ah-leh" },
  { id: 5, yoruba: "O dábọ̀", english: "Goodbye", category: "Greetings", phonetic: "oh dah-boh" },
  { id: 6, yoruba: "Ẹ kúulé", english: "Welcome (to those at home)", category: "Greetings", phonetic: "eh koo-oo-leh" },
  { id: 7, yoruba: "Ẹ káàbọ̀", english: "Welcome (arriving guest)", category: "Greetings", phonetic: "eh kah-ah-boh" },
  { id: 8, yoruba: "O dárọ̀", english: "Good night", category: "Greetings", phonetic: "oh dah-roh" },
  { id: 9, yoruba: "Pẹ̀lẹ́", english: "Greeting of sympathy / Take it easy", category: "Greetings", phonetic: "peh-leh" },
  { id: 10, yoruba: "Ṣé dáadáa ni?", english: "Are you well? / Fine?", category: "Greetings", phonetic: "shay dah-dah nee" },

  // Politeness
  { id: 11, yoruba: "Ẹ ṣé", english: "Thank you", category: "Politeness", phonetic: "eh shay" },
  { id: 12, yoruba: "Jọ̀wọ́", english: "Please", category: "Politeness", phonetic: "jaw-waw" },
  { id: 13, yoruba: "Ẹ pẹ̀lẹ́", english: "Sorry / Apologies", category: "Politeness", phonetic: "eh peh-leh" },
  { id: 14, yoruba: "Mi o bínú", english: "I am not angry / Don't worry", category: "Politeness", phonetic: "mee oh bee-noo" },
  { id: 15, yoruba: "Kò tọ́pẹ́", english: "Don't mention it / You're welcome", category: "Politeness", phonetic: "koh toh-peh" },
  { id: 16, yoruba: "O ṣé", english: "Thank you (informal)", category: "Politeness", phonetic: "oh shay" },
  { id: 17, yoruba: "Ẹ má bínú", english: "Don't be offended", category: "Politeness", phonetic: "eh mah bee-noo" },
  { id: 18, yoruba: "Ẹ kú iṣẹ́", english: "Well done (at work)", category: "Politeness", phonetic: "eh koo ee-sheh" },
  { id: 19, yoruba: "Mo dúpẹ́", english: "I am grateful", category: "Politeness", phonetic: "moh doo-peh" },
  { id: 20, yoruba: "Inú mi dùn", english: "I am happy / pleased", category: "Politeness", phonetic: "ee-noo mee doon" },

  // Basics
  { id: 21, yoruba: "Bẹ́ẹ̀ni", english: "Yes", category: "Basics", phonetic: "beh-eh-nee" },
  { id: 22, yoruba: "Rárá", english: "No", category: "Basics", phonetic: "rah-rah" },
  { id: 23, yoruba: "Kí ni?", english: "What?", category: "Basics", phonetic: "kee nee" },
  { id: 24, yoruba: "Níbo?", english: "Where?", category: "Basics", phonetic: "nee-boh" },
  { id: 25, yoruba: "Ta ni?", english: "Who?", category: "Basics", phonetic: "tah nee" },
  { id: 26, yoruba: "Báwo?", english: "How?", category: "Basics", phonetic: "bah-woh" },
  { id: 27, yoruba: "Nígbà wo?", english: "When?", category: "Basics", phonetic: "nee-gbah woh" },
  { id: 28, yoruba: "Kí nìdí?", english: "Why?", category: "Basics", phonetic: "kee nee-dee" },
  { id: 29, yoruba: "Ó kéré", english: "It is small", category: "Basics", phonetic: "oh keh-reh" },
  { id: 30, yoruba: "Ó pọ̀", english: "It is a lot / It is plenty", category: "Basics", phonetic: "oh paw" },

  // Everyday
  { id: 31, yoruba: "Omi", english: "Water", category: "Everyday", phonetic: "oh-mee" },
  { id: 32, yoruba: "Oúnjẹ", english: "Food", category: "Everyday", phonetic: "oh-oon-jeh" },
  { id: 33, yoruba: "Ọjà", english: "Market", category: "Everyday", phonetic: "oh-jah" },
  { id: 34, yoruba: "Ilé", english: "House / Home", category: "Everyday", phonetic: "ee-leh" },
  { id: 35, yoruba: "Owó", english: "Money", category: "Everyday", phonetic: "oh-woh" },
  { id: 36, yoruba: "Aṣọ", english: "Clothes", category: "Everyday", phonetic: "ah-shaw" },
  { id: 37, yoruba: "Bàtà", english: "Shoes", category: "Everyday", phonetic: "bah-tah" },
  { id: 38, yoruba: "Oòrùn", english: "Sun", category: "Everyday", phonetic: "oh-oh-roon" },
  { id: 39, yoruba: "Òjò", english: "Rain", category: "Everyday", phonetic: "oh-joh" },
  { id: 40, yoruba: "Ilẹ̀", english: "Ground / Earth", category: "Everyday", phonetic: "ee-leh" },

  // Family
  { id: 41, yoruba: "Ọ̀rẹ́", english: "Friend", category: "Family", phonetic: "oh-reh" },
  { id: 42, yoruba: "Ìyá", english: "Mother", category: "Family", phonetic: "ee-yah" },
  { id: 43, yoruba: "Bàbá", english: "Father", category: "Family", phonetic: "bah-bah" },
  { id: 44, yoruba: "Ọmọ", english: "Child", category: "Family", phonetic: "oh-moh" },
  { id: 45, yoruba: "Ẹ̀gbọ́n", english: "Older sibling", category: "Family", phonetic: "eh-gbon" },
  { id: 46, yoruba: "Àbúrò", english: "Younger sibling", category: "Family", phonetic: "ah-boo-roh" },
  { id: 47, yoruba: "Ọkọ", english: "Husband", category: "Family", phonetic: "oh-koh" },
  { id: 48, yoruba: "Ìyàwó", english: "Wife", category: "Family", phonetic: "ee-yah-woh" },
  { id: 49, yoruba: "Ẹbí", english: "Family / Household", category: "Family", phonetic: "eh-bee" },
  { id: 50, yoruba: "Àwọn òbí", english: "Parents", category: "Family", phonetic: "ah-won oh-bee" },

  // Travel
  { id: 51, yoruba: "Ọkọ̀", english: "Car / Vehicle", category: "Travel", phonetic: "oh-koh" },
  { id: 52, yoruba: "Ọ̀nà", english: "Road / Path", category: "Travel", phonetic: "oh-nah" },
  { id: 53, yoruba: "Rìn", english: "To walk", category: "Travel", phonetic: "reen" },
  { id: 54, yoruba: "Lọ", english: "To go", category: "Travel", phonetic: "loh" },
  { id: 55, yoruba: "Wá", english: "To come", category: "Travel", phonetic: "wah" },
  { id: 56, yoruba: "Ìrìn-àjò", english: "Journey / Trip", category: "Travel", phonetic: "ee-reen-ah-joh" },
  { id: 57, yoruba: "Ọkọ̀ ojú irin", english: "Train", category: "Travel", phonetic: "oh-koh oh-joo ee-reen" },
  { id: 58, yoruba: "Dúró", english: "To wait / Stop", category: "Travel", phonetic: "doo-roh" },
  { id: 59, yoruba: "Níbo ni a ń lọ?", english: "Where are we going?", category: "Travel", phonetic: "nee-boh nee ah n loh" },
  { id: 60, yoruba: "Mo ti dé", english: "I have arrived", category: "Travel", phonetic: "moh tee deh" },

  // Numbers
  { id: 61, yoruba: "Ọ̀kan / Ení", english: "One", category: "Numbers", phonetic: "oh-kan / eh-nee" },
  { id: 62, yoruba: "Méjì", english: "Two", category: "Numbers", phonetic: "May-jee" },
  { id: 63, yoruba: "Mẹ́ta", english: "Three", category: "Numbers", phonetic: "Meh-tah" },
  { id: 64, yoruba: "Mẹ́rin", english: "Four", category: "Numbers", phonetic: "Meh-rin" },
  { id: 65, yoruba: "Márùn", english: "Five", category: "Numbers", phonetic: "Mah-roon" },
  { id: 66, yoruba: "Mẹ́fà", english: "Six", category: "Numbers", phonetic: "Meh-fah" },
  { id: 67, yoruba: "Méje", english: "Seven", category: "Numbers", phonetic: "May-jeh" },
  { id: 68, yoruba: "Mẹ́jọ", english: "Eight", category: "Numbers", phonetic: "Meh-joh" },
  { id: 69, yoruba: "Mẹ́sàn", english: "Nine", category: "Numbers", phonetic: "Meh-sahn" },
  { id: 70, yoruba: "Mẹ́wà", english: "Ten", category: "Numbers", phonetic: "Meh-wah" },

  // Time
  { id: 71, yoruba: "Òní", english: "Today", category: "Time", phonetic: "Oh-nee" },
  { id: 72, yoruba: "Ọ̀la", english: "Tomorrow", category: "Time", phonetic: "oh-lah" },
  { id: 73, yoruba: "Àná", english: "Yesterday", category: "Time", phonetic: "ah-nah" },
  { id: 74, yoruba: "Àárọ̀", english: "Morning", category: "Time", phonetic: "ah-ah-roh" },
  { id: 75, yoruba: "Ọ̀sán", english: "Afternoon", category: "Time", phonetic: "oh-sahn" },
  { id: 76, yoruba: "Ìrọ̀lẹ́", english: "Evening", category: "Time", phonetic: "ee-roh-leh" },
  { id: 77, yoruba: "Òru", english: "Night", category: "Time", phonetic: "oh-roo" },
  { id: 78, yoruba: "Ọ̀sẹ̀", english: "Week", category: "Time", phonetic: "oh-seh" },
  { id: 79, yoruba: "Oṣù", english: "Month", category: "Time", phonetic: "oh-shoo" },
  { id: 80, yoruba: "Ọdún", english: "Year", category: "Time", phonetic: "oh-doon" },

  // Food
  { id: 81, yoruba: "Ìrẹsì", english: "Rice", category: "Food", phonetic: "ee-reh-see" },
  { id: 82, yoruba: "Ẹ̀wà", english: "Beans", category: "Food", phonetic: "eh-wah" },
  { id: 83, yoruba: "Ẹran", english: "Meat", category: "Food", phonetic: "eh-ran" },
  { id: 84, yoruba: "Ẹja", english: "Fish", category: "Food", phonetic: "eh-jah" },
  { id: 85, yoruba: "Ọbẹ̀", english: "Soup / Stew", category: "Food", phonetic: "oh-beh" },
  { id: 86, yoruba: "Iṣu", english: "Yam", category: "Food", phonetic: "ee-shoo" },
  { id: 87, yoruba: "Àmàlà", english: "Yam flour meal", category: "Food", phonetic: "ah-mah-lah" },
  { id: 88, yoruba: "Ebi ń pa mí", english: "I am hungry", category: "Food", phonetic: "eh-bee n pah mee" },
  { id: 89, yoruba: "Oùngbẹ ń gbẹ mí", english: "I am thirsty", category: "Food", phonetic: "oh-oon-gbeh n gbeh mee" },
  { id: 90, yoruba: "Ó dùn", english: "It is delicious / sweet", category: "Food", phonetic: "oh doon" }
]

export default function PracticePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [direction, setDirection] = useState(0)
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = ["All", ...Array.from(new Set(flashcards.map(card => card.category)))]
  const filteredCards = activeCategory === "All" ? flashcards : flashcards.filter(card => card.category === activeCategory)

  const card = filteredCards[currentIndex]
  const progress = ((currentIndex + 1) / filteredCards.length) * 100

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setDirection(1)
      setIsFlipped(false)
      setCurrentIndex(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setIsFlipped(false)
      setCurrentIndex(prev => prev - 1)
    }
  }

  const handleRestart = () => {
    setDirection(-1)
    setIsFlipped(false)
    setCurrentIndex(0)
  }

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    setCurrentIndex(0)
    setIsFlipped(false)
    setDirection(0)
  }

  const toggleFlip = () => setIsFlipped(!isFlipped)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <div className="min-h-screen bg-[#f8f6f0] pt-24 pb-20">
      <div className="mx-auto max-w-[800px] px-5 lg:px-8">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#EAB308]">
            <Sparkles className="size-4" /> Word of the Day
          </p>
          <h1 className="font-serif text-4xl leading-tight tracking-[-.04em] text-[#19352b] sm:text-5xl">
            Daily Practice
          </h1>
          <p className="mt-4 text-[#19352b]/70">Flip the cards to learn new Yorùbá words and phrases.</p>
        </div>

        {/* Categories */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${activeCategory === cat
                ? 'bg-[#19352b] text-white'
                : 'bg-white text-[#19352b] border border-[#19352b]/10 hover:border-[#19352b]/30'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-8 flex items-center gap-4">
          <div className="text-sm font-semibold text-[#19352b] w-12">{currentIndex + 1} / {filteredCards.length}</div>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#19352b]/10">
            <motion.div
              className="h-full bg-[#EAB308]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Flashcard Area */}
        <div className="relative mx-auto aspect-[4/3] w-full max-w-[500px]" style={{ perspective: '1000px' }}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="absolute inset-0"
            >
              <motion.div
                className="relative h-full w-full cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                onClick={toggleFlip}
              >
                {/* Front of Card (Yorùbá) */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-white p-8 shadow-xl border border-[#19352b]/5"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="absolute top-6 left-6 rounded-full bg-[#e6eee5] px-3 py-1 text-xs font-semibold text-[#577565]">
                    {card.category}
                  </span>

                  <h2 className="font-serif text-5xl sm:text-6xl text-[#19352b] text-center">{card.yoruba}</h2>
                  <p className="mt-8 text-sm font-medium text-[#19352b]/50 tracking-widest uppercase">Click to reveal meaning</p>
                </div>

                {/* Back of Card (English) */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-[#19352b] text-[#f8f6f0] p-8 shadow-xl [transform:rotateY(180deg)]"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="absolute top-6 left-6 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#EAB308]">
                    Translation
                  </span>

                  <h2 className="font-serif text-4xl sm:text-5xl text-center mb-6">{card.english}</h2>

                  <div className="flex items-center gap-3 rounded-xl bg-white/10 px-5 py-3">
                    <Volume2 className="size-5 text-[#EAB308]" />
                    <span className="font-medium text-white/80">{card.phonetic}</span>
                  </div>

                  <p className="mt-8 text-sm font-medium text-white/40 tracking-widest uppercase">Click to flip back</p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex size-14 items-center justify-center rounded-full border border-[#19352b]/20 bg-white text-[#19352b] transition-all hover:bg-[#19352b]/5 disabled:opacity-50 disabled:hover:bg-white"
            aria-label="Previous card"
          >
            <ChevronLeft className="size-6" />
          </button>

          <button
            onClick={handleRestart}
            className="flex items-center justify-center gap-2 rounded-full border border-[#19352b]/20 bg-white px-6 py-3.5 text-sm font-semibold text-[#19352b] transition-all hover:bg-[#19352b]/5"
          >
            <RotateCcw className="size-4" /> Start Over
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === filteredCards.length - 1}
            className="flex size-14 items-center justify-center rounded-full bg-[#19352b] text-white transition-all hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            aria-label="Next card"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>

      </div>
    </div>
  )
}
