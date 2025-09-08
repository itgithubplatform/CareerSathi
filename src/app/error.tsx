"use client"

import React from "react"
import Link from "next/link"
import { Home, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center p-8 max-w-lg mx-auto"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="mb-8"
        >
          <svg
            className="mx-auto h-24 w-24 text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 
              2 12s4.48 10 10 10 10-4.48 
              10-10S17.52 2 12 2zm0 18c-4.41 
              0-8-3.59-8-8s3.59-8 8-8 
              8 3.59 8 8-3.59 8-8 
              8zm-1-13h2v6h-2zm0 8h2v2h-2z">
            </path>
          </svg>
        </motion.div>

        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2">
          Oops! Something went wrong.
        </h1>
        <p className="text-lg text-[var(--text-secondary)] mb-8">
          This page isn’t ready yet, but don’t worry — you’ve got options.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>

          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 w-full sm:w-auto border border-blue-500 text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </button>
        </div>
      </motion.div>
    </div>
  )
}
