"use client"
import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAtom } from 'jotai';
import { questionsAtom } from '@/lib/atom';
import { CheckCircle, Circle } from 'lucide-react';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

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
    useEffect(() => {
        getQuestions()
    }, [])
    const toggleDone = async (id: string) => {
        try {
            const updatedQuestions = questions && questions.map((question: any) => {
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
                const updatedQuestions = questions && questions.map((question: any) => {
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
            const updatedQuestions = questions && questions.map((question: any) => {
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
            <h2 className="text-xl font-semibold  text-gray-900 mb-3">
                Today's challenges
            </h2>
            <div className="flex flex-col gap-3 h-[386px] overflow-y-auto">
                {!questions ? <div className='flex items-center justify-center h-full w-full'><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div> : questions && questions.length > 0 && questions.some((question: any) => !question.isAnswered) ? (
                    <AnimatePresence>
                        {questions && questions.map(
                            (question: any, index: number) =>
                                !question.isAnswered && (
                                    <motion.div
                                        key={index}
                                        onClick={() => toggleDone(question.id)}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ delay: index * 0.07, duration: 0.25 }}
                                        className="group relative flex flex-col md:flex-row gap-3 justify-between items-center p-5 rounded-2xl border border-gray-200 shadow-sm
             bg-white hover:shadow-md hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                                    >
                                        <div className="flex-1">
                                            <ReactMarkdown
                                                components={{
                                                    p: ({ children }) => <p className="mb-2 text-gray-800 leading-relaxed">{children}</p>,
                                                    ul: ({ children }) => <ul className="list-disc ml-6 mb-2 text-gray-700">{children}</ul>,
                                                    ol: ({ children }) => <ol className="list-decimal ml-6 mb-2 text-gray-700">{children}</ol>,
                                                    li: ({ children }) => <li className="mb-1">{children}</li>,
                                                    h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 text-gray-900">{children}</h3>,
                                                    h4: ({ children }) => <h4 className="text-base font-medium mb-1 text-gray-900">{children}</h4>,
                                                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                                    em: ({ children }) => <em className="italic">{children}</em>,
                                                    a: ({ children, href }) => (
                                                        <Link
                                                            href={href || "/roadmap"}
                                                            className="inline-block text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {children}
                                                        </Link>
                                                    ),
                                                }}
                                                remarkPlugins={[remarkGfm]}
                                            >
                                                {question.questionText}
                                            </ReactMarkdown>
                                        </div>

                                        <button
                                             className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200
      bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200`}
                                        >
                                           <Circle size={18} className="text-gray-500" />
                                            <span className="text-sm font-medium">Mark Done</span>
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
                        className="p-6 text-green-600 rounded-lg flex items-center justify-center font-semibold h-full"
                    >
                        <CheckCircle size={24} />
                        <span className="ml-2 text-sm md:text-base">You hit 100% of today’s goal!</span>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}
