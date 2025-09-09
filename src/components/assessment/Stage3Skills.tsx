'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, Brain, Code, MessageCircle, Users, Upload, Github, Linkedin, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { AssessmentData } from '@/app/assessment/page'

interface Stage3Props {
  data: Partial<AssessmentData>
  onUpdate: (data: Partial<AssessmentData>) => void
  onSubmit: () => void
  onPrev: () => void
  isSubmitting: boolean
}

const techFamiliarityOptions = [
  { id: 'ai-ml', label: 'AI/ML & Data Science' },
  { id: 'web-dev', label: 'Web Development' },
  { id: 'mobile-dev', label: 'Mobile Development' },
  { id: 'finance-tools', label: 'Finance & Analytics Tools' },
  { id: 'design-tools', label: 'Creative & Design Tools' },
  { id: 'marketing-tools', label: 'Marketing & Social Media Tools' },
  { id: 'business-tools', label: 'Business & Productivity Tools' }
]

const SkillSlider = ({ label, value, onChange, description }: {
  label: string
  value: number
  onChange: (value: number) => void
  description: string
}) => {
  const levels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert']
  
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-900">{label}</label>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          {levels.map((level, index) => (
            <span key={level} className={value === index + 1 ? 'text-blue-600 font-medium' : ''}>
              {level}
            </span>
          ))}
        </div>
        <input
          type="range"
          min="1"
          max="5"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="text-center">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {levels[value - 1]} ({value}/5)
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Stage3Skills({ data, onUpdate, onSubmit, onPrev, isSubmitting }: Stage3Props) {
  const [formData, setFormData] = useState({
    problemSolving: data.problemSolving || 3,
    codingProficiency: data.codingProficiency || 1,
    communication: data.communication || 3,
    hasProjects: data.hasProjects || false,
    projectDescription: data.projectDescription || '',
    techFamiliarity: data.techFamiliarity || [],
    teamwork: data.teamwork || 3,
    linkedinUrl: data.linkedinUrl || '',
    githubUrl: data.githubUrl || ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSkillChange = (skill: string, value: number) => {
    setFormData(prev => ({ ...prev, [skill]: value }))
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const toggleTechFamiliarity = (techId: string) => {
    setFormData(prev => ({
      ...prev,
      techFamiliarity: prev.techFamiliarity.includes(techId)
        ? prev.techFamiliarity.filter(id => id !== techId)
        : [...prev.techFamiliarity, techId]
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (formData.hasProjects && !formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Please describe your projects'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onUpdate(formData)
      onSubmit()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Assess your skills</h2>
        <p className="text-gray-600">Help us understand your current skill level and experience</p>
      </div>

      <div className="space-y-8">
        {/* Core Skills */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-blue-600" />
            Core Skills Assessment
          </h3>
          
          <SkillSlider
            label="Problem-solving & Logical Reasoning"
            value={formData.problemSolving}
            onChange={(value) => handleSkillChange('problemSolving', value)}
            description="Your ability to analyze problems and find creative solutions"
          />
          
          <SkillSlider
            label="Coding & Programming"
            value={formData.codingProficiency}
            onChange={(value) => handleSkillChange('codingProficiency', value)}
            description="Your experience with programming languages and software development"
          />
          
          <SkillSlider
            label="Communication & Presentation"
            value={formData.communication}
            onChange={(value) => handleSkillChange('communication', value)}
            description="Your ability to communicate ideas clearly and present to others"
          />
          
          <SkillSlider
            label="Teamwork & Leadership"
            value={formData.teamwork}
            onChange={(value) => handleSkillChange('teamwork', value)}
            description="Your experience working in teams and leading projects"
          />
        </div>

        {/* Project Experience */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Experience</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="hasProjects"
                checked={formData.hasProjects}
                onChange={(e) => handleInputChange('hasProjects', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="hasProjects" className="text-sm font-medium text-gray-700">
                I have worked on projects (academic, personal, or professional)
              </label>
            </div>
            
            {formData.hasProjects && (
              <div>
                <textarea
                  value={formData.projectDescription}
                  onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.projectDescription ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={4}
                  placeholder="Briefly describe your notable projects, technologies used, and your role..."
                />
                {errors.projectDescription && <p className="text-red-500 text-sm mt-1">{errors.projectDescription}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Tech Familiarity */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Technology Familiarity</h3>
          <p className="text-sm text-gray-600 mb-4">Select areas you have some experience with (optional)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {techFamiliarityOptions.map(tech => (
              <button
                key={tech.id}
                onClick={() => toggleTechFamiliarity(tech.id)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                  formData.techFamiliarity.includes(tech.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{tech.label}</span>
                  {formData.techFamiliarity.includes(tech.id) && (
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Optional Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Profiles (Optional)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Linkedin className="w-4 h-4 inline mr-1 text-blue-600" />
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Github className="w-4 h-4 inline mr-1 text-gray-800" />
                GitHub Profile URL
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="https://github.com/yourusername"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Help Option */}
      <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
        <h3 className="text-lg font-semibold text-orange-800 mb-3">Need Help with Skills Assessment?</h3>
        <p className="text-orange-700 mb-4">Not sure how to rate your skills or feeling confused about the questions?</p>
        <Link href="/chat" className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
          <MessageCircle className="w-4 h-4 mr-2" />
          Chat with CareerSathi for Help
        </Link>
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
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center space-x-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span>Get My Career Path</span>
              <Brain className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}