'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface StatsCounterProps {
  number: number
  label: string
  suffix?: string
}

export default function StatsCounter({ number, label, suffix = '' }: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const duration = 2000 // 2 seconds
      const steps = 60
      const increment = number / steps
      const stepDuration = duration / steps

      let currentCount = 0
      const timer = setInterval(() => {
        currentCount += increment
        if (currentCount >= number) {
          setCount(number)
          clearInterval(timer)
        } else {
          setCount(Math.floor(currentCount))
        }
      }, stepDuration)

      return () => clearInterval(timer)
    }
  }, [isVisible, number])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onViewportEnter={() => setIsVisible(true)}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-600 font-medium">
        {label}
      </div>
    </motion.div>
  )
}