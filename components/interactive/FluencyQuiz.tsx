'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, Trophy, Sparkles, ArrowRight, RotateCcw, Volume2 } from 'lucide-react'
import Link from 'next/link'
import { speakYorubaPhrase } from '@/lib/audio'

interface Question {
  id: number
  question: string
  context: string
  options: {
    text: string
    isCorrect: boolean
    explanation: string
  }[]
  audioPhrase?: string
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'How do you greet an elder or respected person in the morning?',
    context: 'Respect and greetings are the bedrock of Yorùbá etiquette.',
    audioPhrase: 'Ẹ kú àárọ̀ o',
    options: [
      { text: 'Ẹ kú àárọ̀ o', isCorrect: true, explanation: 'Correct! The prefix "Ẹ" shows honoring respect, and "àárọ̀" means morning.' },
      { text: 'Ó dàbọ̀', isCorrect: false, explanation: '"Ó dàbọ̀" actually means "Goodbye / Until we meet again".' },
      { text: 'Ẹ kú irọ̀lẹ́ o', isCorrect: false, explanation: '"Ẹ kú irọ̀lẹ́" is for late afternoon / evening greetings.' },
      { text: 'Báwo ni?', isCorrect: false, explanation: '"Báwo ni?" is casual between friends, not traditionally used alone for elders.' }
    ]
  },
  {
    id: 2,
    question: 'What does the famous everyday phrase "Báwo ni?" mean?',
    context: 'You will hear this on every street corner from Lagos to London.',
    audioPhrase: 'Báwo ni',
    options: [
      { text: 'How are things? / How are you doing?', isCorrect: true, explanation: 'Spot on! Short, lively, and warm — the universal Yorùbá "What\'s up?".' },
      { text: 'Where are you going?', isCorrect: false, explanation: 'That would be "Níbo lo ń lọ?".' },
      { text: 'What is your name?', isCorrect: false, explanation: 'That is "Kí ni orúkọ rẹ?".' },
      { text: 'How much is this food?', isCorrect: false, explanation: 'That would be "Èló ni oúnjẹ yìí?".' }
    ]
  },
  {
    id: 3,
    question: 'What is the customary respectful response when someone asks "Ṣé àlàáfíà ni?" (Are you well?)',
    context: 'Yorùbá conversations always wish peace upon each other.',
    audioPhrase: 'Àlàáfíà ni',
    options: [
      { text: 'Àlàáfíà ni / Mo dúpẹ́ (Peace and gratitude)', isCorrect: true, explanation: 'Excellence! "Àlàáfíà" means peace/wholeness and "Mo dúpẹ́" means "I give thanks".' },
      { text: 'Kò sí oúnjẹ (There is no food)', isCorrect: false, explanation: 'That means "There is no food"!' },
      { text: 'Ó tì (No way)', isCorrect: false, explanation: '"Ó tì" is an abrupt refusal, not an answer to health greetings.' },
      { text: 'Má bínú (Don\'t be angry)', isCorrect: false, explanation: '"Má bínú" is used to apologize.' }
    ]
  },
  {
    id: 4,
    question: 'Why do Yorùbá greetings change when speaking to one person vs an elder?',
    context: 'Honorifics define how warmth and esteem are expressed.',
    options: [
      { text: 'The pronoun "Ẹ" is the honorific plural that honors wisdom and seniority', isCorrect: true, explanation: 'Beautiful! Even for one elder, you use the plural "Ẹ" rather than the singular "O".' },
      { text: 'It indicates that you are shouting across a distance', isCorrect: false, explanation: 'It is about deference and social honor, never volume.' },
      { text: 'It can only be spoken by male speakers', isCorrect: false, explanation: 'Both men and women observe honorific greetings equally.' },
      { text: 'It changes only when speaking to a doctor', isCorrect: false, explanation: 'It applies to parents, grandparents, teachers, and any senior person.' }
    ]
  }
]

export function FluencyQuiz() {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [hasAnswered, setHasAnswered] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)
  const [quizFinished, setQuizFinished] = useState<boolean>(false)

  const q = QUIZ_QUESTIONS[currentStep]

  const handleSelect = (idx: number) => {
    if (hasAnswered) return
    setSelectedOption(idx)
    setHasAnswered(true)

    if (q.options[idx].isCorrect) {
      setScore(prev => prev + 1)
    }

    if (q.audioPhrase) {
      speakYorubaPhrase(q.audioPhrase)
    }
  }

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1)
      setSelectedOption(null)
      setHasAnswered(false)
    } else {
      setQuizFinished(true)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setSelectedOption(null)
    setHasAnswered(false)
    setScore(0)
    setQuizFinished(false)
  }

  return (
    <section className="relative overflow-hidden rounded-[36px] bg-white p-8 md:p-14 border border-[#19352b]/10 shadow-lg text-[#19352b]">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EAB308]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#19352b] border border-[#EAB308]/30">
            <Trophy className="size-3.5 text-[#EAB308]" /> 60-Second Challenge
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl tracking-tight">
            Test Your <em className="text-[#EAB308] italic">Yorùbá IQ</em>
          </h2>
          <p className="mt-2 text-sm text-[#19352b]/70">
            Four quick cultural and conversational questions to see where your intuition stands!
          </p>
        </div>

        {!quizFinished ? (
          <div className="mt-8">
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs font-semibold text-[#19352b]/60 mb-2">
              <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
              <span>Score: {score}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#19352b]/10 overflow-hidden">
              <motion.div
                className="h-full bg-[#EAB308]"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="mt-6 rounded-3xl bg-[#f8f6f0] p-6 sm:p-8 border border-[#19352b]/5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#577565] font-bold">
                      {q.context}
                    </span>
                    <h3 className="mt-2 font-serif text-xl sm:text-2xl font-bold">
                      {q.question}
                    </h3>
                  </div>

                  {q.audioPhrase && (
                    <button
                      onClick={() => speakYorubaPhrase(q.audioPhrase!)}
                      className="shrink-0 flex size-9 items-center justify-center rounded-full bg-white shadow-sm border border-[#19352b]/10 hover:bg-[#EAB308] hover:text-[#19352b] transition-colors"
                      title="Hear phrase pronunciation"
                    >
                      <Volume2 className="size-4" />
                    </button>
                  )}
                </div>

                {/* Options */}
                <div className="mt-6 space-y-3">
                  {q.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx
                    let optStyle = 'bg-white border-[#19352b]/10 hover:border-[#19352b]/30'

                    if (hasAnswered) {
                      if (opt.isCorrect) {
                        optStyle = 'bg-green-50 border-green-500 text-green-900 font-semibold ring-1 ring-green-500'
                      } else if (isSelected) {
                        optStyle = 'bg-red-50 border-red-400 text-red-900 ring-1 ring-red-400'
                      } else {
                        optStyle = 'bg-white/50 border-[#19352b]/10 opacity-50'
                      }
                    }

                    return (
                      <button
                        key={opt.text}
                        onClick={() => handleSelect(idx)}
                        disabled={hasAnswered}
                        className={`w-full text-left rounded-2xl p-4 transition-all border flex items-center justify-between text-sm sm:text-base ${optStyle}`}
                      >
                        <span>{opt.text}</span>
                        {hasAnswered && opt.isCorrect && (
                          <CheckCircle2 className="size-5 text-green-600 shrink-0 ml-2" />
                        )}
                        {hasAnswered && isSelected && !opt.isCorrect && (
                          <XCircle className="size-5 text-red-500 shrink-0 ml-2" />
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Explanation feedback */}
                {hasAnswered && selectedOption !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 rounded-2xl bg-white p-4 text-xs sm:text-sm border border-[#19352b]/10"
                  >
                    <p className="font-semibold text-[#19352b]">
                      {q.options[selectedOption].isCorrect ? '🎉 Great intuition!' : '💡 Cultural insight:'}
                    </p>
                    <p className="mt-1 text-[#19352b]/70">
                      {q.options[selectedOption].explanation}
                    </p>
                  </motion.div>
                )}

                {/* Next Button */}
                {hasAnswered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 flex justify-end"
                  >
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 rounded-full bg-[#19352b] px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5 shadow-md"
                    >
                      {currentStep < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'See Results'}
                      <ArrowRight className="size-4" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* Results View */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 text-center rounded-3xl bg-[#f8f6f0] p-8 sm:p-12 border border-[#19352b]/10"
          >
            <div className="inline-flex size-20 items-center justify-center rounded-full bg-[#EAB308]/20 text-[#EAB308] shadow-inner mb-4">
              <Trophy className="size-10" />
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold">
              You Scored {score} of {QUIZ_QUESTIONS.length}!
            </h3>

            <p className="mt-2 text-sm sm:text-base font-medium text-[#19352b]/70">
              {score === 4 && '👑 Exceptional! You have natural Yorùbá instincts. Let’s make you truly fluent.'}
              {score === 3 && '✨ Impressive! You have a solid ear for the culture and language.'}
              {score === 2 && '🌱 Good start! With a live native tutor, you will be speaking in weeks.'}
              {score < 2 && '🌿 The perfect moment to start. Our patient 1-on-1 tutors guide you step by step.'}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#19352b] px-8 py-4 font-semibold text-white transition-transform hover:-translate-y-0.5 shadow-lg"
              >
                Join a Live Class <ArrowRight className="size-4" />
              </Link>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#19352b]/20 bg-white px-6 py-4 font-semibold text-[#19352b] hover:bg-[#19352b]/5 transition-colors"
              >
                <RotateCcw className="size-4" /> Try Again
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  )
}
