'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    program: 'Adult Yorùbá Classes',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbyVlNMvIlkWpBcQCXne0TE6fvZ6Oi8FNs0ftYfJfj6x-pdLyCC6vvF2lITDLSop1kcn/exec'
      
      const searchParams = new URLSearchParams()
      searchParams.append('registerType', 'Contact Form Inquiry') // So they know it's not a full registration
      Object.entries(formData).forEach(([key, value]) => {
        searchParams.append(key, value)
      })
      searchParams.append('timestamp', new Date().toISOString())

      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: searchParams,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: 'no-cors'
      })

      setIsSubmitting(false)
      setIsSuccess(true)
      setFormData({ firstName: '', lastName: '', email: '', program: 'Adult Yorùbá Classes', message: '' })
      
    } catch (err) {
      console.error(err)
      setIsSubmitting(false)
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f6f0]">
      <section className="px-5 py-24 pt-32 lg:px-8 lg:pt-40">
        <motion.div className="mx-auto max-w-[1240px]" initial="hidden" animate="visible" variants={staggerContainer}>
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16">
            <div>
              <motion.p variants={fadeUpVariants} className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#EAB308]"><span className="h-px w-10 bg-[#EAB308]" /> Get in touch</motion.p>
              <motion.h1 variants={fadeUpVariants} className="max-w-[800px] font-serif text-5xl leading-[.95] tracking-[-.05em] md:text-7xl">Let&apos;s start your <em className="text-[#EAB308]">journey.</em></motion.h1>
              <motion.p variants={fadeUpVariants} className="mt-8 max-w-[500px] text-lg leading-8 text-[#19352b]/70">Whether you&apos;re ready to register for a class, or you just have a few questions before getting started, we&apos;d love to hear from you.</motion.p>
              
              <motion.div variants={fadeUpVariants} className="mt-12 space-y-8">
                <div className="flex gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-[#19352b]/5"><Mail className="size-5 text-[#EAB308]" /></div>
                  <div>
                    <h3 className="font-semibold">Email us</h3>
                    <a href="mailto:learnyorubaeasily@gmail.com" className="mt-1 text-sm text-[#19352b]/70 hover:text-[#EAB308] transition-colors">learnyorubaeasily@gmail.com</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-[#19352b]/5"><MapPin className="size-5 text-[#EAB308]" /></div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="mt-1 text-sm text-[#19352b]/70">Global classes online</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div variants={fadeUpVariants} className="bg-white rounded-3xl p-8 shadow-sm border border-[#19352b]/5 lg:p-12">
              {isSuccess ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-center py-12">
                  <div className="flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#19352b]">Message sent!</h3>
                  <p className="text-[#19352b]/70">Thank you for reaching out. We will get back to you shortly.</p>
                  <button onClick={() => setIsSuccess(false)} className="mt-4 text-sm font-semibold text-[#EAB308] hover:underline">Send another message</button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First name</label>
                      <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full rounded-xl border border-[#19352b]/10 bg-transparent px-4 py-3 outline-none focus:border-[#EAB308] transition-colors" placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last name</label>
                      <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full rounded-xl border border-[#19352b]/10 bg-transparent px-4 py-3 outline-none focus:border-[#EAB308] transition-colors" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-xl border border-[#19352b]/10 bg-transparent px-4 py-3 outline-none focus:border-[#EAB308] transition-colors" placeholder="jane@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Program of interest</label>
                    <select name="program" value={formData.program} onChange={handleChange} className="w-full rounded-xl border border-[#19352b]/10 bg-transparent px-4 py-3 outline-none focus:border-[#EAB308] transition-colors appearance-none">
                      <option>Adult Yorùbá Classes</option>
                      <option>Children&apos;s Yorùbá Classes</option>
                      <option>Private Lessons</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full rounded-xl border border-[#19352b]/10 bg-transparent px-4 py-3 outline-none focus:border-[#EAB308] transition-colors resize-none" placeholder="Tell us a little about your goals..."></textarea>
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-[#19352b] py-4 font-semibold text-[#f8f6f0] transition-transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0">
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>
      
      <section className="px-5 pb-24 lg:px-8">
        <motion.div className="mx-auto max-w-[1240px] overflow-hidden bg-[#EAB308] px-7 py-14 text-[#f8f6f0] md:px-14 md:py-20 rounded-[24px]" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}>
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div><p className="eyebrow text-[#f8f6f0]/70">Your next chapter</p><h2 className="mt-5 max-w-[700px] font-serif text-5xl leading-[.92] tracking-[-.06em] md:text-7xl">Your Yorùbá journey can start today.</h2></div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Link href="/register" className="inline-flex items-center justify-center rounded-full bg-[#f8f6f0] px-6 py-4 text-sm font-semibold text-[#19352b]">Register for a class <ArrowUpRight className="ml-2 size-4" /></Link></motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
