'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
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
          <h1 className="mt-4 font-serif text-4xl text-[#19352b] sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-[#19352b]/60">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="prose prose-lg prose-p:text-[#19352b]/80 prose-headings:font-serif prose-headings:text-[#19352b] max-w-none">
          <p>
            At <strong>LearnYorubaEasily</strong>, we respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, and safeguard your information when you register for our classes.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We only collect information necessary to provide our educational services to you:</p>
          <ul>
            <li><strong>Personal Identification:</strong> First name, last name, email address, and country of residence.</li>
            <li><strong>Communication Data:</strong> WhatsApp number and phone number.</li>
            <li><strong>Learning Data:</strong> Your Yorùbá fluency level, learning goals, and preferred schedules.</li>
            <li><strong>Family Data:</strong> If registering a child, we collect the child&apos;s first name and age to appropriately place them in a learning cohort.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information exclusively to facilitate your learning journey:</p>
          <ul>
            <li>To contact you directly via WhatsApp with class schedules, Zoom links, and study materials.</li>
            <li>To tailor our curriculum to your specific learning goals and proficiency level.</li>
            <li>To send you important administrative updates regarding your registration or payments.</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            <strong>We do not sell, trade, or rent your personal information to third parties.</strong> 
            We only share your information with trusted third-party service providers necessary to operate our business, such as:
          </p>
          <ul>
            <li><strong>Zoom:</strong> Used to host our live online classes.</li>
            <li><strong>Google Workspace:</strong> Used for secure internal data storage (e.g., registration forms and spreadsheets).</li>
            <li><strong>Payment Processors:</strong> Used to process class fees securely. We do not store your credit card information on our servers.</li>
          </ul>

          <h2>4. WhatsApp Communication</h2>
          <p>
            By providing your WhatsApp number during registration, you consent to being contacted by LearnYorubaEasily via WhatsApp 
            for purposes related to your classes. You may opt out of promotional messages at any time, but transactional messages 
            (like Zoom links) are required for active students.
          </p>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, 
            alteration, disclosure, or destruction.
          </p>

          <h2>6. Your Rights</h2>
          <p>
            You have the right to request access to the personal data we hold about you. You may also request that we correct or 
            delete your data at any time by contacting us directly.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at via our <Link href="/contact" className="text-[#EAB308] hover:underline">Contact Page</Link>.
          </p>
        </div>
      </motion.div>
    </main>
  )
}
