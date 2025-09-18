"use client"
import React, { useEffect } from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import { useAtom } from 'jotai';
import { questionsAtom } from '@/lib/atom';
import { Circle } from 'lucide-react';

export default function DailyQuestions() {
     const [questions, setQuestions] = useAtom(questionsAtom);
      const getQuestions = async () => {
        try {
          const response = await fetch('/api/questions', {
            method: 'GET',
          });
          const data = await response.json();
          console.log(data);
          
          setQuestions(data.questions);
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      }
      useEffect(()=>{
        getQuestions()
      },[])
      const toggleDone = async(id: string) => {
        try {
          const updatedQuestions = questions.map((question: any) => {
            if (question.id === id) {
              return {
                ...question,
                isAnswered: true,
              };
            }
            return question;
          })
          setQuestions(updatedQuestions);
          const response = await fetch('/api/questions/mark-as-answered', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ questionId: id }),
          });
          if (!response.ok) {
            const updatedQuestions = questions.map((question: any) => {
          if (question.id === id) {
            return {
              ...question,
              isAnswered: false,
            };
          }
          return question;
        })
        setQuestions(updatedQuestions);
            
          }
        } catch (error) {
          const updatedQuestions = questions.map((question: any) => {
          if (question.id === id) {
            return {
              ...question,
              isAnswered: false,
            };
          }
          return question;
        })
        setQuestions(updatedQuestions);
        }
      };
  return (
    <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/50 rounded-xl p-6 mb-8 shadow-lg "
            >
              <h2 className="text-xl font-semibold px-3 text-gray-900 mb-6">
                Today's challenges
              </h2>
              <div className="flex flex-col gap-3 h-[23rem] overflow-y-auto">
                {!questions?<div className='flex items-center justify-center h-full w-full'><motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent"
                          /></div>:questions.length > 0 && questions.some((question: any) => !question.isAnswered) ? (
                  <AnimatePresence>
                    {questions.map(
                      (question: any, index: number) =>
                        !question.isAnswered && (
                          <motion.div
                            onClick={() => toggleDone(question.id)}
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 hover:cursor-pointer"
                          >
                            <span className="text-gray-800">{question.questionText}</span>
                            <button
                              className="flex items-center gap-2 p-1 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                            >
                              <Circle size={18} />
                            </button>
                          </motion.div>
                        )
                    )}
                  </AnimatePresence>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 text-green-700 rounded-lg text-center font-semibold"
                  >
                    Amazing! You've completed all your challenges today!
                  </motion.div>
                )}
              </div>
            </motion.div>
  )
}
