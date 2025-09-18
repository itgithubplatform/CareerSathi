'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'nextjs-toploader/app'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { User, Calendar, Circle, Bot, FileText, Briefcase } from 'lucide-react'
import Header from '@/components/layout/Header'
import { chats, getRandomGreeting, recommendedJobs } from '@/lib/constants'
import { careerTasks } from '@/lib/constants'
import Link from 'next/link'
import UserProgressDashboard from '@/components/dashboard/UserProgressDashboard'
import DailyQuestions from '@/components/dashboard/dailyQuestions'
import TodaysGoal from '@/components/dashboard/todaysGoal'
import QuickActions from '@/components/dashboard/quickActions'


export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [tasks, setTasks] = useState(careerTasks);
  const [greeting, setGreeting] = useState('');
  const [supportText, setSupportText] = useState('');
 useEffect(()=>{
        const { greeting, supportText } = getRandomGreeting()
        setGreeting(greeting)
        setSupportText(supportText)
      },[])
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

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
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 pt-20 lg:pt-28">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex justify-between items-start"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {greeting}, {session.user?.name?.split(" ")[0] || session.user?.email?.split("@")[0]}!
              </h1>
              <p className="text-gray-600 ml-1">{supportText}</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-6 ">
            <UserProgressDashboard />
              <QuickActions />
            </div>
            <div className="grid grid-cols-1 gap-6 ">
             <TodaysGoal />
            <DailyQuestions />
            </div>

            {/* Goals + Jobs */}
              {/* Today's Goal */}
          {/* Quick Actions */}
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Career Roadmap */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Career Roadmap</h2>
              <div className="space-y-4">
                {[
                  { title: 'Complete Profile Assessment', status: 'completed', progress: 100 },
                  { title: 'Learn React.js Fundamentals', status: 'in-progress', progress: 65 },
                  { title: 'Build Portfolio Projects', status: 'pending', progress: 0 },
                  { title: 'Apply for Internships', status: 'pending', progress: 0 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <div className={`w-3 h-3 rounded-full ${item.status === 'completed' ? 'bg-green-500' :
                      item.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                      }`}></div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.title}</h3> 
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{item.progress}%</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Events */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  {[
                    { title: 'Career Fair', date: 'Dec 15', time: '10:00 AM' },
                    { title: 'Tech Workshop', date: 'Dec 18', time: '2:00 PM' },
                    { title: 'Mock Interview', date: 'Dec 22', time: '11:00 AM' },
                  ].map((event, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recommended Skills */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Skills</h3>
                <div className="space-y-2">
                  {['JavaScript', 'Python', 'Data Analysis', 'UI/UX Design', 'Project Management'].map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{skill}</span>
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                        Learn
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}