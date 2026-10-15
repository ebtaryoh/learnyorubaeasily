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
  cityState: string;
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
  whyLearn: string;
  expectations: string;

  preferredDays: string[];
  preferredTime: string;
  timezone: string;
  discovery: string;

  pricingAgreed: boolean;
  termsAgreed: boolean;
  marketingAgreed: boolean;
  additionalNotes: string;
  whatsappConfirmed: boolean;
}

const initialData: RegistrationData = {
  firstName: '', lastName: '', email: '', phone: '', country: '', cityState: '', registerType: '',
  childFirstName: '', childLastName: '', childAge: '', familyDetails: '', otherLearnerName: '', otherRelationship: '',
  programs: [], level: '', goals: [], otherGoal: '', whyLearn: '', expectations: '',
  preferredDays: [], preferredTime: '', timezone: '', discovery: '',
  pricingAgreed: false, termsAgreed: false, marketingAgreed: false, additionalNotes: '', whatsappConfirmed: false,
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

interface TimezoneOption {
  value: string;
  label: string;
  ianaMatches: string[];
}

const timezoneOptions: TimezoneOption[] = [
  {
    value: 'WAT (West Africa Time - Nigeria, GMT+1)',
    label: 'WAT — West Africa Time (Nigeria, West Africa • GMT+1)',
    ianaMatches: ['Africa/Lagos', 'Africa/Porto-Novo', 'Africa/Niamey', 'Africa/Douala', 'Africa/Luanda']
  },
  {
    value: 'BST / GMT (UK & Ireland - London, Dublin)',
    label: 'BST / GMT — United Kingdom & Ireland (London, Dublin • GMT+1/0)',
    ianaMatches: ['Europe/London', 'Europe/Dublin', 'Europe/Belfast']
  },
  {
    value: 'EST / EDT (US & Canada Eastern - New York, Toronto, Atlanta)',
    label: 'EST / EDT — US & Canada Eastern (New York, Toronto, Atlanta • GMT-4/-5)',
    ianaMatches: ['America/New_York', 'America/Toronto', 'America/Detroit', 'America/Montreal', 'America/Kentucky', 'America/Indiana']
  },
  {
    value: 'CST / CDT (US & Canada Central - Chicago, Dallas, Houston)',
    label: 'CST / CDT — US & Canada Central (Chicago, Dallas, Houston • GMT-5/-6)',
    ianaMatches: ['America/Chicago', 'America/Winnipeg', 'America/Menominee']
  },
  {
    value: 'PST / PDT (US & Canada Pacific - Los Angeles, Vancouver)',
    label: 'PST / PDT — US & Canada Pacific (Los Angeles, San Francisco, Vancouver • GMT-7/-8)',
    ianaMatches: ['America/Los_Angeles', 'America/Vancouver']
  },
  {
    value: 'MST / MDT (US & Canada Mountain - Denver, Calgary, Phoenix)',
    label: 'MST / MDT — US & Canada Mountain (Denver, Calgary, Phoenix • GMT-6/-7)',
    ianaMatches: ['America/Denver', 'America/Edmonton', 'America/Phoenix']
  },
  {
    value: 'CET / CEST (Central Europe - Germany, France, Italy, Spain)',
    label: 'CET / CEST — Central Europe (Berlin, Paris, Amsterdam, Rome • GMT+1/+2)',
    ianaMatches: ['Europe/Berlin', 'Europe/Paris', 'Europe/Amsterdam', 'Europe/Rome', 'Europe/Madrid', 'Europe/Brussels']
  },
  {
    value: 'SAST (South Africa Standard Time - Johannesburg, GMT+2)',
    label: 'SAST — South Africa (Johannesburg, Cape Town • GMT+2)',
    ianaMatches: ['Africa/Johannesburg']
  },
  {
    value: 'EAT (East Africa Time - Nairobi, Addis Ababa, GMT+3)',
    label: 'EAT — East Africa Time (Nairobi, Kampala, Addis Ababa • GMT+3)',
    ianaMatches: ['Africa/Nairobi', 'Africa/Kampala', 'Africa/Addis_Ababa']
  },
  {
    value: 'GMT / UTC (West Africa - Ghana, Senegal, GMT+0)',
    label: 'GMT / UTC — West Africa (Accra, Dakar, Freetown • GMT+0)',
    ianaMatches: ['Africa/Accra', 'Africa/Dakar', 'Africa/Freetown', 'UTC']
  },
  {
    value: 'AEST / AEDT (Australia Eastern - Sydney, Melbourne)',
    label: 'AEST / AEDT — Australia Eastern (Sydney, Melbourne, Brisbane • GMT+10/+11)',
    ianaMatches: ['Australia/Sydney', 'Australia/Melbourne', 'Australia/Brisbane']
  },
  {
    value: 'AWST (Australia Western - Perth, GMT+8)',
    label: 'AWST — Australia Western (Perth • GMT+8)',
    ianaMatches: ['Australia/Perth']
  },
]

export default function RegisterPage() {
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<Step>('about')
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
    
    // Auto-detect timezone and match to friendly abbreviation (e.g. WAT, BST, EST)
    if (!data.timezone) {
      try {
        const detectedIana = Intl.DateTimeFormat().resolvedOptions().timeZone
        const matched = timezoneOptions.find(opt =>
          opt.ianaMatches.some(iana => detectedIana.toLowerCase() === iana.toLowerCase() || detectedIana.toLowerCase().includes(iana.toLowerCase()))
        )
        if (matched) {
          setData(prev => ({ ...prev, timezone: matched.value }))
        } else if (detectedIana) {
          setData(prev => ({ ...prev, timezone: detectedIana }))
        }
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
    if (currentStep === 'intro') {
      setStep('about')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (currentStep === 'about') {
      if (validateAbout()) {
        setStep('learning')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 180, behavior: 'smooth' })
      }
    } else if (currentStep === 'learning') {
      if (validateLearning()) {
        setStep('goals')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 180, behavior: 'smooth' })
      }
    } else if (currentStep === 'goals') {
      if (validateGoals()) {
        setStep('review')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 180, behavior: 'smooth' })
      }
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const newErrors: any = {}
    if (!data.termsAgreed) newErrors.termsAgreed = 'You must agree to the Terms of Service to continue.'
    if (!data.pricingAgreed) newErrors.pricingAgreed = 'Please confirm agreement to the lesson schedule & pricing.'
    if (!data.whatsappConfirmed) newErrors.whatsappConfirmed = 'Please confirm your WhatsApp number is accurate.'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
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

      // Generate the official reference number before sending so both Google Sheet and user share the same ref
      const generatedRef = `LYE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
      setRefNumber(generatedRef)

      // Convert our data object into a format Google Sheets likes
      const searchParams = new URLSearchParams()
      searchParams.append('referenceNumber', generatedRef)
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
    const steps: { id: Step; label: string }[] = [
      { id: 'about', label: '1. About You' },
      { id: 'learning', label: '2. Programs & Level' },
      { id: 'goals', label: '3. Goals & Schedule' },
      { id: 'review', label: '4. Review & Confirm' }
    ]
    const currentIndex = steps.findIndex(s => s.id === step)
    if (currentIndex === -1) return null

    return (
      <div className="mb-8">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl">
          {steps.map((s, i) => (
            <div key={s.id} className="flex flex-col gap-1.5">
              <div className={`h-1.5 rounded-full transition-all ${
                i <= currentIndex ? 'bg-[#EAB308]' : 'bg-[#19352b]/10'
              }`} />
              <span className={`text-[11px] font-semibold truncate ${
                i === currentIndex ? 'text-[#19352b]' : 'text-[#19352b]/40'
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#19352b] py-8 sm:py-12 px-5 sm:px-8">
      <div className="mx-auto max-w-5xl">
        
        {/* Header Banner */}
        {step !== 'success' && (
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAB308]/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#19352b]">
              🌿 Online Student Registration
            </span>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-[#19352b] tracking-tight">
              Start Your Yorùbá Learning Journey
            </h1>
            <p className="mt-1 text-sm text-[#19352b]/70 max-w-2xl">
              Fill out this quick form so we can match you or your child with the right cohort or 1-on-1 native tutor and schedule your live virtual class.
            </p>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_320px] items-start">
          
          {/* Main Form Area */}
          <div>
            <ProgressIndicator />

            <AnimatePresence mode="wait">
              {/* STEP: ABOUT YOU */}
              {step === 'about' && (
                <motion.div key="about" {...pageTransition}>
                  <h2 className="font-serif text-2xl sm:text-3xl">About You</h2>
                  <p className="mt-1 text-sm text-[#19352b]/70">Let&apos;s start with your contact and learner details.</p>

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
                    <p className="text-[11px] text-[#19352b]/60">Include country code (e.g. +234, +1, +44) for WhatsApp onboarding.</p>
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="country" className="text-sm font-medium">Country of Residence</label>
                    <select id="country" value={data.country} onChange={e => handleUpdate('country', e.target.value)} className="w-full appearance-none rounded-xl border border-[#19352b]/10 bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308]">
                      <option value="">Select country...</option>
                      {countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cityState" className="text-sm font-medium">City / State (e.g. Dallas, Texas)</label>
                    <input id="cityState" value={data.cityState} onChange={e => handleUpdate('cityState', e.target.value)} type="text" placeholder="e.g. Dallas, Texas or London" className="w-full rounded-xl border border-[#19352b]/10 bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308]" />
                  </div>
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
                      <div className="grid gap-6 pt-4 sm:grid-cols-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Child&apos;s First Name *</label>
                          <input value={data.childFirstName} onChange={e => handleUpdate('childFirstName', e.target.value)} type="text" className={`w-full rounded-xl border bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308] ${errors.childFirstName ? 'border-red-400' : 'border-[#19352b]/10'}`} />
                          {errors.childFirstName && <p className="text-xs text-red-500">{errors.childFirstName}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Child&apos;s Last Name</label>
                          <input value={data.childLastName} onChange={e => handleUpdate('childLastName', e.target.value)} type="text" placeholder="Optional" className="w-full rounded-xl border border-[#19352b]/10 bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308]" />
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

                <div className="space-y-4 pt-8 border-t border-[#19352b]/10">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Why do you want to learn Yorùbá?</label>
                    <textarea value={data.whyLearn} onChange={e => handleUpdate('whyLearn', e.target.value)} rows={2} placeholder="e.g. Connecting with heritage, family communication, cultural pride..." className="w-full rounded-xl border border-[#19352b]/10 bg-[#f8f6f0]/50 p-4 outline-none transition-colors focus:border-[#EAB308]" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">What are your expectations from LearnYorubaEasily?</label>
                    <textarea value={data.expectations} onChange={e => handleUpdate('expectations', e.target.value)} rows={2} placeholder="e.g. Conversational confidence within 3 months, understanding tones, interactive homework..." className="w-full rounded-xl border border-[#19352b]/10 bg-[#f8f6f0]/50 p-4 outline-none transition-colors focus:border-[#EAB308]" />
                  </div>
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
                    <div className="flex items-center justify-between">
                      <label htmlFor="timezone" className="text-sm font-medium">Your Time Zone</label>
                      <span className="text-[11px] font-medium text-[#577565]">⚡ Auto-detected</span>
                    </div>
                    <select
                      id="timezone"
                      value={timezoneOptions.some(opt => opt.value === data.timezone) ? data.timezone : (data.timezone ? 'custom' : '')}
                      onChange={e => {
                        if (e.target.value === 'custom') {
                          handleUpdate('timezone', 'Custom')
                        } else {
                          handleUpdate('timezone', e.target.value)
                        }
                      }}
                      className="w-full appearance-none rounded-xl border border-[#19352b]/10 bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308]"
                    >
                      <option value="">Select your time zone...</option>
                      {timezoneOptions.map(tz => (
                        <option key={tz.value} value={tz.value}>
                          {tz.label}
                        </option>
                      ))}
                      <option value="custom">Other / Custom Time Zone...</option>
                    </select>

                    {/* Show text input if custom was selected or non-standard timezone */}
                    {(!timezoneOptions.some(opt => opt.value === data.timezone) && data.timezone) && (
                      <div className="pt-2">
                        <input
                          value={data.timezone === 'Custom' ? '' : data.timezone}
                          onChange={e => handleUpdate('timezone', e.target.value)}
                          placeholder="Type your timezone or city (e.g. WAT, GMT+1, or Dubai GMT+4)"
                          className="w-full rounded-xl border border-[#19352b]/10 bg-[#f8f6f0]/50 px-4 py-3 text-sm outline-none transition-colors focus:border-[#EAB308]"
                        />
                      </div>
                    )}
                    <p className="text-xs text-[#19352b]/60">
                      Lesson schedules and WhatsApp coordination will be arranged in this time zone.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-8 border-t border-[#19352b]/10">
                  <label className="text-sm font-medium">How did you hear about LearnYorubaEasily? (Optional)</label>
                  <select value={data.discovery} onChange={e => handleUpdate('discovery', e.target.value)} className="w-full appearance-none rounded-xl border border-[#19352b]/10 bg-[#f8f6f0]/50 px-4 py-3 outline-none transition-colors focus:border-[#EAB308]">
                    <option value="">Please select...</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Twitter">Twitter / X</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Friend">Friend / Referral</option>
                    <option value="Google">Google / Search</option>
                    <option value="YouTube">YouTube</option>
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
                      <div className="col-span-2"><span className="block text-[#19352b]/50">Child Info</span><span className="font-medium">{data.childFirstName} {data.childLastName ? `${data.childLastName}, ` : ''}Age {data.childAge}</span></div>
                    )}
                    {data.registerType === 'My family' && data.familyDetails && (
                      <div className="col-span-2"><span className="block text-[#19352b]/50">Family Details</span><span className="font-medium">{data.familyDetails}</span></div>
                    )}
                    {data.registerType === 'Someone else' && (
                      <div className="col-span-2"><span className="block text-[#19352b]/50">Learner Info</span><span className="font-medium">{data.otherLearnerName || '—'} {data.otherRelationship ? `(${data.otherRelationship})` : ''}</span></div>
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

                {/* Additional Information / Notes */}
                <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-10 border border-[#19352b]/5 space-y-2">
                  <label className="text-sm font-semibold">Do you have any other information you would like to pass across to us? (Optional)</label>
                  <textarea value={data.additionalNotes} onChange={e => handleUpdate('additionalNotes', e.target.value)} rows={3} placeholder="Any specific learning needs, background, scheduling preferences, or questions for your tutor..." className="w-full rounded-xl border border-[#19352b]/10 bg-[#f8f6f0]/50 p-4 outline-none transition-colors focus:border-[#EAB308]" />
                </div>

                {/* Lesson Pricing & Scheduling Agreement */}
                <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-10 border border-[#19352b]/5 space-y-4">
                  <div className="rounded-2xl bg-[#f8f6f0] p-6 border border-[#19352b]/10 space-y-3">
                    <span className="inline-block rounded-full bg-[#EAB308]/20 px-3 py-1 text-xs font-bold text-[#19352b]">
                      Lesson Schedule & Rates
                    </span>
                    <p className="text-sm text-[#19352b]/85 leading-relaxed">
                      1-on-1 private lessons are held <strong>any day of the week, 1–2 times a week</strong> ($25/hr adults, $20/hr kids). Group class cohorts meet on scheduled weekly dates.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-1 text-xs font-semibold">
                      <span className="bg-white px-3.5 py-1.5 rounded-lg border border-[#19352b]/10 text-[#19352b]">Adults 1-on-1: $25 USD / hour</span>
                      <span className="bg-white px-3.5 py-1.5 rounded-lg border border-[#19352b]/10 text-[#19352b]">Kids 1-on-1: $20 USD / hour</span>
                      <span className="text-[#577565] self-center">Sibling & group cohort rates coordinated directly</span>
                    </div>
                  </div>

                  <label className="flex items-start gap-4 cursor-pointer group pt-2">
                    <div className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${data.pricingAgreed ? 'border-[#EAB308] bg-[#EAB308] text-white' : 'border-[#19352b]/30 group-hover:border-[#19352b]/50 bg-white'}`}>
                      {data.pricingAgreed && <Check className="size-3.5" />}
                    </div>
                    <input type="checkbox" className="sr-only" checked={data.pricingAgreed} onChange={(e) => handleUpdate('pricingAgreed', e.target.checked)} />
                    <span className="text-sm font-medium">I understand and agree to the lesson schedule and rate terms. *</span>
                  </label>
                  {errors.pricingAgreed && <p className="mt-1 ml-9 text-xs text-red-500">{errors.pricingAgreed}</p>}
                </div>

                {/* WhatsApp 24-Hour Notice Confirmation */}
                <div className="rounded-3xl bg-[#e6eee5] p-6 sm:p-8 border border-[#577565]/20 space-y-3">
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${data.whatsappConfirmed ? 'border-[#577565] bg-[#577565] text-white' : 'border-[#19352b]/30 group-hover:border-[#19352b]/50 bg-white'}`}>
                      {data.whatsappConfirmed && <Check className="size-3.5" />}
                    </div>
                    <input type="checkbox" className="sr-only" checked={data.whatsappConfirmed} onChange={(e) => handleUpdate('whatsappConfirmed', e.target.checked)} />
                    <span className="text-sm text-[#19352b]">
                      <strong>WhatsApp 24-Hour Confirmation:</strong> We will reach out to you via WhatsApp as soon as we receive your registration (within 24 hours). I confirm that my WhatsApp contact number (<strong>{data.phone || 'provided above'}</strong>) is accurate and active. Ẹ ṣeun o. *
                    </span>
                  </label>
                  {errors.whatsappConfirmed && <p className="mt-1 ml-9 text-xs text-red-500">{errors.whatsappConfirmed}</p>}
                </div>

                {/* Terms and Submit */}
                <div className="pt-6">
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${data.termsAgreed ? 'border-[#EAB308] bg-[#EAB308] text-white' : 'border-[#19352b]/30 group-hover:border-[#19352b]/50 bg-white'}`}>
                      {data.termsAgreed && <Check className="size-3.5" />}
                    </div>
                    <input type="checkbox" className="sr-only" checked={data.termsAgreed} onChange={(e) => handleUpdate('termsAgreed', e.target.checked)} />
                    <span className="text-sm">I agree to the LearnYorubaEasily <Link href="/terms" target="_blank" className="underline hover:text-[#EAB308]">Terms of Service</Link> and <Link href="/privacy" target="_blank" className="underline hover:text-[#EAB308]">Privacy Policy</Link>. *</span>
                  </label>
                  {errors.termsAgreed && <p className="mt-2 ml-9 text-xs text-red-500">{errors.termsAgreed}</p>}
                  
                  <div className="mt-4">
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <div className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${data.marketingAgreed ? 'border-[#EAB308] bg-[#EAB308] text-white' : 'border-[#19352b]/30 group-hover:border-[#19352b]/50 bg-white'}`}>
                        {data.marketingAgreed && <Check className="size-3.5" />}
                      </div>
                      <input type="checkbox" className="sr-only" checked={data.marketingAgreed} onChange={(e) => handleUpdate('marketingAgreed', e.target.checked)} />
                      <div>
                        <span className="text-sm text-[#19352b]/85">I&apos;d like to receive useful Yorùbá learning updates and announcements.</span>
                        <p className="text-[11px] text-[#19352b]/55 mt-0.5">Occasional cultural tips, proverbs, and semester cohort announcements. No spam, unsubscribe anytime.</p>
                      </div>
                    </label>
                  </div>
                  
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

          {/* Right Sidebar (Trust, Pricing & Support) */}
          {step !== 'success' && (
            <aside className="space-y-6 hidden lg:block sticky top-28">
              {/* What to expect card */}
              <div className="rounded-3xl bg-white p-6 border border-[#19352b]/10 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-semibold text-[#19352b]">What to Expect</h3>
                <ul className="space-y-3.5 text-xs text-[#19352b]/80">
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e6eee5] text-[#577565] font-bold text-[10px]">✓</span>
                    <span><strong>100% Live Video Lessons:</strong> Interactive sessions on Zoom or Google Meet with real-time feedback.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e6eee5] text-[#577565] font-bold text-[10px]">✓</span>
                    <span><strong>Patient Native Tutors:</strong> Dedicated instructors who break down tones, vowels, and phrases clearly.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e6eee5] text-[#577565] font-bold text-[10px]">✓</span>
                    <span><strong>WhatsApp Study Group:</strong> Free community access for daily speaking practice and cultural proverbs.</span>
                  </li>
                </ul>
              </div>

              {/* Pricing breakdown card */}
              <div className="rounded-3xl bg-[#19352b] text-[#f8f6f0] p-6 shadow-sm space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FDE047]">Transparent Rates</span>
                <div className="space-y-2 pt-1 border-t border-white/10 text-xs">
                  <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                    <span>Adult Private (1-on-1)</span>
                    <strong className="text-sm text-white font-mono">$25 / hr</strong>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                    <span>Kids 1-on-1 Tutoring</span>
                    <strong className="text-sm text-white font-mono">$20 / hr</strong>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span>Group Classes</span>
                    <span className="text-[#FDE047] font-medium">Cohort schedules</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#f8f6f0]/60 leading-relaxed pt-1">
                  Rescheduling is flexible with at least 24 hours advance notice.
                </p>
              </div>

              {/* Help & WhatsApp Card */}
              <div className="rounded-3xl bg-[#e6eee5] p-5 border border-[#19352b]/10 text-xs space-y-2">
                <p className="font-semibold text-[#19352b]">Questions before registering?</p>
                <p className="text-[#19352b]/70">We&apos;re happy to assist with cohort times, tutor placement, or family plans.</p>
                <a
                  href="https://wa.me/+2348185051113?text=Hello!%20I%20have%20a%20question%20about%20registering%20for%20LearnYorubaEasily%20classes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#19352b] hover:text-[#EAB308] pt-1"
                >
                  <MessageCircle className="size-4 text-[#25D366]" /> Chat on WhatsApp &rarr;
                </a>
              </div>
            </aside>
          )}

        </div>
      </div>
    </div>
  )
}
