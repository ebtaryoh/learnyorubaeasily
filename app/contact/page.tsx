'use client'

import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f8f6f0]">
      <section className="px-5 py-24 pt-32 lg:px-8 lg:pt-40">
        <motion.div className="mx-auto max-w-[1240px]" initial="hidden" animate="visible" variants={staggerContainer}>
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16">
            <div>
              <motion.p variants={fadeUpVariants} className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#bd674b]"><span className="h-px w-10 bg-[#bd674b]" /> Get in touch</motion.p>
              <motion.h1 variants={fadeUpVariants} className="max-w-[800px] font-serif text-5xl leading-[.95] tracking-[-.05em] md:text-7xl">Let&apos;s start your <em className="text-[#bd674b]">journey.</em></motion.h1>
              <motion.p variants={fadeUpVariants} className="mt-8 max-w-[500px] text-lg leading-8 text-[#19352b]/70">Whether you&apos;re ready to register for a class, or you just have a few questions before getting started, we&apos;d love to hear from you.</motion.p>
              
              <motion.div variants={fadeUpVariants} className="mt-12 space-y-8">
                <div className="flex gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-[#19352b]/5"><Mail className="size-5 text-[#bd674b]" /></div>
                  <div>
                    <h3 className="font-semibold">Email us</h3>
                    <p className="mt-1 text-sm text-[#19352b]/70">hello@learnyorubaeasily.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-[#19352b]/5"><MapPin className="size-5 text-[#bd674b]" /></div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="mt-1 text-sm text-[#19352b]/70">Global classes online</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div variants={fadeUpVariants} className="bg-white rounded-3xl p-8 shadow-sm border border-[#19352b]/5 lg:p-12">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First name</label>
                    <input type="text" className="w-full rounded-xl border border-[#19352b]/10 bg-transparent px-4 py-3 outline-none focus:border-[#bd674b] transition-colors" placeholder="Jane" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last name</label>
                    <input type="text" className="w-full rounded-xl border border-[#19352b]/10 bg-transparent px-4 py-3 outline-none focus:border-[#bd674b] transition-colors" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email address</label>
                  <input type="email" className="w-full rounded-xl border border-[#19352b]/10 bg-transparent px-4 py-3 outline-none focus:border-[#bd674b] transition-colors" placeholder="jane@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Program of interest</label>
                  <select className="w-full rounded-xl border border-[#19352b]/10 bg-transparent px-4 py-3 outline-none focus:border-[#bd674b] transition-colors appearance-none">
                    <option>Adult Yorùbá Classes</option>
                    <option>Children&apos;s Yorùbá Classes</option>
                    <option>Private Lessons</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea rows={4} className="w-full rounded-xl border border-[#19352b]/10 bg-transparent px-4 py-3 outline-none focus:border-[#bd674b] transition-colors resize-none" placeholder="Tell us a little about your goals..."></textarea>
                </div>
                <button type="submit" className="w-full rounded-xl bg-[#19352b] py-4 font-semibold text-[#f8f6f0] transition-transform hover:-translate-y-1">Send message</button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </section>
      
      <section className="px-5 pb-24 lg:px-8">
        <motion.div className="mx-auto max-w-[1240px] overflow-hidden bg-[#bd674b] px-7 py-14 text-[#f8f6f0] md:px-14 md:py-20 rounded-[24px]" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}>
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div><p className="eyebrow text-[#f8f6f0]/70">Your next chapter</p><h2 className="mt-5 max-w-[700px] font-serif text-5xl leading-[.92] tracking-[-.06em] md:text-7xl">Your Yorùbá journey can start today.</h2></div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Link href="/register" className="inline-flex items-center justify-center rounded-full bg-[#f8f6f0] px-6 py-4 text-sm font-semibold text-[#19352b]">Register for a class <ArrowUpRight className="ml-2 size-4" /></Link></motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
