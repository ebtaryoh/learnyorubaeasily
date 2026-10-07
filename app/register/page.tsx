'use client'

import { useState, useEffect, FormEvent } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { EASING, DURATION } from '@/lib/animations'
import { ArrowLeft, Check, ChevronRight, User, Users, Baby, HelpCircle, Loader2, Edit3, MessageCircle } from 'lucide-react'

// --- TYPES & INITIAL STATE ---
type RegistrationType = 'Myself' | 'My child' | 'My family' | 'Someone else' | ''
type Step = 'intro' | 'about' | 'learning' | 'goals' | 'review' | 'success'

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  registerType: RegistrationType;
  
  childFirstName: string;
  childLastName: string;
  childAge: string;
  familyDetails: string;
  otherLearnerName: string;
  otherRelationship: string;

  programs: string[];
  level: string;

  goals: string[];
  otherGoal: string;

  preferredDays: string[];
  preferredTime: string;
  timezone: string;
  discovery: string;

  termsAgreed: boolean;
  marketingAgreed: boolean;
}

const initialData: RegistrationData = {
  firstName: '', lastName: '', email: '', phone: '', country: '', registerType: '',
  childFirstName: '', childLastName: '', childAge: '', familyDetails: '', otherLearnerName: '', otherRelationship: '',
  programs: [], level: '', goals: [], otherGoal: '',
  preferredDays: [], preferredTime: '', timezone: '', discovery: '',
  termsAgreed: false, marketingAgreed: false,
}

const STORAGE_KEY = 'lye_registration_draft'

// --- DATA OPTIONS ---
const countries = [
  'United States', 'United Kingdom', 'Canada', 'Nigeria', 'Australia', 'Ireland', 'Germany', 'South Africa', 'Other'
]

const programsList = [
  { id: 'adult', title: 'Adult Group Yorùbá Class', desc: 'Interactive group sessions for adults.' },
  { id: 'child', title: "Children's Yorùbá Class", desc: 'Engaging, fun classes for kids.' },
  { id: 'private', title: 'Private Lessons', desc: 'One-on-one personalized learning.' },
  { id: 'conv', title: 'Speaking & Conversation', desc: 'Focus purely on conversational fluency.' },
  { id: 'not_sure', title: 'Not Sure Yet', desc: 'We will help you figure it out.' },
]

const levelList = [
  { id: 'zero', title: 'Complete Beginner', desc: 'I know little or no Yorùbá.' },
  { id: 'beginner', title: 'Beginner', desc: 'I know some words and basic expressions.' },
  { id: 'intermediate', title: 'Intermediate', desc: 'I understand and can use some Yorùbá.' },
  { id: 'conversational', title: 'Conversational', desc: 'I can have basic conversations.' },
  { id: 'advanced', title: 'Advanced', desc: 'I already speak Yorùbá and want to improve.' },
  { id: 'unknown', title: 'Not sure', desc: 'I need help assessing my level.' },
]

const goalsList = [
  'Speak Yorùbá confidently', 'Understand Yorùbá when spoken', 'Improve pronunciation',
  'Hold everyday conversations', 'Speak with family', 'Teach Yorùbá to my children',
  'Reconnect with my Yorùbá heritage', 'Learn Yorùbá for travel', 'Understand culture and expressions', 'Other'
]

const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function RegisterPage() {
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<Step>('intro')
  const [data, setData] = useState<RegistrationData>(initialData)
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [refNumber, setRefNumber] = useState('')
  const [submitError, setSubmitError] = useState('')

  // Load draft from local storage
  useEffect(() => {
    setMounted(true)
    const draft = localStorage.getItem(STORAGE_KEY)
    if (draft) {
      try {
        const parsed = JSON.parse(draft)
        setData((prev) => ({ ...prev, ...parsed }))
      } catch (e) {
        console.error("Could not parse draft", e)
      }
    }
    
    // Auto-detect timezone
    if (!data.timezone) {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
        setData(prev => ({ ...prev, timezone: tz }))
      } catch (e) {}
    }
  }, [])

  // Save draft on change
  useEffect(() => {
    if (mounted && step !== 'success') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
  }, [data, mounted, step])

  if (!mounted) return null // Prevent hydration mismatch

  const handleUpdate = (field: keyof RegistrationData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateAbout = () => {
    const newErrors: any = {}
    if (!data.firstName.trim()) newErrors.firstName = 'First name is required.'
    if (!data.lastName.trim()) newErrors.lastName = 'Last name is required.'
    if (!data.email.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) newErrors.email = 'Please enter a valid email address.'
    if (!data.phone.trim()) newErrors.phone = 'WhatsApp number is required.'
    if (!data.registerType) newErrors.registerType = 'Please select who you are registering.'
    
    if (data.registerType === 'My child') {
      if (!data.childFirstName.trim()) newErrors.childFirstName = 'Child\'s first name is required.'
      if (!data.childAge.trim()) newErrors.childAge = 'Child\'s age is required.'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateLearning = () => {
    const newErrors: any = {}
    if (data.programs.length === 0) newErrors.programs = 'Please select at least one program.'
    if (!data.level) newErrors.level = 'Please select your current level.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateGoals = () => {
    const newErrors: any = {}
    if (data.goals.length === 0) newErrors.goals = 'Please select at least one goal.'
    if (data.goals.includes('Other') && !data.otherGoal.trim()) newErrors.otherGoal = 'Please specify your goal.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = (currentStep: Step) => {
    if (currentStep === 'intro') setStep('about')
    else if (currentStep === 'about' && validateAbout()) setStep('learning')
    else if (currentStep === 'learning' && validateLearning()) setStep('goals')
    else if (currentStep === 'goals' && validateGoals()) setStep('review')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!data.termsAgreed) {
      setErrors({ termsAgreed: 'You must agree to the Terms of Service to continue.' })
      return
    }
    
    setIsSubmitting(true)
    setSubmitError('')
    
    try {
      const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbyVlNMvIlkWpBcQCXne0TE6fvZ6Oi8FNs0ftYfJfj6x-pdLyCC6vvF2lITDLSop1kcn/exec'
      
      if (!SCRIPT_URL) {
        // If URL isn't set, simulate success for testing
        setTimeout(() => {
          setIsSubmitting(false)
          setRefNumber(`LYE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`)
          setStep('success')
          localStorage.removeItem(STORAGE_KEY)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 1500)
        return
      }

      // Convert our data object into a format Google Sheets likes
      const searchParams = new URLSearchParams()
      Object.entries(data).forEach(([key, value]) => {
        // Flatten arrays (like programs or goals) into comma-separated strings
        if (Array.isArray(value)) {
          searchParams.append(key, value.join(', '))
        } else {
          searchParams.append(key, String(value))
        }
      })
      
      // Add a timestamp
      searchParams.append('timestamp', new Date().toISOString())

      // Send the data
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: searchParams,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: 'no-cors' // Required for Google Apps Script
      })

      // Since no-cors hides the response, we assume success if it didn't throw a network error
      setIsSubmitting(false)
      setRefNumber(`LYE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`)
      setStep('success')
      localStorage.removeItem(STORAGE_KEY)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      
    } catch (error) {
      console.error('Submission error:', error)
      setIsSubmitting(false)
      setSubmitError('Something went wrong while submitting your registration. Please try again or contact us directly.')
    }
  }

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: DURATION.medium, ease: EASING.standard }
  }

  // --- SUB-COMPONENTS ---
  const ProgressIndicator = () => {
    const steps: Step[] = ['about', 'learning', 'goals', 'review']
    const currentIndex = steps.indexOf(step)
    if (currentIndex === -1) return null

    return (
      <div className="mb-12 flex items-center justify-center sm:justify-start">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
              i <= currentIndex ? 'bg-[#EAB308] text-white' : 'bg-[#19352b]/10 text-[#19352b]/50'
            }`}>
              {i < currentIndex ? <Check className="size-4" /> : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={`h-1 w-10 sm:w-16 transition-colors ${i < currentIndex ? 'bg-[#EAB308]' : 'bg-[#19352b]/10'}`} />
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#f8f6f0] text-[#19352b]">
      {/* Mini Header */}
      <header className="border-b border-[#19352b]/10 bg-white/50 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[800px] items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2" aria-label="Back to home">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#19352b] text-xs font-semibold text-[#f8f6f0]">LY</span>
            <span className="hidden font-serif text-[17px] tracking-[-0.03em] sm:block">LearnYoruba<span className="text-[#EAB308]">Easily</span></span>
          </Link>
          {step !== 'success' && step !== 'intro' && (
            <button onClick={() => setStep('intro')} className="text-sm font-medium text-[#19352b]/60 hover:text-[#19352b]">Save & Exit</button>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-[800px] px-5 py-12 pb-24">
        <AnimatePresence mode="wait">
          
          {/* STEP: INTRO */}
          {step === 'intro' && (
            <motion.div key="intro" {...pageTransition} className="flex min-h-[60vh] flex-col justify-center text-center">
              <h1 className="font-serif text-5xl leading-tight tracking-[-.05em] md:text-6xl">Start Your Yorùbá <br /><em className="text-[#EAB308]">Learning Journey.</em></h1>
              <p className="mx-auto mt-6 max-w-[500px] text-lg text-[#19352b]/70">Tell us a little about yourself and what you&apos;d like to achieve. We&apos;ll use your answers to help create the right learning experience for you.</p>
              
              <div className="mx-auto mt-12 flex flex-col gap-4 sm:flex-row justify-center">
                <button onClick={() => handleNext('intro')} className="inline-flex items-center justify-center rounded-full bg-[#19352b] px-8 py-4 font-semibold text-white transition-transform hover:-translate-y-1">
                  Begin Registration <ChevronRight className="ml-2 size-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP: ABOUT YOU */}
          {step === 'about' && (
            <motion.div key="about" {...pageTransition}>
              <ProgressIndicator />
              <h2 className="font-serif text-4xl">About You</h2>
              <p className="mt-2 text-[#19352b]/70">Let&apos;s start with a few details.</p>

              <div className="mt-10 space-y-8 rounded-3xl bg-white p-6 shadow-sm sm:p-10 border border-[#19352b]/5">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">First Name *</label>
                    <input id="firstName" value={data.firstName} onChange={e => handleUpdate('firstName', e.target.value)} type="text" className={`w-full rounded-xl border bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308] ${errors.firstName ? 'border-red-400' : 'border-[#19352b]/10'}`} />
                    {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">Last Name *</label>
                    <input id="lastName" value={data.lastName} onChange={e => handleUpdate('lastName', e.target.value)} type="text" className={`w-full rounded-xl border bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308] ${errors.lastName ? 'border-red-400' : 'border-[#19352b]/10'}`} />
                    {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address *</label>
                    <input id="email" value={data.email} onChange={e => handleUpdate('email', e.target.value)} type="email" placeholder="name@example.com" className={`w-full rounded-xl border bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308] ${errors.email ? 'border-red-400' : 'border-[#19352b]/10'}`} />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">WhatsApp Number *</label>
                    <input id="phone" value={data.phone} onChange={e => handleUpdate('phone', e.target.value)} type="tel" placeholder="+1 (555) 000-0000" className={`w-full rounded-xl border bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308] ${errors.phone ? 'border-red-400' : 'border-[#19352b]/10'}`} />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="country" className="text-sm font-medium">Country of Residence</label>
                  <select id="country" value={data.country} onChange={e => handleUpdate('country', e.target.value)} className="w-full appearance-none rounded-xl border border-[#19352b]/10 bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308]">
                    <option value="">Select country...</option>
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#19352b]/10">
                  <label className="text-sm font-medium">Who are you registering? *</label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { id: 'Myself', icon: User },
                      { id: 'My child', icon: Baby },
                      { id: 'My family', icon: Users },
                      { id: 'Someone else', icon: HelpCircle }
                    ].map(({ id, icon: Icon }) => (
                      <button key={id} type="button" onClick={() => handleUpdate('registerType', id)} className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${data.registerType === id ? 'border-[#EAB308] bg-[#EAB308]/5 shadow-sm' : 'border-[#19352b]/10 hover:border-[#19352b]/30 hover:bg-[#f8f6f0]/50'}`}>
                        <div className={`flex size-10 items-center justify-center rounded-full ${data.registerType === id ? 'bg-[#EAB308] text-white' : 'bg-[#19352b]/5 text-[#19352b]/60'}`}>
                          <Icon className="size-5" />
                        </div>
                        <span className="font-medium">{id}</span>
                      </button>
                    ))}
                  </div>
                  {errors.registerType && <p className="text-xs text-red-500">{errors.registerType}</p>}
                </div>

                {/* Conditional fields based on Registration Type */}
                <AnimatePresence>
                  {data.registerType === 'My child' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="grid gap-6 pt-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Child&apos;s First Name *</label>
                          <input value={data.childFirstName} onChange={e => handleUpdate('childFirstName', e.target.value)} type="text" className={`w-full rounded-xl border bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308] ${errors.childFirstName ? 'border-red-400' : 'border-[#19352b]/10'}`} />
                          {errors.childFirstName && <p className="text-xs text-red-500">{errors.childFirstName}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Child&apos;s Age *</label>
                          <input value={data.childAge} onChange={e => handleUpdate('childAge', e.target.value)} type="number" min="3" max="17" className={`w-full rounded-xl border bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308] ${errors.childAge ? 'border-red-400' : 'border-[#19352b]/10'}`} />
                          {errors.childAge && <p className="text-xs text-red-500">{errors.childAge}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {data.registerType === 'My family' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="space-y-2 pt-4">
                        <label className="text-sm font-medium">Family Details (Ages, relationships, etc.)</label>
                        <textarea value={data.familyDetails} onChange={e => handleUpdate('familyDetails', e.target.value)} rows={3} className="w-full rounded-xl border border-[#19352b]/10 bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308]" />
                      </div>
                    </motion.div>
                  )}
                  {data.registerType === 'Someone else' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="grid gap-6 pt-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Learner&apos;s Name</label>
                          <input value={data.otherLearnerName} onChange={e => handleUpdate('otherLearnerName', e.target.value)} type="text" className="w-full rounded-xl border border-[#19352b]/10 bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308]" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Your Relationship</label>
                          <input value={data.otherRelationship} onChange={e => handleUpdate('otherRelationship', e.target.value)} type="text" className="w-full rounded-xl border border-[#19352b]/10 bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308]" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button onClick={() => handleNext('about')} className="inline-flex items-center justify-center rounded-full bg-[#19352b] px-8 py-4 font-semibold text-white transition-transform hover:-translate-y-1">
                  Continue <ChevronRight className="ml-2 size-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP: LEARNING */}
          {step === 'learning' && (
            <motion.div key="learning" {...pageTransition}>
              <ProgressIndicator />
              <button onClick={() => setStep('about')} className="mb-6 flex items-center text-sm font-semibold text-[#19352b]/60 hover:text-[#19352b]"><ArrowLeft className="mr-2 size-4" /> Back to About You</button>
              
              <h2 className="font-serif text-4xl">What would you like to learn?</h2>
              <p className="mt-2 text-[#19352b]/70">You can select more than one option.</p>

              <div className="mt-10 space-y-10 rounded-3xl bg-white p-6 shadow-sm sm:p-10 border border-[#19352b]/5">
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {programsList.map(prog => {
                      const selected = data.programs.includes(prog.title)
                      return (
                        <button key={prog.id} onClick={() => {
                          handleUpdate('programs', selected ? data.programs.filter(p => p !== prog.title) : [...data.programs, prog.title])
                        }} className={`flex text-left p-5 rounded-xl border transition-all ${selected ? 'border-[#EAB308] bg-[#EAB308]/5 shadow-sm' : 'border-[#19352b]/10 hover:border-[#19352b]/30'}`}>
                          <div className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${selected ? 'border-[#EAB308] bg-[#EAB308] text-white' : 'border-[#19352b]/30'}`}>
                            {selected && <Check className="size-3.5" />}
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold">{prog.title}</h3>
                            <p className="mt-1 text-sm text-[#19352b]/60 leading-tight">{prog.desc}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                  {errors.programs && <p className="text-xs text-red-500">{errors.programs}</p>}
                </div>

                <div className="space-y-4 pt-6 border-t border-[#19352b]/10">
                  <h3 className="text-lg font-semibold">How much Yorùbá do you currently know? *</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {levelList.map(lvl => (
                      <button key={lvl.id} onClick={() => handleUpdate('level', lvl.title)} className={`flex text-left p-5 rounded-xl border transition-all ${data.level === lvl.title ? 'border-[#19352b] bg-[#19352b]/5 shadow-sm' : 'border-[#19352b]/10 hover:border-[#19352b]/30'}`}>
                        <div className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors ${data.level === lvl.title ? 'border-[#19352b]' : 'border-[#19352b]/30'}`}>
                          {data.level === lvl.title && <div className="size-2.5 rounded-full bg-[#19352b]" />}
                        </div>
                        <div className="ml-4">
                          <h3 className="font-semibold">{lvl.title}</h3>
                          <p className="mt-1 text-sm text-[#19352b]/60 leading-tight">{lvl.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.level && <p className="text-xs text-red-500">{errors.level}</p>}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button onClick={() => handleNext('learning')} className="inline-flex items-center justify-center rounded-full bg-[#19352b] px-8 py-4 font-semibold text-white transition-transform hover:-translate-y-1">
                  Continue <ChevronRight className="ml-2 size-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP: GOALS */}
          {step === 'goals' && (
            <motion.div key="goals" {...pageTransition}>
              <ProgressIndicator />
              <button onClick={() => setStep('learning')} className="mb-6 flex items-center text-sm font-semibold text-[#19352b]/60 hover:text-[#19352b]"><ArrowLeft className="mr-2 size-4" /> Back to Learning</button>
              
              <h2 className="font-serif text-4xl">What would you like to achieve?</h2>
              
              <div className="mt-10 space-y-10 rounded-3xl bg-white p-6 shadow-sm sm:p-10 border border-[#19352b]/5">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {goalsList.map(goal => {
                      const selected = data.goals.includes(goal)
                      return (
                        <button key={goal} onClick={() => {
                          handleUpdate('goals', selected ? data.goals.filter(g => g !== goal) : [...data.goals, goal])
                        }} className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors border ${selected ? 'border-[#19352b] bg-[#19352b] text-white' : 'border-[#19352b]/20 hover:border-[#19352b]/40 text-[#19352b]'}`}>
                          {goal}
                        </button>
                      )
                    })}
                  </div>
                  {errors.goals && <p className="text-xs text-red-500">{errors.goals}</p>}
                  
                  <AnimatePresence>
                    {data.goals.includes('Other') && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="mt-4 space-y-2">
                          <label className="text-sm font-medium">My goal is... *</label>
                          <input value={data.otherGoal} onChange={e => handleUpdate('otherGoal', e.target.value)} type="text" className={`w-full rounded-xl border bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308] ${errors.otherGoal ? 'border-red-400' : 'border-[#19352b]/10'}`} />
                          {errors.otherGoal && <p className="text-xs text-red-500">{errors.otherGoal}</p>}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-6 pt-8 border-t border-[#19352b]/10">
                  <h3 className="text-lg font-semibold">Preferred Schedule (Optional)</h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Preferred Days</label>
                      <div className="flex flex-wrap gap-2">
                        {daysList.map(day => {
                          const s = data.preferredDays.includes(day)
                          return (
                            <button key={day} onClick={() => handleUpdate('preferredDays', s ? data.preferredDays.filter(d => d !== day) : [...data.preferredDays, day])} className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors ${s ? 'bg-[#FDE047] border-[#FDE047]' : 'border-[#19352b]/20 hover:border-[#19352b]/40'}`}>
                              {day.slice(0,3)}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time of day</label>
                      <select value={data.preferredTime} onChange={e => handleUpdate('preferredTime', e.target.value)} className="w-full appearance-none rounded-xl border border-[#19352b]/10 bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308]">
                        <option value="">Any time</option>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Time Zone</label>
                    <input value={data.timezone} onChange={e => handleUpdate('timezone', e.target.value)} type="text" placeholder="e.g. America/New_York or GMT+1" className="w-full rounded-xl border border-[#19352b]/10 bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308]" />
                  </div>
                </div>

                <div className="space-y-2 pt-8 border-t border-[#19352b]/10">
                  <label className="text-sm font-medium">How did you hear about LearnYorubaEasily? (Optional)</label>
                  <select value={data.discovery} onChange={e => handleUpdate('discovery', e.target.value)} className="w-full appearance-none rounded-xl border border-[#19352b]/10 bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308]">
                    <option value="">Please select...</option>
                    <option value="Google">Google / Search</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Referral">Friend / Family</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button onClick={() => handleNext('goals')} className="inline-flex items-center justify-center rounded-full bg-[#19352b] px-8 py-4 font-semibold text-white transition-transform hover:-translate-y-1">
                  Review Details <ChevronRight className="ml-2 size-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP: REVIEW & SUBMIT */}
          {step === 'review' && (
            <motion.div key="review" {...pageTransition}>
              <ProgressIndicator />
              <button onClick={() => setStep('goals')} className="mb-6 flex items-center text-sm font-semibold text-[#19352b]/60 hover:text-[#19352b]"><ArrowLeft className="mr-2 size-4" /> Back to Goals</button>
              
              <h2 className="font-serif text-4xl">Review Your Registration</h2>
              
              <div className="mt-10 space-y-6">
                
                {/* Review: About You */}
                <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-10 border border-[#19352b]/5 relative">
                  <button onClick={() => setStep('about')} className="absolute top-6 right-6 sm:top-10 sm:right-10 flex items-center text-sm font-medium text-[#EAB308] hover:underline"><Edit3 className="mr-1.5 size-4" /> Edit</button>
                  <h3 className="font-serif text-2xl mb-6">About You</h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div><span className="block text-[#19352b]/50">Name</span><span className="font-medium">{data.firstName} {data.lastName}</span></div>
                    <div><span className="block text-[#19352b]/50">Email</span><span className="font-medium">{data.email}</span></div>
                    <div><span className="block text-[#19352b]/50">Phone</span><span className="font-medium">{data.phone || '—'}</span></div>
                    <div><span className="block text-[#19352b]/50">Country</span><span className="font-medium">{data.country || '—'}</span></div>
                    <div className="col-span-2 pt-4 border-t border-[#19352b]/10"><span className="block text-[#19352b]/50">Registration Type</span><span className="font-medium">{data.registerType}</span></div>
                    {data.registerType === 'My child' && (
                      <div className="col-span-2"><span className="block text-[#19352b]/50">Child Info</span><span className="font-medium">{data.childFirstName} {data.childLastName}, Age {data.childAge}</span></div>
                    )}
                  </div>
                </div>

                {/* Review: Learning */}
                <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-10 border border-[#19352b]/5 relative">
                  <button onClick={() => setStep('learning')} className="absolute top-6 right-6 sm:top-10 sm:right-10 flex items-center text-sm font-medium text-[#EAB308] hover:underline"><Edit3 className="mr-1.5 size-4" /> Edit</button>
                  <h3 className="font-serif text-2xl mb-6">Learning</h3>
                  <div className="space-y-4 text-sm">
                    <div><span className="block text-[#19352b]/50 mb-1">Programs Selected</span><div className="flex flex-wrap gap-2">{data.programs.map(p => <span key={p} className="bg-[#f8f6f0] px-3 py-1 rounded-md font-medium">{p}</span>)}</div></div>
                    <div><span className="block text-[#19352b]/50 mb-1">Current Level</span><span className="font-medium">{data.level}</span></div>
                  </div>
                </div>

                {/* Review: Goals */}
                <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-10 border border-[#19352b]/5 relative">
                  <button onClick={() => setStep('goals')} className="absolute top-6 right-6 sm:top-10 sm:right-10 flex items-center text-sm font-medium text-[#EAB308] hover:underline"><Edit3 className="mr-1.5 size-4" /> Edit</button>
                  <h3 className="font-serif text-2xl mb-6">Goals & Schedule</h3>
                  <div className="space-y-4 text-sm">
                    <div><span className="block text-[#19352b]/50 mb-1">Goals</span><div className="flex flex-wrap gap-2">{data.goals.map(g => <span key={g} className="bg-[#f8f6f0] px-3 py-1 rounded-md font-medium">{g === 'Other' ? `Other: ${data.otherGoal}` : g}</span>)}</div></div>
                    <div className="grid grid-cols-2 pt-4 border-t border-[#19352b]/10 gap-4">
                      <div><span className="block text-[#19352b]/50">Days</span><span className="font-medium">{data.preferredDays.join(', ') || 'Any'}</span></div>
                      <div><span className="block text-[#19352b]/50">Time & Zone</span><span className="font-medium">{data.preferredTime || 'Any'} ({data.timezone})</span></div>
                    </div>
                  </div>
                </div>

                {/* Terms and Submit */}
                <div className="pt-8">
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${data.termsAgreed ? 'border-[#EAB308] bg-[#EAB308] text-white' : 'border-[#19352b]/30 group-hover:border-[#19352b]/50 bg-white'}`}>
                      {data.termsAgreed && <Check className="size-3.5" />}
                    </div>
                    <input type="checkbox" className="sr-only" checked={data.termsAgreed} onChange={(e) => handleUpdate('termsAgreed', e.target.checked)} />
                    <span className="text-sm">I agree to the LearnYorubaEasily <Link href="/terms" target="_blank" className="underline hover:text-[#EAB308]">Terms of Service</Link> and <Link href="/privacy" target="_blank" className="underline hover:text-[#EAB308]">Privacy Policy</Link>. *</span>
                  </label>
                  {errors.termsAgreed && <p className="mt-2 ml-9 text-xs text-red-500">{errors.termsAgreed}</p>}
                  
                  <label className="flex items-start gap-4 mt-4 cursor-pointer group">
                    <div className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${data.marketingAgreed ? 'border-[#EAB308] bg-[#EAB308] text-white' : 'border-[#19352b]/30 group-hover:border-[#19352b]/50 bg-white'}`}>
                      {data.marketingAgreed && <Check className="size-3.5" />}
                    </div>
                    <input type="checkbox" className="sr-only" checked={data.marketingAgreed} onChange={(e) => handleUpdate('marketingAgreed', e.target.checked)} />
                    <span className="text-sm text-[#19352b]/70">I&apos;d like to receive useful Yorùbá learning updates and announcements.</span>
                  </label>
                  
                  {submitError && <div className="mt-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100">{submitError}</div>}

                  <div className="mt-10">
                    <button onClick={handleSubmit} disabled={isSubmitting} className="flex w-full sm:w-auto items-center justify-center rounded-full bg-[#19352b] px-10 py-4 font-semibold text-white transition-all hover:bg-[#19352b]/90 disabled:opacity-70 disabled:hover:transform-none">
                      {isSubmitting ? <><Loader2 className="mr-2 size-5 animate-spin" /> Creating your registration...</> : 'Complete Registration'}
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* STEP: SUCCESS */}
          {step === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: DURATION.large, ease: EASING.expressive }} className="flex flex-col items-center text-center py-12">
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                className="mb-8 flex size-20 items-center justify-center rounded-full bg-[#e6eee5] text-[#577565]"
              >
                <Check className="size-10" />
              </motion.div>
              <h1 className="font-serif text-5xl leading-tight tracking-[-.05em] md:text-6xl">You&apos;re on Your Way <br />to Learning Yorùbá! <span className="font-sans">🌿</span></h1>
              <p className="mx-auto mt-6 max-w-[500px] text-lg text-[#19352b]/70">Thank you for registering with LearnYorubaEasily, {data.firstName}. We&apos;ve received your information and will guide you through the next step.</p>
              
              <div className="mt-10 w-full max-w-[500px] rounded-3xl bg-white p-8 shadow-sm text-left border border-[#19352b]/5">
                <div className="flex items-center justify-between border-b border-[#19352b]/10 pb-6">
                  <div><p className="text-xs text-[#19352b]/50 uppercase tracking-widest font-semibold">Reference Number</p><p className="mt-1 font-mono font-medium">{refNumber}</p></div>
                  <div className="text-right"><p className="text-xs text-[#19352b]/50 uppercase tracking-widest font-semibold">Date</p><p className="mt-1 font-medium">{new Date().toLocaleDateString()}</p></div>
                </div>
                <div className="pt-6">
                  <h3 className="font-semibold text-lg">What&apos;s Next?</h3>
                  <ul className="mt-4 space-y-3 text-sm text-[#19352b]/70">
                    <li className="flex items-start gap-3"><div className="mt-1 size-1.5 shrink-0 rounded-full bg-[#EAB308]" /> We will review your registration and selected programs.</li>
                    <li className="flex items-start gap-3"><div className="mt-1 size-1.5 shrink-0 rounded-full bg-[#EAB308]" /> We will message you directly on WhatsApp to provide your Zoom link and class materials.</li>
                    <li className="flex items-start gap-3"><div className="mt-1 size-1.5 shrink-0 rounded-full bg-[#EAB308]" /> You will be ready to begin your Yorùbá learning journey!</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-12 flex flex-col gap-4 sm:flex-row w-full sm:w-auto justify-center">
                <a href="https://chat.whatsapp.com/BaZKdym3lFzC4Genqg43Rh" target="_blank" className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-8 py-4 font-semibold text-white transition-transform hover:-translate-y-1 shadow-md hover:shadow-lg">
                  <MessageCircle className="mr-2 size-5" /> Join WhatsApp Group
                </a>
                <Link href="/" className="inline-flex items-center justify-center rounded-full border-2 border-[#19352b]/20 px-8 py-4 font-semibold text-[#19352b] transition-colors hover:bg-[#19352b]/5">
                  Back to Homepage
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  )
}
