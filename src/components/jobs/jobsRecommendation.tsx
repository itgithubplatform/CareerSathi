"use client"
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { JobArray } from '@/types/jobsType'
import JobCard from './jobCard'
import { useAtom } from 'jotai'
import { recommendedJobsAtom } from '@/lib/atom'

export default function JobsRecommendation() {
 const [jobs, setJobs] = useAtom(recommendedJobsAtom)
     const [loading, setLoading] = React.useState(false)
     const getRecommendedJobs = async() => {
      if (jobs) {
        return
      }
         try {
           setLoading(true)
             const response = await fetch('/api/jobs/recommended', {
                 method: 'GET',
             })
             const data = await response.json()
             setJobs(data.jobs)
         } catch (error) {
             
         }finally {
             setLoading(false)
         }
     }
     useEffect(() => {
       getRecommendedJobs()
     },[])
  return (
    <>
      <motion.div initial={{opacity:0, y:20}}
                 animate={{opacity:1, y:0}} transition={{delay:.3}} className='my-10'>
                    <h3 className="mb-4 text-xl font-bold">Recommended for you</h3>
                    {loading?(
                                          <div className="h-[20rem] w-full flex items-center justify-center">
                                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                              </div>
                                        ) :
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        { !!jobs ?jobs.map((item, index) => (
                                          <JobCard key={index} job={item} index={index} />
                                        )): <div className='h-full flex justify-center items-center'><p className="text-gray-600">No recommended jobs found.</p></div>}
                    </div>
}
                </motion.div>
    </>
  )
}
