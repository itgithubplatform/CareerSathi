'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'nextjs-toploader/app'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { User, Target, BookOpen, TrendingUp, Award, Calendar, LogOut, CheckCircle, Circle, Bot, FileText, Briefcase } from 'lucide-react'
import toast from 'react-hot-toast'
import Header from '@/components/layout/Header'
import { chats, getRandomGreeting, recommendedJobs } from '@/lib/constants'
import { careerTasks } from '@/lib/constants'
import Link from 'next/link'


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
  const toggleDone = (index: number) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };
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
                {greeting}, {session.user?.name || session.user?.email?.split("@")[0]}!
              </h1>
              <p className="text-gray-600 ml-1">{supportText}</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Today's Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 mb-8 shadow-lg"
            >
              <h2 className="text-xl font-semibold px-3 text-gray-900 mb-6">
                Today's challenges
              </h2>
              <div className="flex flex-col gap-3">
                {tasks.length > 0 && tasks.some((task) => !task.done) ? (
                  <AnimatePresence>
                    {tasks.map(
                      (task: any, index: number) =>
                        !task.done && (
                          <motion.div
                            onClick={() => toggleDone(index)}
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 hover:cursor-pointer"
                          >
                            <span className="text-gray-800">{task.text}</span>
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

            {/* Goals + Jobs */}
            <div className="grid grid-cols-1 gap-6 ">
              {/* Today's Goal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-6 h-36 shadow-lg"
              >
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Today's Goal!
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {tasks.filter((t: any) => t.done).length}/{tasks.length} tasks
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 ">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(tasks.filter((t: any) => t.done).length / tasks.length) *
                        100
                        }%`,
                    }}
                  ></div>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  You're doing great. Keep it up!
                </p>
              </motion.div>

              {/* Recommended Jobs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-6  mb-8 shadow-lg "
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center justify-between w-full">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Recommended Jobs
                    </h2>
                    <Link href="/jobs" className="text-sm px-4 py-1 font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                      See more
                    </Link>
                  </div>
                </div>
                <div className="flex gap-3 w-full overflow-x-auto p-2">
                  {recommendedJobs.map((job, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition w-48 transform hover:-translate-y-1 hover:shadow-lg"
                    >
                      <h3 className="font-medium text-gray-900">{job?.title}</h3>
                      <p className="text-sm text-gray-600">{job?.company}</p>
                      <div className="flex gap-2 mt-6">
                        {job?.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg "
            >
              <h2 className='text-xl font-semibold text-gray-900 mb-6'>Recent Chats</h2>
              <div className="space-y-3 max-h-60 pb-3 overflow-y-auto">
                {chats.map((chat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-200">
                      <Bot size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{chat.title}</p>
                      <p className="text-xs text-gray-500">{chat.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg"
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
                <button className="flex items-center gap-2 p-2 px-4 rounded-xl border border-blue-400 text-blue-600 bg-blue-50 text-sm font-medium hover:bg-blue-100 hover:scale-105 transition-all duration-200">
                  <Bot size={16} />
                  Chat with AI Mentor
                </button>
              </div>

            </motion.div>
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