'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#f8f6f0] px-5 py-24 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl"
      >
        <div className="mb-12">
          <Link href="/" className="text-sm font-semibold text-[#EAB308] hover:underline">
            &larr; Back to Home
          </Link>
          <h1 className="mt-4 font-serif text-4xl text-[#19352b] sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-[#19352b]/60">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="prose prose-lg prose-p:text-[#19352b]/80 prose-headings:font-serif prose-headings:text-[#19352b] max-w-none">
          <p>
            Welcome to <strong>LearnYorubaEasily</strong>. By registering for our classes, you agree to comply with and be bound by the following Terms of Service.
          </p>

          <h2>1. Description of Service</h2>
          <p>
            LearnYorubaEasily provides live, online Yorùbá language instruction via Zoom. Services include adult group classes, 
            children's classes, private one-on-one lessons, and conversational practice sessions.
          </p>

          <h2>2. Registration and Communication</h2>
          <p>
            By registering, you agree to provide accurate and complete information. You consent to receiving necessary 
            communications, including class links, schedules, and materials, via WhatsApp and email.
          </p>

          <h2>3. Payments</h2>
          <p>
            All fees for classes must be paid in full prior to the start of the program or lesson. 
            Prices are subject to change, but changes will not affect previously booked and paid classes.
          </p>

          <h2>4. Cancellations, Rescheduling, and Refunds</h2>
          <ul>
            <li><strong>Private Lessons:</strong> If you need to reschedule or cancel a private lesson, you must provide at least 24 hours' notice. Failure to do so will result in the forfeiture of that lesson without a refund.</li>
            <li><strong>Group Classes:</strong> Because group classes rely on cohort participation, missed sessions cannot be individually rescheduled. Refunds for group programs are only issued if requested at least 48 hours before the very first class of the cohort begins.</li>
            <li><strong>Instructor Cancellation:</strong> If an instructor must cancel a class due to an emergency, a makeup session will be scheduled at no additional cost to you.</li>
          </ul>

          <h2>5. Code of Conduct</h2>
          <p>
            We strive to create a welcoming and safe environment for all learners. 
            Harassment, discrimination, or disruptive behavior during online classes will not be tolerated. 
            LearnYorubaEasily reserves the right to remove any student from a class or program without a refund if they violate this code of conduct.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            All class materials, worksheets, curriculum documents, and resources provided to you are the intellectual property 
            of LearnYorubaEasily. They are for your personal educational use only. You may not copy, reproduce, resell, or 
            distribute these materials to non-registered individuals.
          </p>

          <h2>7. Recording Policy</h2>
          <p>
            To protect the privacy of all students, personal recording of live Zoom classes is strictly prohibited unless 
            explicitly permitted by the instructor. If LearnYorubaEasily records a session for review purposes, all participants 
            will be notified beforehand.
          </p>

          <h2>8. Modifications to Terms</h2>
          <p>
            We reserve the right to update these Terms of Service at any time. Significant changes will be communicated to 
            active students via WhatsApp or email.
          </p>

          <h2>9. Contact</h2>
          <p>
            If you have any questions regarding these terms, please reach out to us via our <Link href="/contact" className="text-[#EAB308] hover:underline">Contact Page</Link>.
          </p>
        </div>
      </motion.div>
    </main>
  )
}
