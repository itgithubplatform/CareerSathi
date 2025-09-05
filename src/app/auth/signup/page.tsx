'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowLeft, Users, Target, Brain } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import { FaLinkedin } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    setError('')
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (error) {
      setError('Failed to sign up with Google')
      toast.error('Failed to sign up with Google')
      setIsLoading(false)
    }
  }

  const handleLinkedInSignUp = async () => {
    setIsLoading(true)
    setError('')
    try {
      await signIn('linkedin', { callbackUrl: '/dashboard' })
    } catch (error) {
      setError('Failed to sign up with LinkedIn')
      toast.error('Failed to sign up with LinkedIn')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back to Home */}
        <Link 
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join CareerSathi</h1>
            <p className="text-gray-600">Start your career journey with AI-powered guidance</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
            >
              {error}
            </motion.div>
          )}

          {/* OAuth Sign Up Options */}
          <div className="space-y-4 mb-6">
            <button
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              <FcGoogle className="w-6 h-6 mr-3" />
              <span className="font-medium text-gray-700 text-lg">Sign up with Google</span>
            </button>
            
            <button
              onClick={handleLinkedInSignUp}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-4 bg-[#0077B5] hover:bg-[#005885] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              <FaLinkedin className="w-6 h-6 mr-3" />
              <span className="font-medium text-lg">Sign up with LinkedIn</span>
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="mb-6 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
              <span className="text-gray-600">Creating your account...</span>
            </div>
          )}

          {/* Benefits */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">What you'll get:</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center">
                <Brain className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                <span>AI-powered career recommendations</span>
              </div>
              <div className="flex items-center">
                <Target className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                <span>Personalized learning roadmaps</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 text-pink-500 mr-2 flex-shrink-0" />
                <span>Industry insights for Indian market</span>
              </div>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                href="/auth/signin"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>Join 50,000+ students • Secure & Private • Free to start</p>
        </motion.div>
      </div>
    </div>
  )
}