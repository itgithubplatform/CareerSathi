'use client'

import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'nextjs-toploader/app'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowLeft } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import { FaLinkedin } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const {data: session, status} = useSession()
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError('')
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (error) {
      setError('Failed to sign in with Google')
      toast.error('Failed to sign in with Google')
      setIsLoading(false)
    }
  }

  const handleLinkedInSignIn = async () => {
    setIsLoading(true)
    setError('')
    try {
      await signIn('linkedin', { callbackUrl: '/dashboard' })
    } catch (error) {
      setError('Failed to sign in with LinkedIn')
      toast.error('Failed to sign in with LinkedIn')
      setIsLoading(false)
    }
  }
  if (status==="authenticated") {
    router.push('/dashboard')
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue your career journey</p>
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

          {/* OAuth Sign In Options */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              <FcGoogle className="w-6 h-6 mr-3" />
              <span className="font-medium text-gray-700 text-lg">Continue with Google</span>
            </button>
            
            <button
              onClick={handleLinkedInSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-4 bg-[#0077B5] hover:bg-[#005885] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              <FaLinkedin className="w-6 h-6 mr-3" />
              <span className="font-medium text-lg">Continue with LinkedIn</span>
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="mt-6 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
              <span className="text-gray-600">Signing you in...</span>
            </div>
          )}

          {/* Features */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Why choose CareerSathi?</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                AI-powered career recommendations
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Personalized learning roadmaps
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                Industry insights for Indian market
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>Secure authentication • Privacy protected • Trusted by 50,000+ students</p>
        </motion.div>
      </div>
    </div>
  )
}