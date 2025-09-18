"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { JobArray } from '@/types/jobsType'
import JobExpand from './jobExpand'
import Link from 'next/link'
import JobCard from './jobCard'

export default function JobsRecommendation({jobsArr}:{jobsArr:JobArray}) {
 
  return (
    <>
      <motion.div initial={{opacity:0, y:20}}
                 animate={{opacity:1, y:0}} transition={{delay:.3}} className='my-10'>
                    <h3 className="mb-4 text-xl font-bold">Recommended for you</h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            jobsArr.map((job, i) => (
                               <JobCard key={i} job={job} index={i} />
                            ))
                        }
                    </div>
                </motion.div>
    </>
  )
}
