'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Target, BookOpen, TrendingUp, Award, Calendar, LogOut } from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-start"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {session.user?.name || session.user?.email?.split('@')[0]}!
            </h1>
            <p className="text-gray-600">
              Continue your career journey with personalized insights and recommendations.
            </p>
            {session.user?.provider && (
              <p className="text-sm text-blue-600 mt-1">
                Signed in with {session.user.provider === 'google' ? 'Google' : session.user.provider === 'linkedin' ? 'LinkedIn' : 'Email'}
              </p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-700 hover:text-gray-900"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Target, label: 'Career Goals', value: '3 Active', color: 'from-blue-500 to-blue-600' },
            { icon: BookOpen, label: 'Skills Learning', value: '5 In Progress', color: 'from-green-500 to-green-600' },
            { icon: TrendingUp, label: 'Progress Score', value: '78%', color: 'from-purple-500 to-purple-600' },
            { icon: Award, label: 'Achievements', value: '12 Earned', color: 'from-orange-500 to-orange-600' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
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
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'completed' ? 'bg-green-500' :
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
  )
}