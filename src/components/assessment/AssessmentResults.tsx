'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Target, BookOpen, MessageCircle, RotateCcw, ExternalLink, Star } from 'lucide-react'
import { AssessmentData } from '@/app/assessment/page'
import Link from 'next/link'

interface AssessmentResultsProps {
  data: AssessmentData
}

const mockCareerMatches = [
  {
    id: 1,
    title: 'Full Stack Developer',
    match: 92,
    description: 'Build end-to-end web applications using modern technologies',
    skills: ['React', 'Node.js', 'Database Design', 'API Development'],
    avgSalary: '₹8-15 LPA',
    growth: 'High',
    companies: ['Google', 'Microsoft', 'Flipkart', 'Zomato']
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    match: 92,
    description: 'Build end-to-end AI/ML applications using modern technologies',
    skills: ['AI','ML','DL','MLOPS'],
    avgSalary: '₹8-15 LPA',
    growth: 'High',
    companies: ['Google', 'Microsoft', 'Flipkart', 'Zomato']
  },
  {
    id: 3,
    title: 'Product Manager',
    match: 87,
    description: 'Lead product strategy and work with cross-functional teams',
    skills: ['Product Strategy', 'Data Analysis', 'User Research', 'Communication'],
    avgSalary: '₹12-25 LPA',
    growth: 'Very High',
    companies: ['Amazon', 'Swiggy', 'Paytm', 'Ola']
  },
  {
    id: 4,
    title: 'Data Scientist',
    match: 78,
    description: 'Analyze data to derive insights and build predictive models',
    skills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
    avgSalary: '₹10-20 LPA',
    growth: 'Very High',
    companies: ['Netflix', 'Uber', 'LinkedIn', 'Airbnb']
  }
]

const skillGaps = [
  { skill: 'React.js', current: 2, required: 4, priority: 'High' },
  { skill: 'System Design', current: 1, required: 3, priority: 'Medium' },
  { skill: 'Database Management', current: 2, required: 4, priority: 'High' },
  { skill: 'Cloud Platforms', current: 1, required: 3, priority: 'Medium' }
]

export default function AssessmentResults({ data }: AssessmentResultsProps) {
  const [selectedCareer, setSelectedCareer] = useState(mockCareerMatches[0])
  const [showSkillGap, setShowSkillGap] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Sparkles className="w-8 h-8" />
          <h2 className="text-3xl font-bold">Your Career Path Revealed!</h2>
        </div>
        <p className="text-blue-100 text-lg">
          Based on your profile, we've found {mockCareerMatches.length} perfect career matches for you, {data.name?.split(' ')[0]}!
        </p>
      </div>

      {/* Career Matches */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Target className="w-6 h-6 mr-2 text-green-600" />
          Top Career Matches
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {mockCareerMatches.map((career) => (
            <motion.div
              key={career.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedCareer(career)}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                selectedCareer.id === career.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-900">{career.title}</h4>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-green-600">{career.match}%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{career.description}</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Salary:</span>
                  <span className="font-medium">{career.avgSalary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Growth:</span>
                  <span className="font-medium text-green-600">{career.growth}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Career Details */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-xl font-bold text-gray-900 mb-4">{selectedCareer.title} - Detailed View</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-gray-900 mb-2">Required Skills</h5>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCareer.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">Top Companies</h5>
              <div className="flex flex-wrap gap-2">
                {selectedCareer.companies.map((company) => (
                  <span key={company} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {company}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Match Score:</span>
                  <span className="font-bold text-green-600">{selectedCareer.match}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Salary Range:</span>
                  <span className="font-medium">{selectedCareer.avgSalary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Career Growth:</span>
                  <span className="font-medium text-green-600">{selectedCareer.growth}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Gap Analysis */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-orange-600" />
            Skill Gap Analysis
          </h3>
          <button
            onClick={() => setShowSkillGap(!showSkillGap)}
            className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 transition-colors"
          >
            {showSkillGap ? 'Hide Details' : 'Show Details'}
          </button>
        </div>

        {showSkillGap && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            {skillGaps.map((gap, index) => (
              <div key={gap.skill} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{gap.skill}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    gap.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {gap.priority} Priority
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Current: {gap.current}/5</span>
                      <span>Required: {gap.required}/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(gap.current / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    Gap: {gap.required - gap.current}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">What's Next?</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/roadmap" className="block">
            <div className="p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer">
              <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Get Learning Roadmap</h4>
              <p className="text-sm text-gray-600">Personalized step-by-step learning path</p>
            </div>
          </Link>
          
          <Link href="/chat" className="block">
            <div className="p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors cursor-pointer">
              <MessageCircle className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Chat with CareerSathi</h4>
              <p className="text-sm text-gray-600">Get personalized career guidance</p>
            </div>
          </Link>
          
          <div className="p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors cursor-pointer">
            <RotateCcw className="w-8 h-8 text-purple-600 mb-3" />
            <h4 className="font-bold text-gray-900 mb-2">Retake Assessment</h4>
            <p className="text-sm text-gray-600">Update your profile and get new matches</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}