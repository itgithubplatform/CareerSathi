"use client"
import React, { useEffect } from 'react'
import {motion} from 'framer-motion'
import { JobArray } from '@/types/jobsType'
import Link from 'next/link'
import JobExpand from './jobExpand'
import Pagination from './pagination'
import JobCard from './jobCard'

export default function JobsSearchResults({querry,jobsArr,noOfPages}:{querry:string,jobsArr:JobArray,noOfPages:number}) {
    
    const [openIndex, setOpenIndex] = React.useState(-1)
  return (
    <>
      <motion.div initial={{opacity:0, y:20}}
                 animate={{opacity:1, y:0}} transition={{delay:.3}} className='mt-10'>
                    <h3 className="mb-4 text-xl font-bold">Results for "<span className='font-semibold text-indigo-600'>{decodeURIComponent(querry)}</span>"</h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            jobsArr.map((job, i) => (
                                <JobCard key={i} job={job} index={i} />
                            ))
                        }
                    </div>
                    <Pagination  totalPages={noOfPages}  />
                </motion.div>
    </>
  )
}
