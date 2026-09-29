'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
  priority?: boolean
  className?: string
}

export function ParallaxImage({ src, alt, priority = false, className = '' }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  // Moves the image slightly up/down as we scroll to create depth
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Scale the image up slightly so when it moves vertically, we don't see empty space */}
      <motion.div style={{ y, scale: 1.15 }} className="absolute inset-0 h-full w-full">
        <Image 
          src={src} 
          alt={alt} 
          fill 
          priority={priority}
          className="object-cover" 
        />
      </motion.div>
    </div>
  )
}
