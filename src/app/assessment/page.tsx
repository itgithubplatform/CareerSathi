'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, User, Heart, Brain, Sparkles, CheckCircle } from 'lucide-react'

import Stage2Interests from '@/components/assessment/Stage2Interests'
import Stage3Skills from '@/components/assessment/Stage3Skills'
import AssessmentResults from '@/components/assessment/AssessmentResults'

export interface AssessmentData {
  // Stage 1
  name: string
  age: number
  educationLevel: string
  currentYear: string
  location: string
  consent: boolean
  
  // Stage 2
  interestDomains: string[]
  dayToDay: string[]
  motivation: string
  
  // Stage 3
  problemSolving: number
  codingProficiency: number
  communication: number
  hasProjects: boolean
  projectDescription: string
  techFamiliarity: string[]
  teamwork: number
  linkedinUrl?: string
  githubUrl?: string
  resumeFile?: File
}

const stages = [
  { id: 1, title: 'Identity & Context', icon: User, color: 'from-blue-500 to-blue-600' },
  { id: 2, title: 'Interests & Motivation', icon: Heart, color: 'from-purple-500 to-purple-600' },
  { id: 3, title: 'Skills & Competency', icon: Brain, color: 'from-green-500 to-green-600' },
  { id: 4, title: 'Your Career Path', icon: Sparkles, color: 'from-orange-500 to-orange-600' }
]

export default function AssessmentPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [currentStage, setCurrentStage] = useState(1)
  const [assessmentData, setAssessmentData] = useState<Partial<AssessmentData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  const updateAssessmentData = (data: Partial<AssessmentData>) => {
    setAssessmentData(prev => ({ ...prev, ...data }))
  }

  const nextStage = () => {
    if (currentStage < 4) {
      setCurrentStage(currentStage + 1)
    }
  }

  const prevStage = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1)
    }
  }

  const submitAssessment = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assessmentData)
      })
      
      if (response.ok) {
        setCurrentStage(4)
      }
    } catch (error) {
      console.error('Assessment submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStage = () => {
    switch (currentStage) {
      case 1:
        return (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Assessment Coming Soon</h2>
            <p className="text-gray-600 mb-6">The comprehensive assessment system is being prepared.</p>
            <button onClick={nextStage} className="btn-primary">
              Continue to Interests
            </button>
          </div>
        )
      case 2:
        return (
          <Stage2Interests
            data={assessmentData}
            onUpdate={updateAssessmentData}
            onNext={nextStage}
            onPrev={prevStage}
          />
        )
      case 3:
        return (
          <Stage3Skills
            data={assessmentData}
            onUpdate={updateAssessmentData}
            onSubmit={submitAssessment}
            onPrev={prevStage}
            isSubmitting={isSubmitting}
          />
        )
      case 4:
        return <AssessmentResults data={assessmentData as AssessmentData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Career Assessment</h1>
              <p className="text-gray-600 mt-1">Discover your perfect career path with AI-powered insights</p>
            </div>
            <div className="text-sm text-gray-500">
              Welcome, {session.user?.name?.split(' ')[0]}!
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center">
                <div className={`flex items-center space-x-3 ${
                  currentStage >= stage.id ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStage >= stage.id 
                      ? `bg-gradient-to-r ${stage.color} text-white` 
                      : 'bg-gray-200'
                  }`}>
                    {currentStage > stage.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <stage.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="hidden md:block">
                    <div className="font-medium text-sm">{stage.title}</div>
                  </div>
                </div>
                {index < stages.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStage > stage.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStage()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}