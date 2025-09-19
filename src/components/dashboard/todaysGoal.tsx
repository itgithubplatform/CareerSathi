"use client"
import React, { useMemo } from 'react'
import { questionsAtom } from '@/lib/atom'      
import { useAtom } from 'jotai' 
import { motion } from 'framer-motion'

const messages = {
  start: [
    "Let’s get rolling! 🚀",
    "A fresh start — time to crush it 💪",
    "One step at a time. Begin strong!",
  ],
  mid: [
    "Great progress so far — keep going 🔥",
    "Nice momentum! Stay consistent ⚡",
    "Halfway there. You’ve got this 💡",
  ],
  near: [
    "Almost done — finish strong! 🏁",
    "Final push — don’t stop now 👊",
    "You’re so close, keep grinding 🔥",
  ],
  done: [
    "🎉 Goal complete! Amazing work.",
    "You crushed it today 💯",
    "Another win in the bag — respect 👏",
  ],
}

export default function TodaysGoal() {
  const [questions] = useAtom(questionsAtom);

  const answered = questions?.filter((q: any) => q.isAnswered).length || 0;
  const total = questions?.length || 1; 
  const progress = (answered / total) * 100;
  const randomMessage = useMemo(() => {
    let category: keyof typeof messages;

    if (progress === 0) category = "start";
    else if (progress < 50) category = "mid";
    else if (progress < 100) category = "near";
    else category = "done";

    const pool = messages[category];
    return pool[Math.floor(Math.random() * pool.length)];
  }, [progress]);

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
