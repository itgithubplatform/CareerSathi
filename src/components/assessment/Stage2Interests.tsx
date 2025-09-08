'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronLeft, Heart, Code, Palette, DollarSign, Scale, Stethoscope, Lightbulb, Building, FileText, Search } from 'lucide-react'
import { AssessmentData } from '@/app/assessment/page'

interface Stage2Props {
  data: Partial<AssessmentData>
  onUpdate: (data: Partial<AssessmentData>) => void
  onNext: () => void
  onPrev: () => void
}

const interestDomains = [
  { id: 'ai', label: 'AI & Machine Learning', icon: Code, color: 'bg-blue-100 text-blue-700' },
  { id: 'web', label: 'Web Development', icon: Code, color: 'bg-green-100 text-green-700' },
  { id: 'design', label: 'Design & Creative', icon: Palette, color: 'bg-purple-100 text-purple-700' },
  { id: 'finance', label: 'Finance & Banking', icon: DollarSign, color: 'bg-yellow-100 text-yellow-700' },
  { id: 'law', label: 'Law & Legal', icon: Scale, color: 'bg-red-100 text-red-700' },
  { id: 'medicine', label: 'Medicine & Healthcare', icon: Stethoscope, color: 'bg-pink-100 text-pink-700' },
  { id: 'entrepreneurship', label: 'Entrepreneurship', icon: Lightbulb, color: 'bg-orange-100 text-orange-700' },
  { id: 'startups', label: 'Startups & Innovation', icon: Lightbulb, color: 'bg-indigo-100 text-indigo-700' },
  { id: 'govt', label: 'Government & Public Service', icon: Building, color: 'bg-gray-100 text-gray-700' },
  { id: 'content', label: 'Content & Media', icon: FileText, color: 'bg-teal-100 text-teal-700' },
  { id: 'research', label: 'Research & Academia', icon: Search, color: 'bg-cyan-100 text-cyan-700' }
]

const dayToDayPreferences = [
  { id: 'coding', label: 'Coding & Programming', description: 'Building software and applications' },
  { id: 'people', label: 'People-facing Work', description: 'Interacting with clients, customers, teams' },
  { id: 'research', label: 'Research & Analysis', description: 'Investigating, analyzing data and trends' },
  { id: 'design', label: 'Creative Design', description: 'Visual design, UI/UX, graphics' },
  { id: 'hands-on', label: 'Hands-on Work', description: 'Physical, practical, tangible tasks' },
  { id: 'management', label: 'Management & Leadership', description: 'Leading teams, making decisions' }
]

const motivationTypes = [
  { id: 'stability', label: 'Job Security & Stability', description: 'Steady income, job security, work-life balance' },
  { id: 'high-pay', label: 'High Salary & Growth', description: 'Maximum earning potential, rapid career growth' },
  { id: 'impact', label: 'Social Impact', description: 'Making a difference, helping society, meaningful work' },
  { id: 'creativity', label: 'Creativity & Innovation', description: 'Creative freedom, innovation, artistic expression' },
  { id: 'prestige', label: 'Recognition & Prestige', description: 'Status, recognition, professional reputation' }
]

export default function Stage2Interests({ data, onUpdate, onNext, onPrev }: Stage2Props) {
  const [formData, setFormData] = useState({
    interestDomains: data.interestDomains || [],
    dayToDay: data.dayToDay || [],
    motivation: data.motivation || ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const toggleInterestDomain = (domainId: string) => {
    setFormData(prev => ({
      ...prev,
      interestDomains: prev.interestDomains.includes(domainId)
        ? prev.interestDomains.filter(id => id !== domainId)
        : [...prev.interestDomains, domainId]
    }))
    if (errors.interestDomains) {
      setErrors(prev => ({ ...prev, interestDomains: '' }))
    }
  }

  const toggleDayToDay = (preferenceId: string) => {
    setFormData(prev => ({
      ...prev,
      dayToDay: prev.dayToDay.includes(preferenceId)
        ? prev.dayToDay.filter(id => id !== preferenceId)
        : [...prev.dayToDay, preferenceId]
    }))
    if (errors.dayToDay) {
      setErrors(prev => ({ ...prev, dayToDay: '' }))
    }
  }

  const setMotivation = (motivationId: string) => {
    setFormData(prev => ({ ...prev, motivation: motivationId }))
    if (errors.motivation) {
      setErrors(prev => ({ ...prev, motivation: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (formData.interestDomains.length === 0) {
      newErrors.interestDomains = 'Please select at least one interest domain'
    }
    if (formData.dayToDay.length === 0) {
      newErrors.dayToDay = 'Please select at least one work preference'
    }
    if (!formData.motivation) {
      newErrors.motivation = 'Please select your primary motivation'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      onUpdate(formData)
      onNext()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What drives your passion?</h2>
        <p className="text-gray-600">Help us understand your interests and work style preferences</p>
      </div>

      <div className="space-y-8">
        {/* Interest Domains */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            <Heart className="w-5 h-5 inline mr-2 text-red-500" />
            What fields interest you? (Select multiple)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {interestDomains.map(domain => (
              <button
                key={domain.id}
                onClick={() => toggleInterestDomain(domain.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  formData.interestDomains.includes(domain.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${domain.color}`}>
                  <domain.icon className="w-4 h-4" />
                </div>
                <div className="text-sm font-medium text-gray-900">{domain.label}</div>
              </button>
            ))}
          </div>
          {errors.interestDomains && <p className="text-red-500 text-sm mt-2">{errors.interestDomains}</p>}
        </div>

        {/* Day-to-Day Preferences */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            What type of work do you enjoy daily? (Select multiple)
          </label>
          <div className="space-y-3">
            {dayToDayPreferences.map(pref => (
              <button
                key={pref.id}
                onClick={() => toggleDayToDay(pref.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  formData.dayToDay.includes(pref.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900">{pref.label}</div>
                <div className="text-sm text-gray-600 mt-1">{pref.description}</div>
              </button>
            ))}
          </div>
          {errors.dayToDay && <p className="text-red-500 text-sm mt-2">{errors.dayToDay}</p>}
        </div>

        {/* Motivation */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            What motivates you most in your career? (Select one)
          </label>
          <div className="space-y-3">
            {motivationTypes.map(motivation => (
              <button
                key={motivation.id}
                onClick={() => setMotivation(motivation.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  formData.motivation === motivation.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900">{motivation.label}</div>
                <div className="text-sm text-gray-600 mt-1">{motivation.description}</div>
              </button>
            ))}
          </div>
          {errors.motivation && <p className="text-red-500 text-sm mt-2">{errors.motivation}</p>}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={onPrev}
          className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={handleNext}
          className="flex items-center space-x-2 btn-primary"
        >
          <span>Continue to Skills</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}