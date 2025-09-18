"use client"
import React, { useMemo } from 'react'
import { questionsAtom } from '@/lib/atom'      
import { useAtom } from 'jotai' 
import { motion } from 'framer-motion'

const motivationalMessages = [
  "You're doing great. Keep it up!",
  "Nice work! Stay consistent 🔥",
  "Every step counts — you're moving forward.",
  "Solid progress! Keep pushing 🚀",
  "You're smashing your goals today!",
  "Momentum is on your side 💡",
  "Impressive focus! Stay locked in.",
  "Small wins add up — you’re proving it!",
  "You’re on fire today 🔥",
  "Crushing it! Keep going strong."
]

export default function TodaysGoal() {
  const [questions] = useAtom(questionsAtom);
  const randomMessage = useMemo(() => {
    const index = Math.floor(Math.random() * motivationalMessages.length);
    return motivationalMessages[index];
  }, []);

  const answered = questions?.filter((q: any) => q.isAnswered).length || 0;
  const total = questions?.length || 1; 
  const progress = (answered / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white/50 rounded-xl p-6 h-36 shadow-lg"
    >
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Today's Goal!
        </h2>
        <p className="text-gray-600 text-sm">
          {answered}/{questions?.length || 0} tasks
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-3 text-sm text-gray-600">
        {randomMessage}
      </p>
    </motion.div>
  )
}
