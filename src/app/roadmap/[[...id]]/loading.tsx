"use client"
import { motion } from 'framer-motion'
import React from 'react'

export default function Loading() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent"
          />
          <p className="mt-4 text-gray-600">Loading your roadmaps...</p>
        </div>
      </div>
    );
}
