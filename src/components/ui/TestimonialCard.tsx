'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  rating: number
  avatar: string
}

export default function TestimonialCard({ name, role, content, rating, avatar }: TestimonialCardProps) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 }
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 text-blue-100">
        <Quote className="w-8 h-8" />
      </div>
      
      {/* Rating */}
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      
      {/* Content */}
      <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
        "{content}"
      </blockquote>
      
      {/* Author */}
      <div className="flex items-center space-x-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
          <span className="text-white font-semibold text-lg">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full opacity-50"></div>
    </motion.div>
  )
}