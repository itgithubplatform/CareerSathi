"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Roadmap } from '@/types/roadmap'
import RoadmapCard from '../roadmap/roadmapCard'

export default function DashboardRoadmapCard({roadmaps}:{roadmaps: Roadmap[]}) {
    
  return (
    <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className=" bg-white rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Career Roadmap</h2>
              <div className="space-y-4 overflow-y-auto max-h-[24rem]">
                {roadmaps.length > 0 ?roadmaps.map((item, index) => (
                  <RoadmapCard key={index} roadmap={item} index={index} />
                )): <div className='h-20 flex justify-center items-center'><p className="text-gray-600">No roadmaps found.</p></div>}
              </div>
            </motion.div>
  )
}
