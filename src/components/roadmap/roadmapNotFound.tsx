import { FileText } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'nextjs-toploader/app'

export default function RoadmapNotFound({searchQuery}: {searchQuery?: string}) {
  const router = useRouter()
  return (
   <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className=" flex flex-col justify-end items-center h-[30vh] "
          >
            <FileText className="mx-auto text-gray-300" size={48} />
            <h3 className="text-xl font-semibold text-gray-700 mt-4">No roadmaps yet</h3>
            <p className="text-gray-500 mt-2">
              {searchQuery ? "No roadmaps match your search." : "Create your first roadmap to get started on your career journey."}
            </p>
            {!searchQuery && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/chat")}
                className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg font-semibold transition-shadow"
              >
                Create Smart Roadmap With AI
              </motion.button>
            )}
          </motion.div>
  )
}
