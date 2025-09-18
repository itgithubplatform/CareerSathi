import React from 'react'
import { questionsAtom } from '@/lib/atom'      
import { useAtom } from 'jotai' 
import { motion } from 'framer-motion'

export default function TodaysGoal() {
    const [questions, setQuestions] = useAtom(questionsAtom);
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
                    {questions?.filter((q: any) => q.isAnswered).length}/{questions?.length} tasks
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 ">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(questions?.filter((q: any) => q.isAnswered).length / questions?.length) *
                        100
                        }%`,
                    }}
                  ></div>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  You're doing great. Keep it up!
                </p>
              </motion.div>

  )
}
