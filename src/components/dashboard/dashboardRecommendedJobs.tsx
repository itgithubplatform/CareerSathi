"use client"
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { JobArray, JobType } from '@/types/jobsType'
import JobCard from '../jobs/jobCard'

export default function DashboardRecommendedJobs() {
    const [jobs, setJobs] = React.useState<JobType[]|null>(null)
    const [loading, setLoading] = React.useState(false)
    const getRecommendedJobs = async() => {
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
     <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className=" bg-white rounded-xl h-full p-6 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recommended Jobs</h2>
              <div className="space-y-4 overflow-y-auto max-h-[24rem]">
                {!loading?!!jobs ?jobs.map((item, index) => (
                  <JobCard key={index} job={item} index={index} />
                )): <div className='h-full flex justify-center items-center'><p className="text-gray-600">No recommended jobs found.</p></div>:(
                  <div className="h-[20rem] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
                )}
              </div>
            </motion.div>
  )
}
