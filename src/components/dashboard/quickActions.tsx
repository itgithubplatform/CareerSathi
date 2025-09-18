import { Bot, Briefcase, FileText, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {motion} from 'framer-motion'
import { useRouter } from 'nextjs-toploader/app'

export default function QuickActions() {
    const router = useRouter()
  return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className=" p-6 "
            >
              <h2 className='text-xl font-semibold text-gray-900 mb-6'>Quick Actions</h2>
              <div className="flex gap-3 flex-wrap">
                <Link href="/jobs" className="flex items-center gap-2 p-2 px-4 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:scale-105 shadow-md hover:shadow-xl transition-all duration-200">
                  <Briefcase size={16} />
                  Explore Jobs
                </Link>
                <button className="flex items-center gap-2 p-2 px-4 rounded-xl border border-blue-400 text-blue-600 bg-blue-50 text-sm font-medium hover:bg-blue-100 hover:scale-105 transition-all duration-200">
                  <User size={16} />
                  Update Profile
                </button>
                <button className="flex items-center gap-2 p-2 px-4 rounded-xl border border-blue-400 text-blue-600 bg-blue-50 text-sm font-medium hover:bg-blue-100 hover:scale-105 transition-all duration-200">
                  <FileText size={16} />
                  Update Resume
                </button>
                <button onClick={e=>router.push('/chat')} className="flex items-center gap-2 p-2 px-4 rounded-xl border border-blue-400 text-blue-600 bg-blue-50 text-sm font-medium hover:bg-blue-100 hover:scale-105 transition-all duration-200">
                  <Bot size={16} />
                  Chat with AI Mentor
                </button>
              </div>

            </motion.div>
  )
}
