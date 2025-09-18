'use client'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { getRandomGreeting } from '@/lib/randomGreeting';
import { Badge } from '@/components/ui/badge'

export default function WelconeText() {
  const { data: session } = useSession();
  const [greeting, setGreeting] = useState('');
  const [supportText, setSupportText] = useState('');
  useEffect(() => {
    const { greeting, supportText } = getRandomGreeting()
    setGreeting(greeting)
    setSupportText(supportText)
  }, [])
  if (!session) {
    return
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 flex justify-between items-start"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {greeting}, {session.user?.name?.split(" ")[0] || session.user?.email?.split("@")[0]}!
        </h1>
        <p className="text-gray-600 ml-1 ">{supportText}</p>
      </div>
      <Badge
        className="rounded-full px-4 py-1 hidden md:block text-sm font-medium
             bg-gradient-to-r from-yellow-100 via-orange-50 to-yellow-50
             text-orange-600 border border-orange-200
             shadow-sm transition-transform duration-200 
             hover:shadow-md hover:scale-105"
        variant="outline"
      >
        🌅 Early Bird
      </Badge>

    </motion.div>
  )
}
