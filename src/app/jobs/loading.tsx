"use client"
import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'

export default function Loading() {
  const [progress, setProgress] = useState(0)
  const [currentTip, setCurrentTip] = useState(0)
  
  const tips = [
    "Analyzing your skills and experience...",
    "Searching for the best matching jobs...",
    "Filtering by your preferred criteria...",
    "Checking market trends in your field...",
    "Almost ready with your recommendations!"
  ]

  useEffect(() => {
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 5
      })
    }, 500)

    // Rotate through tips
    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length)
    }, 3000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(tipInterval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Finding Your Perfect Job Match
        </h2>
        
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity }
            }}
            className="w-20 h-20 rounded-full border-4 border-blue-500 border-t-transparent relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-blue-600">{Math.round(progress)}%</span>
            </div>
          </motion.div>
        </div>
        
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div 
              className="bg-blue-600 h-2.5 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        <motion.div
          key={currentTip}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <p className="text-gray-600">{tips[currentTip]}</p>
        </motion.div>
        
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="h-4 bg-blue-200 rounded"
            />
          ))}
        </div>
        
        <div className="text-center">
          <motion.p 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm text-gray-500"
          >
            This may take a few seconds...
          </motion.p>
        </div>
      </div>
    </div>
  )
}