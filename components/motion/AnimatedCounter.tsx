'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useSpring } from 'framer-motion'

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({ value, suffix = '', prefix = '', className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const [displayValue, setDisplayValue] = useState(0)

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  })

  useEffect(() => {
    if (inView) {
      springValue.set(value)
    }
  }, [inView, springValue, value])

  useEffect(() => {
    return springValue.onChange((latest) => {
      setDisplayValue(Math.floor(latest))
    })
  }, [springValue])

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  )
}
