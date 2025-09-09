'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, ArrowLeft, Bot, User } from 'lucide-react'
import Link from 'next/link'

export default function ChatPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/assessment"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Assessment
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Chat with CareerSathi</h1>
            <p className="text-gray-600">Get personalized career guidance and clarify your doubts</p>
          </motion.div>
        </div>

        {/* Chat Interface Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 h-96 flex flex-col"
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">CareerSathi AI</h3>
              <p className="text-sm text-green-600">Online • Ready to help</p>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                <p className="text-sm text-gray-800">
                  Hi {session.user?.name?.split(' ')[0]}! I'm here to help you with your career journey. 
                  What specific questions do you have about your assessment results?
                </p>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Type your career question here..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled
              />
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled
              >
                Send
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              🚧 Chatbot integration coming soon! This will connect to your AI system.
            </p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid md:grid-cols-2 gap-4"
        >
          <Link href="/assessment" className="block">
            <div className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2">Retake Assessment</h4>
              <p className="text-sm text-gray-600">Update your profile for better recommendations</p>
            </div>
          </Link>
          
          <Link href="/dashboard" className="block">
            <div className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2">View Dashboard</h4>
              <p className="text-sm text-gray-600">See your career progress and roadmap</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}