'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, MapPin, GraduationCap, Calendar, Shield } from 'lucide-react'
import { AssessmentData } from '@/app/assessment/page'

interface Stage1Props {
  data: Partial<AssessmentData>
  onUpdate: (data: Partial<AssessmentData>) => void
  onNext: () => void
}

const educationLevels = [
  { value: '10th', label: '10th Grade' },
  { value: '12th', label: '12th Grade' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'btech', label: 'B.Tech/Engineering' },
  { value: 'bsc', label: 'B.Sc' },
  { value: 'bcom', label: 'B.Com' },
  { value: 'ba', label: 'B.A' },
  { value: 'other', label: 'Other' }
]

const currentYears = [
  { value: '1', label: '1st Year' },
  { value: '2', label: '2nd Year' },
  { value: '3', label: '3rd Year' },
  { value: '4', label: '4th Year' },
  { value: 'completed', label: 'Completed' },
  { value: 'working', label: 'Working Professional' }
]

export default function Stage1Identity({ data, onUpdate, onNext }: Stage1Props) {
  const [formData, setFormData] = useState({
    name: data.name || '',
    age: data.age || '',
    educationLevel: data.educationLevel || '',
    currentYear: data.currentYear || '',
    location: data.location || '',
    consent: data.consent || false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.age || formData.age < 15 || formData.age > 50) newErrors.age = 'Please enter a valid age (15-50)'
    if (!formData.educationLevel) newErrors.educationLevel = 'Education level is required'
    if (!formData.currentYear) newErrors.currentYear = 'Current year is required'
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (!formData.consent) newErrors.consent = 'Consent is required to proceed'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      onUpdate({
        name: formData.name,
        age: Number(formData.age),
        educationLevel: formData.educationLevel,
        currentYear: formData.currentYear,
        location: formData.location,
        consent: formData.consent
      })
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's get to know you!</h2>
        <p className="text-gray-600">Tell us about yourself to personalize your career journey</p>
      </div>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age *
          </label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.age ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your age"
            min="15"
            max="50"
          />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
        </div>

        {/* Education Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <GraduationCap className="w-4 h-4 inline mr-1" />
            Education Level *
          </label>
          <select
            value={formData.educationLevel}
            onChange={(e) => handleInputChange('educationLevel', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.educationLevel ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select your education level</option>
            {educationLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
          {errors.educationLevel && <p className="text-red-500 text-sm mt-1">{errors.educationLevel}</p>}
        </div>

        {/* Current Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Current Year/Status *
          </label>
          <select
            value={formData.currentYear}
            onChange={(e) => handleInputChange('currentYear', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.currentYear ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select your current year</option>
            {currentYears.map(year => (
              <option key={year.value} value={year.value}>{year.label}</option>
            ))}
          </select>
          {errors.currentYear && <p className="text-red-500 text-sm mt-1">{errors.currentYear}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Location *
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="City, State, Country (e.g., Mumbai, Maharashtra, India)"
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        {/* Consent */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent}
              onChange={(e) => handleInputChange('consent', e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <label htmlFor="consent" className="text-sm font-medium text-gray-700 cursor-pointer">
                <Shield className="w-4 h-4 inline mr-1 text-blue-600" />
                Data Usage Consent *
              </label>
              <p className="text-sm text-gray-600 mt-1">
                I consent to CareerSathi using my data to provide personalized career recommendations and skill roadmaps. 
                Your data is secure and will never be shared externally.
              </p>
            </div>
          </div>
          {errors.consent && <p className="text-red-500 text-sm mt-2">{errors.consent}</p>}
        </div>
      </div>

      {/* Next Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleNext}
          className="flex items-center space-x-2 btn-primary"
        >
          <span>Continue to Interests</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}